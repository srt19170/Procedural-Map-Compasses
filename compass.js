//
//  Top level file for Map Compass Procedural Generation
//
import CDL from './cdl.js';
import Lodestone from './lodestone.js';
import Draw from './draw.js';
import Utils from './utils.js';

//
//  Parse a Compass Design Language string
//
function parseCDL(text, debug=false) {
    // Create a Parser object from our grammar.
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(CDL));
    // Parse text
    parser.feed(text);
    if (debug) {
	console.log('Parse of '+text+' is '+parser.results[0]);
    };
    return parser.results[0];
};

function interpretCDL(svg, cdl, center=[0,0], radius=100, debug=false) {
    for(let i=0;i<cdl.length;i++) {
	const op = cdl[i];
	if (op.op == 'CIRCLE') {
	    // Draw a circle
	    Draw.circle(svg, center, radius-op.lineWidth/2, op.lineWidth, op.lineColor, op.fillColor);
	    radius -= op.lineWidth;
	    if (debug) console.log('Draw a circle.');
	} else if (op.op == 'SPACE') {
	    // Skip some space
	    radius -= op.n;
	    if (debug) console.log('Skip some space.');
	} else if (op.op == 'RLINE') {
	    // Draw radial lines
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rline);	    
	    if (debug) console.log('Draw radial lines.');
	} else if (op.op == 'RCIRCLE') {
	    // Draw radial circles
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rcircle);
	    if (debug) console.log('Draw radial lines.');
	} else if (op.op == 'RTRI') {
	    // Draw radial triangles
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rtri);
	    if (debug) console.log('Draw radial triangles.');
	} else if (op.op == 'RPOINT') {
	    // Draw radial compass points
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rpoint);
	    if (debug) console.log('Draw radial compass points.');
	} else if (op.op == 'RTEXT') {
	    // Draw radial texts
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rtext);
	    if (debug) console.log('Draw radial texts.');
	} else if (op.op == 'RARC') {
	    // Draw radial arcs
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rarc);
	    if (debug) console.log('Draw radial arcs.');
	} else if (op.op == 'RDIAMOND') {
	    // Draw radial diamonds
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rdiamond);
	    if (debug) console.log('Draw radial diamonds.');
	} else if (op.op == 'RWAVE') {
	    // Draw radial wavy compass points
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rwave);
	    if (debug) console.log('Draw radial wavy compass points.');
	} else {
	    console.log('executeCDL encountered an unknown opcode: '+op.op);
	};
    };
};

function processWeights(rhs) {
    // For each element in the rhs of the rule
    for (let i=0;i<rhs.length;i++) {
	if (rhs[i].type == "weight") {
	    // Each time we parse we need to create a new parser, otherwise
	    // it just continues on from where it ended.
	    // const parser = new nearley.Parser(Lodestone,'rhs');
	    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(Lodestone),'rhs');
	    // Run the value through the initial parser
	    parser.feed(rhs[i].value);
	    // Now process any Jscript in the RHS
	    rhs[i].value = processJscript(parser.results[0]);
	    // Parse failed?
	    if (!parser.results) {
		console.log('Parse of '+rhs[i].value+' failed.');
		if (rhs[i].type == "weight") {
		    // Default weight if failed.
		    rhs[i].value = {type:"string", value:"1"};
		} else {
		    // Javascript to return empty string.
		    rhs[i].value = {type:"string", value:'""'};
		};
	    };
	    // Ambiguous parse?
	    if (parser.results.length > 1) {
		console.log('Parse of '+rhs[i].value+' was ambiguous.');
	    };
	    // Fix or and weight tokens
	    for (let j=0;j<rhs[i].value.length;j++) {
		let token = rhs[i].value[j];
		if (token.type == 'or' || token.type == 'weight') {
		    token.type = 'string';
		    token.value = token.text;
		};
	    };
	};
    };
    return rhs;
};

