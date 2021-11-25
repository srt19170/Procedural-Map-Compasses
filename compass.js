//
//  Top level file for Map Compass Procedural Generation
//
import CDL from './cdl.js';
import Draw from './draw.js';

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

function interpretCDL(svg, cdl, center=[0,0], debug=false) {
    let radius = 100;
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
	    // Draw.rline(svg, center, radius, op.start, op.repeats, op.length, op.width, op.color);
	} else if (op.op == 'RLINE') {
	    // Draw radial lines
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rline2);	    
	    if (debug) console.log('Draw radial lines.');
	} else if (op.op == 'RCIRCLE') {
	    // Draw radial circles
	    Draw.repeat(svg, center, radius, op.start, op.repeats, op, Draw.rcircle);	    
	    if (debug) console.log('Draw radial lines.');
	} else {
	    console.log('executeCDL encountered an unknown opcode: '+op.op);
	};
    };
};

// Examples from Part 2.  Uncomment to use
// const cdl = 'SPACE(10) CIRCLE(1.5, "black", "none")';

// Examples from Part 4.
// const cdl = 'CIRCLE(1.5, "black", "none")';
// const cdl = 'CIRCLE(2, "black", "none") CIRCLE(2, "red", "red") CIRCLE(2, "black", "none")';
// const cdl = 'CIRCLE(2, "black", "none") CIRCLE(20, "red", "none") CIRCLE(2, "black", "none")';
// const cdl = 'CIRCLE(2, "black", "none") SPACE(2) CIRCLE(2, "black", "none") SPACE(2)  CIRCLE(2, "black", "none")';
// const cdl = 'CIRCLE(2, "black", "none") CIRCLE(20, "red", "none") SPACE(-11) CIRCLE(2, "green", "none") SPACE(9) CIRCLE(2, "black", "none")';

// Examples from Part 5.
// const cdl = 'CIRCLE(2, "black", "none") RLINE(0, 8, 4, 2, "black")';
// const cdl = 'CIRCLE(2, "black", "none") RLINE(0, 8, 0, 2, "black")';
// const cdl = 'CIRCLE(2, "black", "none") RLINE(0, 1, 0, 2, "black")';
// const cdl = 'CIRCLE(2, "black", "none") SPACE(2) RCIRCLE(0, 8, 2, 0, "none", "blue") SPACE(2) CIRCLE(2, "black", "none")';
const cdl = 'CIRCLE(2, "black", "none") SPACE(2) RCIRCLE(0, 8, 2, 0, "none", "blue") SPACE(-2) RLINE('+Math.PI/8+', 8, 6, 2, "black") SPACE(4) CIRCLE(2, "black", "none")';

function test(svg) {
    console.log('About to test.');
    const result = interpretCDL(svg, parseCDL(cdl, true), [100,100], true);
};

export default {
    test: test
};
