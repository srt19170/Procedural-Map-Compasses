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
// const cdl = 'CIRCLE(2, "black", "none") SPACE(2) RCIRCLE(0, 8, 2, 0, "none", "blue") SPACE(-2) RLINE('+Math.PI/8+', 8, 6, 2, "black") SPACE(4) CIRCLE(2, "black", "none")';

// Examples from Part 6
// const cdl = 'CIRCLE(2, "black", "none") RTRI(0, 1, 4, 4, 1, "blue", "none")';
// const cdl = 'CIRCLE(2, "black", "none") RTRI(0, 8, 8, 8, 1, "blue", "none")';
// const cdl = 'CIRCLE(2, "black", "none") RTRI(0, 8, 8, 8, 1, "black", "blue")';
// const cdl = 'RLINE(0, 72, 8, 0.5, "rgb(108,65,38)") SPACE(2) RLINE(0, 360, 4, 0.25, "rgb(108,65,38)") SPACE(3) RTRI(0, 8, -8, 6, 0.5, "rgb(108,65,38)", "white") CIRCLE(3, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(4) RCIRCLE(0, 24, 1, 0, "none", "rgb(108,65,38)") SPACE(4) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(2) CIRCLE(0.5, "rgb(108,65,38)", "none")';

// Examples from Part 7
// const cdl = 'RPOINT(0, 4, 0.80, 1, 1, "black", "none", "none")';
const cdl = 'SPACE(5) RLINE(0, 72, 8, 0.5, "rgb(108,65,38)") SPACE(2) RLINE(0, 360, 4, 0.25, "rgb(108,65,38)") SPACE(3) RTRI(0, 8, -8, 6, 0.5, "rgb(108,65,38)", "white") CIRCLE(3, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(4) RCIRCLE(0, 24, 1, 0, "none", "rgb(108,65,38)") SPACE(4) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(2) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(-48) RPOINT(0, 4, 0.85, 1, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)") SPACE(28) RPOINT('+Math.PI/4+', 4, 0.575, 0.25, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)")';

function test(svg) {
    console.log('About to test.');
    const result = interpretCDL(svg, parseCDL(cdl, true), [100,100], 75, true);
};

export default {
    test: test
};
