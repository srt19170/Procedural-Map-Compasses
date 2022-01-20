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
// const cdl = 'SPACE(5) RLINE(0, 72, 8, 0.5, "rgb(108,65,38)") SPACE(2) RLINE(0, 360, 4, 0.25, "rgb(108,65,38)") SPACE(3) RTRI(0, 8, -8, 6, 0.5, "rgb(108,65,38)", "white") CIRCLE(3, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(4) RCIRCLE(0, 24, 1, 0, "none", "rgb(108,65,38)") SPACE(4) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(2) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(-48) RPOINT(0, 4, 0.85, 1, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)") SPACE(28) RPOINT('+Math.PI/4+', 4, 0.575, 0.25, 0.50, "rgb(108,65,38)';

// Examples from Part 8
// const cdl = 'RTEXT(0, 1, "Arial", 32, "black", "", ["N"]) SPACE(2) CIRCLE(2, "black", "none")';
// const cdl = 'RTEXT(0, 4, "Arial", 32, "black", "", "", ["N", "E", "S", "W"]) SPACE(2) CIRCLE(2, "black", "none")';
// const cdl = 'SPACE(-5) RTEXT(0, 4, "Serif", 16, "rgb(108,65,38)", "", "bolder", ["N", "E", "S", "W"]) SPACE(9) RTEXT(0, 24, "Helvetica", 6, "rgb(108,65,38)", "", "", ["", "15", "30", "45", "60", "75", "", "105", "120", "135", "150", "165", "", "195", "210", "225", "240", "255", "", "285", "300", "315", "330", "345", ""]) SPACE(1) RLINE(0, 72, 8, 0.5, "rgb(108,65,38)") SPACE(2) RLINE(0, 360, 4, 0.25, "rgb(108,65,38)") SPACE(3) RTRI(0, 8, -5, 6, 0.5, "rgb(108,65,38)", "white") CIRCLE(3, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(2) RTEXT('+Math.PI/4+', 4, "Serif", 9, "rgb(108,65,38)", "", "", ["ne", "se", "sw", "nw"]) SPACE(6) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(4) RCIRCLE(0, 24, 1, 0, "none", "rgb(108,65,38)") SPACE(4) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(2) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(-48) RPOINT(0, 4, 0.85, 1, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)") SPACE(28) RPOINT('+Math.PI/4+', 4, 0.575, 0.25, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)")';

