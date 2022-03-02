// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

//
// Order matters in the lexer.  Earlier
// rules take precedence.
// 
const lexer = moo.compile({
  //
  // Comment is an entire line starting with #
  // 
  comment: {match: /^\s*\#.*$/, lineBreaks: true},
  //
  // Or
  //
  or: /\s+\|\s+/,
  // 
  // White space, including newlines
  // 
  ws: { match: /\s+/, lineBreaks: true, value: s => ' '},
  // 
  // One-time non-terminal in the form <$test>
  //
  otnterm: /<\$[^>]+>/,
  // 
  // Non-terminal in the form <test>
  //
  nterm: /<[^\$][^>]*>/,
  // 
  // Embedded Javascript enclosed in backticks
  //
  jscript: {match:/`[^`]+`/, value: s => s.slice(1, -1)},
  //
  // A weight in the form [50]
  // 
  weight: {match:/\[[^\]]+\]/, value: s => s.slice(1, -1)},
  //
  // The arrow that separates lhs and rhs
  //
  arrow: /=>/,
  //
  // End of rule
  //
  eor: {match:/;\s*\r\n/, lineBreaks: true},
  //
  // A quoted string
  //
  qstring: {match: /'[^']*?'/, value: s => s.slice(1, -1), type: s => "string"},
  //
  // A string of characters
  //
  string: /[^`\'\<\[\]; \t\n\r]+/,
});
let Lexer = lexer;
let ParserRules = [
    {"name": "ruleset$ebnf$1", "symbols": ["ruleOrComment"]},
    {"name": "ruleset$ebnf$1", "symbols": ["ruleset$ebnf$1", "ruleOrComment"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ruleset", "symbols": ["ruleset$ebnf$1"], "postprocess": data => data[0]},
    {"name": "ruleOrComment", "symbols": ["rule"], "postprocess": data => data[0]},
    {"name": "ruleOrComment", "symbols": ["comment"], "postprocess": data => data[0]},
    {"name": "rule$ebnf$1", "symbols": ["ws"], "postprocess": id},
    {"name": "rule$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rule$subexpression$1", "symbols": [(lexer.has("nterm") ? {type: "nterm"} : nterm)]},
    {"name": "rule$subexpression$1", "symbols": [(lexer.has("otnterm") ? {type: "otnterm"} : otnterm)]},
    {"name": "rule$ebnf$2", "symbols": ["ws"], "postprocess": id},
    {"name": "rule$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rule$ebnf$3", "symbols": ["ws"], "postprocess": id},
    {"name": "rule$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rule$ebnf$4", "symbols": ["ws"], "postprocess": id},
    {"name": "rule$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rule", "symbols": ["rule$ebnf$1", "rule$subexpression$1", "rule$ebnf$2", (lexer.has("arrow") ? {type: "arrow"} : arrow), "rule$ebnf$3", "rhs", "rule$ebnf$4", (lexer.has("eor") ? {type: "eor"} : eor)], "postprocess": data => ({type: "rule", lhs: data[1][0], rhs: data[5]})},
    {"name": "comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": data => ({type: "comment", value: data[0]})},
    {"name": "rhs", "symbols": ["element"], "postprocess": data => data[0]},
    {"name": "rhs$ebnf$1", "symbols": ["ws"], "postprocess": id},
    {"name": "rhs$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rhs", "symbols": ["element", "rhs$ebnf$1", "rhs"], "postprocess":  data => data[1] ? [data[0][0], data[1], ...data[2]] :
        [data[0][0], ...data[2]] },
    {"name": "element", "symbols": [(lexer.has("nterm") ? {type: "nterm"} : nterm)]},
    {"name": "element", "symbols": [(lexer.has("otnterm") ? {type: "otnterm"} : otnterm)]},
    {"name": "element", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "element", "symbols": [(lexer.has("qstring") ? {type: "qstring"} : qstring)]},
    {"name": "element", "symbols": [(lexer.has("jscript") ? {type: "jscript"} : jscript)]},
    {"name": "element", "symbols": [(lexer.has("weight") ? {type: "weight"} : weight)]},
    {"name": "element", "symbols": [(lexer.has("or") ? {type: "or"} : or)]},
    {"name": "ws", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": data => ({type: "string", value: " "})}
];
let ParserStart = "ruleset";
export default { Lexer, ParserRules, ParserStart };
