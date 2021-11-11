//
//  Top level file for Map Compass Procedural Generation
//
import CDL from './cdl.js';
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

function interpretCDL(cdl, debug=false) {
    for(let i=0;i<cdl.length;i++) {
	const op = cdl[i].op;
	if (op == 'CIRCLE') {
	    // Draw a circle
	    if (debug) console.log('Draw a circle.');
	} else if (op == 'SPACE') {
	    // Skip some space
	    if (debug) console.log('Skip some space.');
	} else {
	    console.log('executeCDL encountered an unknown opcode: '+op);
	};
    };
};

// Examples from Part 2.  Uncomment to use
const cdl = 'SPACE(10) CIRCLE(1.5, "black", "none")';

function test(svg) {
    console.log('About to test.');    
    const result = interpretCDL(parseCDL(cdl, true), true);
    svg.append('circle')
	.attr('cx', 25)
	.attr('cy', 25)
	.attr('r', 25)
	.style('fill', 'purple');
};

export default {
    test: test
};