// Examples from Part 9
// const cdl = 'SPACE(-13) RTEXT(0, 4, "Serif", 16, "rgb(108,65,38)", "", "bolder", "vertical", ["N", "E", "S", "W"]) SPACE(17) RTEXT(0, 24, "Helvetica", 6, "rgb(108,65,38)", "", "", "radial", ["", "15", "30", "45", "60", "75", "", "105", "120", "135", "150", "165", "", "195", "210", "225", "240", "255", "", "285", "300", "315", "330", "345", ""]) SPACE(1) RLINE(0, 72, 8, 0.5, "rgb(108,65,38)") SPACE(2) RLINE(0, 360, 4, 0.25, "rgb(108,65,38)") SPACE(3) RTRI(0, 8, -5, 6, 0.5, "rgb(108,65,38)", "white") CIRCLE(3, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(2) RTEXT('+Math.PI/4+', 4, "Serif", 9, "rgb(108,65,38)", "", "", "radial", ["ne", "se", "sw", "nw"]) SPACE(6) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(4) RCIRCLE(0, 24, 1, 0, "none", "rgb(108,65,38)") SPACE(4) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(2) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(-48) RPOINT(0, 4, 0.85, 1, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)") SPACE(28) RPOINT('+Math.PI/4+', 4, 0.575, 0.25, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)")';
// const cdl = 'RTEXT(0, 4, "Serif", 16, "black", "", "bolder", "vertical", ["N", "E", "S", "W"]) SPACE(18) CIRCLE(5, "black", "none") SPACE(2) CIRCLE(1, "black", "none") RPOINT('+Math.PI/4+', 4, 0.80, 1, 0.50, "black", "white", "black") SPACE(-16) RPOINT(0, 4, 0.80, 1, 0.50, "black", "white", "black")';
// const cdl = 'RARC(0, 4, '+Math.PI/8+', 5, "black")';
// const cdl = 'SPACE(-5) RTEXT(0, 4, "Serif", 16, "rgb(108,65,38)", "", "bolder", "radial", ["N", "E", "S", "W"]) SPACE(9) RTEXT(0, 24, "Helvetica", 6, "rgb(108,65,38)", "", "", "radial", ["", "15", "30", "45", "60", "75", "", "105", "120", "135", "150", "165", "", "195", "210", "225", "240", "255", "", "285", "300", "315", "330", "345", ""]) SPACE(1) RLINE(0, 72, 8, 0.5, "rgb(108,65,38)") SPACE(2) RLINE(0, 360, 4, 0.25, "rgb(108,65,38)") SPACE(3) RTRI(0, 8, -5, 6, 0.5, "rgb(108,65,38)", "white") CIRCLE(3, "rgb(108,65,38)", "none") SPACE(8) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(2) RARC('+Math.PI/4+', 4, '+Math.PI/8+', -9, "white") RTEXT('+Math.PI/4+', 4, "Serif", 9, "rgb(108,65,38)", "", "", "radial", ["ne", "se", "sw", "nw"]) SPACE(6) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(4) RCIRCLE(0, 24, 1, 0, "none", "rgb(108,65,38)") SPACE(4) CIRCLE(2, "rgb(108,65,38)", "none") SPACE(2) CIRCLE(0.5, "rgb(108,65,38)", "none") SPACE(-48) RPOINT(0, 4, 0.85, 1, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)") SPACE(28) RPOINT('+Math.PI/4+', 4, 0.575, 0.25, 0.50, "rgb(108,65,38)", "white", "rgb(108,65,38)")';

// Examples from Part 10
// const cdl = 'RTRI(0, 8, -8, 8, 1, "black", "white", "black") SPACE(-1) CIRCLE(2, "black", "none")';
// const cdl = 'CIRCLE(1, "black", "none") RDIAMOND(0, 8, 16, 8, 1, "black", "white", "black") SPACE(16) CIRCLE(1, "black", "none")';
// const cdl = 'RWAVE(0, 4, 0.85, 1, 1, "black", "white", "black")';
// const cdl = 'SPACE(20) RWAVE('+Math.PI/4+', 4, 0.85, 1, 1, "black", "white", "black") SPACE(-20) RPOINT(0, 4, 0.85, 1, 1, "black", "white", "black") SPACE(65) CIRCLE(1, "black", "white") SPACE(3) CIRCLE(1, "black", "white") SPACE(3) CIRCLE(1, "black", "white") ';
// const cdl = 'RWAVE(0, 4, 0.75, 1, 1, "black", "white", "black")';
// const cdl = 'RWAVE(0, 16, 0.25, 1, 1, "black", "white", "black")';
// const cdl = 'RWAVE(0, 48, 0.5, 1, 1, "black", "white", "black")';
const cdl = 'SPACE(32) RCIRCLE(0, 32, 2, 0, "none", "black") SPACE(-32) \
             SPACE(27) RWAVE('+Math.PI/8+', 8, 0.80, 1, 1, "black", "white", "black") SPACE(-27) \
             SPACE(11) CIRCLE(1, "black", "none") RDIAMOND(0, 16, 4, 4, 0.5, "black", "white", \
             "black") SPACE(4) CIRCLE(1, "black", "none") SPACE(-19) \
             SPACE(20) RWAVE('+Math.PI/4+', 4, 0.85, 1, 1, "black", "white", "black") SPACE(-20) \
             RPOINT(0, 4, 0.85, 1, 1, "black", "white", "black") SPACE(65) CIRCLE(1, "black", "white") \
             SPACE(3) CIRCLE(1, "black", "black") SPACE(2) CIRCLE(1, "black", "white") ';

function test(svg) {
    console.log('About to test.');
    const result = interpretCDL(svg, parseCDL(cdl, true), [100,100], 75, true);
};

export default {
    test: test
};
