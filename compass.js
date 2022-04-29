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
    const memory = {};
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
	} else if (op.op == 'REMEMBER') {
	    memory[op.name] = radius;
	} else if (op.op == 'RECALL') {
	    radius = memory[op.name];
	} else {
	    console.log('interpretCDL encountered an unknown opcode: '+op.op);
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

function selectFromRHS (rhs, rules, context, otValues) {
    // If there's only one choice, return that.
    if (rhs.length == 1) {
	return rhs[0].elements;
    };
    // Otherwise we need to iterate through the possible choices
    // and add up all the weights to decide which to pick.
    let weights = [];
    let totalWeight = 0;
    for (let choice of rhs) {
	let weight;
	// Simplification, weight might just be a string or a number
	if (typeof choice.weight == 'string') {
	    weight = parseFloat(executeRules(choice.weight, rules, context, otValues));
	    // If weight isn't a number
	    if (weight == NaN) {
		console.log('Weight is NaN: '+weight);
		weight = 1;
	    };
	} else {
	    // Weight is itself a RHS, so we need to select from it and then
	    // expand the selection
	    const select = selectFromRHS(choice.weight, rules, context, otValues);
	    if (select) {
		const expanded = executeRules(select.slice().reverse(), rules, context, otValues);
		if (typeof expanded === 'string' || expanded instanceof String) {
		    // The string should parse to a number
		    weight = parseFloat(expanded);
		    // If weight isn't a number
		    if (weight == NaN) {
			console.log('Weight evaluated to NaN: '+choice.weight);
			weight = 1;
		    };
		} else {
		    console.log('Expansion did not return a string for '+choice.weight);
		    weight = 1;
		};
	    } else {
		// selectFromRHS failed
		console.log('Unable to select from '+choice.weight);
		weight = 1;
	    };
	};
	// Save weight so that we don't evaluate it again during selection.
	weights.push(weight);
	totalWeight += weight;
    };
    // Now figure out our selection.
    let selection = Utils.rand(totalWeight);
    for (let i=0;i<weights.length;i++) {
	selection -= weights[i];
	if (selection <= 0) return rhs[i].elements;
    };
    // Something likely went wrong
    console.log('Fell out of selection loop in getChoice');
    return rhs[rhs.length-1].elements;
};

function getChoice(key, rules, context, preValues) {
    // If there's no rule for this key or no rhs, give up.
    if (!rules[key] || ! rules[key].rhs) return null;
    return selectFromRHS(rules[key].rhs, rules, context, preValues);
};

function executeRules(start, rules, context, otValues=null) {
    // For convenience, if a single string gets passed in we'll convert it to
    // a non-terminal.  Otherwise the start should be an initial stack of elements.
    let stack = Array.isArray(start) ? [...start] : [{type: "nterm", value: start}];
    let output = "";
    otValues = otValues || {};
    // Expand any unexpanded one-time rules
    for (let nt in rules) {
	// Is this a otnt with no value?
	if (nt[1] == "$" && !(nt in otValues)) {
	    // Put a placeholder in otValues so that we don't try to
	    // recursively evaluate this otnt.  Real values for otnts
	    // will be strings, so any non-string number will do.
	    otValues[nt] = NaN;
	    // Recursively evaluate nt.  Mark it with an illegal value
	    // before starting so that 
	    let val = executeRules([{type: "otnterm", value:nt}], rules, context, otValues);
	    otValues[nt] = val;
	};
    };
    // Iterate the stack until it is empty or we hit a limit
    let count = 0;
    while (stack.length > 0 && count < 1000) {
	count++;
	const current = stack.pop();
	// If it's a one-time non-terminal that has been defined, add
	// it's value to the end of the output.  Otherwise it will fall
	// through and get evaluated.
	if (current.type == "otnterm" && otValues[current.value] &&
	                                  otValues[current.value] != NaN) {
	    output = output.concat(otValues[current.value]);
	    continue;
	};
	// If it's a reference to a one-time terminal, then replace the
	// reference with the Javascript to reference where the value
	// of the one-time terminal is kept.
	if (current.type == "otntermref") {
	    output = output.concat("otValues['"+current.value.replace('@','$')+"']");
	    continue;
	};
	// If it's a non-terminal, find a rule that matches, select a choice,
	// and push the choice on the stack.
	if (current.type == "nterm" || current.type == "otnterm") {
	    // Select a choice from the available rules
	    let choice = getChoice(current.value, rules, context, otValues);
	    if (choice) {
		// Push choice on the stack.
		stack = stack.concat(choice.slice().reverse());
	    } else {
		// No choice was found, so treat the nterm as a string
		output = output.concat(current.value);
	    };
	    continue;
	};
	// If it's embedded Javascript, then:
	//    Recursively expand the element
	//    Execute the expanded element in Javascript
	//    Add the return value to the end of the output
	if (current.type == "jscript") {
	    // The value of the jscript is a right-hand side, so make
	    // a choice from there.
	    let choice = selectFromRHS(current.value, rules, context, otValues);
	    // Copy the value before reversing it onto the stack.
	    // Reuse otValues so we continue to use the one-time values.
	    const expanded = executeRules(choice.slice().reverse(), rules, context, otValues);
	    // const expanded = executeRules(current.value.slice().reverse(), rules, context, otValues);
	    if (typeof expanded === 'string' || expanded instanceof String) {
		// Execute in the provided context.
		const execVal = String(context(expanded, otValues));
		if (typeof execVal === 'string' || execVal instanceof String) {
		    output = output.concat(execVal);
		} else {
		    console.log('Unable to coerce context value to String for '+expanded);
		};
	    } else {
		console.log('Expansion did not return a string for '+current.value);
	    };
	    continue;
	};
	// If it's a string, add it to the end of the output.
	if (current.type == "string") {
	    output = output.concat(String(current.value));
	    continue;
	};
	// Else complain but treat as a string
	console.log('Unknown element type "'+current.type+'" in executeRules.');
	output = output.concat(String(current.value));
    };
    if (count >= 1000) {
	console.log('executeRules hit the iteration limit.');
    };
    return output;
};

async function readText(inputFile) {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};

const compassRulesText = await fetch('compass.rules')
      .then(res => res.blob())
      .then(blob => readText(blob));

function prepareLodestone(rulesText) {
    // Create a Parser object from our grammar.
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(Lodestone));
    // Parse text
    parser.feed(rulesText);
    let rules = processRules(parser.results[0]);
    return rules;
};

function test(svg) {
    // Remove any previous compass
    svg.selectAll('*').remove();
    const rules = prepareLodestone(compassRulesText);
    const cdl = executeRules('<compass>', rules, (s, otValues) => eval(s));
    console.log('CDL is '+cdl);
    const result = interpretCDL(svg, parseCDL(cdl, true), [100,100], 75, true);
};

export default {
    test: test
};