function processJscript(rhs) {
    // For each element in the rhs of the rule
    for (let i=0;i<rhs.length;i++) {
	if (rhs[i].type == "jscript") {
	    // Each time we parse we need to create a new parser, otherwise
	    // it just continues on from where it ended.
	    // const parser = new nearley.Parser(Lodestone,'rhs');
	    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(Lodestone),'rhs');
	    // Run the value through the initial parser
	    parser.feed(rhs[i].value);
	    // Parse failed?
	    if (!parser.results) {
		console.log('Parse of '+rhs[i].value+' failed.');
		if (rhs[i].type == "weight") {
		    // Default weight if failed.
		    rhs[i].value = {type:"string", value:"1"};
		} else {
		    // Javascript to return empty string.
		    rhs[i].value = {type:"string", value:'""'};
		};
	    };
	    // Ambiguous parse?
	    if (parser.results.length > 1) {
		console.log('Parse of '+rhs[i].value+' was ambiguous.');
	    };
	    rhs[i].value = parser.results[0];
	    // Fix or and weight tokens
	    for (let j=0;j<rhs[i].value.length;j++) {
		let token = rhs[i].value[j];
		if (token.type == 'or' || token.type == 'weight') {
		    token.type = 'string';
		    token.value = token.text;
		};
	    };
	};
    };
    return rhs;
};

function processStrings(rhs) {
    let newRHS = [];
    let currentString = null;
    for(let i=0;i<rhs.length;i++) {
	// Current element is not a string
	if (rhs[i].type != "string") {
	    // If we've been building up a string
	    // element, release it.
	    if (currentString != null) {
		newRHS.push(currentString);
		currentString = null;
	    };
	    // If this is a Jscript or weight it needs
	    // to be recursively processed.
	    if (rhs[i].type == "jscript" || rhs[i].type == "weight") {
		rhs[i].value = processStrings(rhs[i].value);
	    };
	    // And save this element
	    newRHS.push(rhs[i]);
	} else {
	    if (currentString == null) {
		// If not building a string, start one.
		currentString = rhs[i];
	    } else {
		// Add this string to the currentString.
		currentString.value =
		    currentString.value.concat(rhs[i].value);
	    };
	};
    };
    if (currentString != null) {
	newRHS.push(currentString);
    }
    return newRHS;
};

function processChoices(rhs) {
    let rhsList = [];
    let currentRHS = [];
    let currentWeight = '1';
    for(let i=0;i<rhs.length;i++) {
	// Starting a new choice
	if (rhs[i].type == "or") {
	    rhsList.push({weight: currentWeight, elements: currentRHS});
	    // Reset the currentRHS
	    currentRHS = [];
	    currentWeight = '1';
	    continue;
	};
	// Recursive processing of Javascript and weights
	if (rhs[i].type == "jscript" || rhs[i].type == "weight") {
	    rhs[i].value = processChoices(rhs[i].value);
	};
	// Saving the weight of the current choice
	if (rhs[i].type == "weight") {
	    // Simplification if weight is just a string
	    if (rhs[i].value.length == 1 &&
		rhs[i].value[0].elements.length == 1 &&
		rhs[i].value[0].elements[0].type == "string") {
		currentWeight = rhs[i].value[0].elements[0].value;
	    } else {
		currentWeight = rhs[i].value;
	    };
	    continue;
	};
	// Otherwise put the element in currentRHS
	currentRHS.push(rhs[i]);
    };
    // Pick up the last choice
    if (currentRHS != []) {
	// Put the previous choice in the rhsList
	rhsList.push({weight: currentWeight, elements: currentRHS});
    };
    return rhsList;
};

function processRules(rules) {
    const dict = {};
    // For each rule in the ruleset
    for (let rule of rules) {
	if (rule.type == "rule") {
	    rule.rhs = processJscript(rule.rhs);
	    rule.rhs = processWeights(rule.rhs);
	    rule.rhs = processStrings(rule.rhs);
	    rule.rhs = processChoices(rule.rhs);
	    // Now add it to the dictionary
	    const key = rule.lhs.value;
	    if (key in dict) {
		// Already here, so add the rhs to the existing rhs
		dict[key].rhs = dict[key].rhs.concat(rule.rhs);
	    } else {
		// New key; add to dict
		dict[key] = {rhs: rule.rhs};
	    };
	};
    };
    return dict;
};

function test(svg) {
    // Create a Parser object from our grammar.
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(Lodestone));
    // Parse text
    parser.feed("<$pi> => `Math.PI | x[y || 55]`;\r\n\
                 <start> => <first> [1] | <second> [`99+99`];\r\n\
                 <first> => I am surprised this was selected!;\r\n\
                 <second> => The value of pi is <$pi>;\r\n");
    console.log('Parse is '+parser.results[0]);
    let rules = processRules(parser.results[0]);
    console.log('rules is '+rules);
};

export default {
    test: test
};

