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

// Examples from Part 2.  Uncomment to use
const cdl = 'SPACE(10) CIRCLE(1.5, "black", "none")';

function test() {
    console.log('About to call parseCDL.');
    const result = parseCDL(cdl, true);
};

export default {
    test: test
};
