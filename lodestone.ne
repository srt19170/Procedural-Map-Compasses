# To compile: nearleyc lodestone.ne -o lodestone.js
@preprocessor esmodule
@{%
//
// Order matters in the lexer.  Earlier
// rules take precedence.
// 
const lexer = moo.compile({
  //
  // Comment is an entire line starting with #
  // 
  comment: {match: /^\s*\#.*\r\n/, lineBreaks: true},
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
%}
# Pass your lexer object using the @lexer option:
@lexer lexer
#
# A ruleset is one or more rules or comments
# 
ruleset -> ruleOrComment:+ {% data => data[0] %}
ruleOrComment -> rule {% data => data[0] %}
	      	 | comment {% data => data[0] %}
#
# A rule is a non-terminal (or one-time non-terminal) on the
# left-hand side, an arrow, a right-hand side, and then an
# end-of-rule, e.g., 
#
# <start> => <first> <second> <third>;
#
rule -> ws:? (%nterm | %otnterm) ws:? %arrow ws:? rhs ws:? %eor
{% data => ({type: "rule", lhs: data[1][0], rhs: data[5]}) %}
#
# A comment is a line that starts with a #
#
comment -> %comment {% data => ({type: "comment", value: data[0]}) %}
#
# A rhs is either a single element, or a single element
# followed by a rhs.
#
rhs -> element {% data => data[0] %}
       | element ws:? rhs {% data => data[1] ? [data[0][0], data[1], ...data[2]] :
       	 	      	     	     	       [data[0][0], ...data[2]] %}
#
# An element can be a non-terminal (e.g., <test>), a one-time
# non-terminal (e.g., <$test>), a string of characters (e.g., SPACE),
# a quoted string of characters (e.g., 'this here'), embedded
# Javascript (e.g., `Math.PI/2`), a weight (e.g., [50]), or
# the character for an alternative (e.g., |)
#
element -> %nterm | %otnterm | %string | %qstring | %jscript | %weight | %or
#
# White space
# 
ws -> %ws {% data => ({type: "string", value: " "}) %}



