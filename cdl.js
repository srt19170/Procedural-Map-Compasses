// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }
let Lexer = undefined;
let ParserRules = [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "Compass$ebnf$1", "symbols": ["Element"]},
    {"name": "Compass$ebnf$1", "symbols": ["Compass$ebnf$1", "Element"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Compass", "symbols": ["Compass$ebnf$1"], "postprocess": data => data[0].map(a => a[0])},
    {"name": "WS$ebnf$1", "symbols": []},
    {"name": "WS$ebnf$1", "symbols": ["WS$ebnf$1", /[ \t\n\v\f]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WS", "symbols": ["WS$ebnf$1"]},
    {"name": "Element", "symbols": ["spaceElement"]},
    {"name": "Element", "symbols": ["circleElement"]},
    {"name": "Element", "symbols": ["rlineElement"]},
    {"name": "Element", "symbols": ["rcircleElement"]},
    {"name": "Element", "symbols": ["rtriElement"]},
    {"name": "Element", "symbols": ["rpointElement"]},
    {"name": "Element", "symbols": ["rtextElement"]},
    {"name": "Element", "symbols": ["rarcElement"]},
    {"name": "Element", "symbols": ["rdiamondElement"]},
    {"name": "Element", "symbols": ["rwaveElement"]},
    {"name": "Element", "symbols": ["rememberElement"]},
    {"name": "Element", "symbols": ["recallElement"]},
    {"name": "rememberElement$subexpression$1", "symbols": [/[rR]/, /[eE]/, /[mM]/, /[eE]/, /[mM]/, /[bB]/, /[eE]/, /[rR]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rememberElement", "symbols": ["rememberElement$subexpression$1", "WS", {"literal":"("}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess": data => ({op: "REMEMBER", name: data[4]})},
    {"name": "recallElement$subexpression$1", "symbols": [/[rR]/, /[eE]/, /[cC]/, /[aA]/, /[lL]/, /[lL]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "recallElement", "symbols": ["recallElement$subexpression$1", "WS", {"literal":"("}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess": data => ({op: "RECALL", name: data[4]})},
    {"name": "spaceElement$subexpression$1", "symbols": [/[sS]/, /[pP]/, /[aA]/, /[cC]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "spaceElement", "symbols": ["spaceElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":")"}, "WS"], "postprocess": data => ({op: "SPACE", n: data[4]})},
    {"name": "circleElement$subexpression$1", "symbols": [/[cC]/, /[iI]/, /[rR]/, /[cC]/, /[lL]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "circleElement", "symbols": ["circleElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess": data => ({op: "CIRCLE", lineWidth: data[4], lineColor: data[8], fillColor: data[12]})},
    {"name": "rlineElement$subexpression$1", "symbols": [/[rR]/, /[lL]/, /[iI]/, /[nN]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rlineElement", "symbols": ["rlineElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess": data => ({op: "RLINE", start: data[4], repeats: data[8], length: data[12], width: data[16], color: data[20]})},
    {"name": "rcircleElement$subexpression$1", "symbols": [/[rR]/, /[cC]/, /[iI]/, /[rR]/, /[cC]/, /[lL]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rcircleElement", "symbols": ["rcircleElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess": data => ({op: "RCIRCLE", start: data[4], repeats: data[8], size: data[12], lwidth: data[16], color: data[20], fill: data[24]})},
    {"name": "rtriElement$subexpression$1", "symbols": [/[rR]/, /[tT]/, /[rR]/, /[iI]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rtriElement", "symbols": ["rtriElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RTRI", start: data[4], repeats: data[8], height: data[12],
        	                   width: data[16], lwidth: data[20], color: data[24],
        fill: data[28], darkFill: data[28]}) },
    {"name": "rtriElement$subexpression$2", "symbols": [/[rR]/, /[tT]/, /[rR]/, /[iI]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rtriElement", "symbols": ["rtriElement$subexpression$2", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RTRI", start: data[4], repeats: data[8], height: data[12],
        	                   width: data[16], lwidth: data[20], color: data[24],
        fill: data[28], darkFill: data[32]}) },
    {"name": "rpointElement$subexpression$1", "symbols": [/[rR]/, /[pP]/, /[oO]/, /[iI]/, /[nN]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rpointElement", "symbols": ["rpointElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RPOINT", start: data[4], repeats: data[8], span: data[12],
        width: data[16], lwidth: data[20], lcolor: data[24], 
        lightFill: data[28], darkFill: data[32]}) },
    {"name": "dqList", "symbols": [{"literal":"["}, "WS", "dqElements", "WS", {"literal":"]"}], "postprocess": data => data[2]},
    {"name": "dqElements", "symbols": [], "postprocess": data => []},
    {"name": "dqElements", "symbols": ["dqstring"], "postprocess": data => data},
    {"name": "dqElements", "symbols": ["dqstring", "WS", {"literal":","}, "WS", "dqElements"], "postprocess": data => [data[0], ...data[4]]},
    {"name": "rtextElement$subexpression$1", "symbols": [/[rR]/, /[tT]/, /[eE]/, /[xX]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rtextElement", "symbols": ["rtextElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqList", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RTEXT", start: data[4], repeats: data[8], font: data[12],
                                      size: data[16], color: data[20], style: data[24], weight: data[28],
        orientation: data[32], texts: data[36]}) },
    {"name": "rarcElement$subexpression$1", "symbols": [/[rR]/, /[aA]/, /[rR]/, /[cC]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rarcElement", "symbols": ["rarcElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RARC", start: data[4], repeats: data[8], subtend: data[12],
        width: data[16], color: data[20]}) },
    {"name": "rdiamondElement$subexpression$1", "symbols": [/[rR]/, /[dD]/, /[iI]/, /[aA]/, /[mM]/, /[oO]/, /[nN]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rdiamondElement", "symbols": ["rdiamondElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RDIAMOND", start: data[4], repeats: data[8], height: data[12],
        	                   width: data[16], lwidth: data[20], color: data[24],
        fill: data[28], darkfill: data[28]}) },
    {"name": "rdiamondElement$subexpression$2", "symbols": [/[rR]/, /[dD]/, /[iI]/, /[aA]/, /[mM]/, /[oO]/, /[nN]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rdiamondElement", "symbols": ["rdiamondElement$subexpression$2", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RDIAMOND", start: data[4], repeats: data[8], height: data[12],
        	                   width: data[16], lwidth: data[20], color: data[24],
        fill: data[28], darkFill: data[32]}) },
    {"name": "rwaveElement$subexpression$1", "symbols": [/[rR]/, /[wW]/, /[aA]/, /[vV]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rwaveElement", "symbols": ["rwaveElement$subexpression$1", "WS", {"literal":"("}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "decimal", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":","}, "WS", "dqstring", "WS", {"literal":")"}, "WS"], "postprocess":  data => ({op: "RWAVE", start: data[4], repeats: data[8], span: data[12],
        width: data[16], lwidth: data[20], lcolor: data[24], 
        lightFill: data[28], darkFill: data[32]}) }
];
let ParserStart = "Compass";
export default { Lexer, ParserRules, ParserStart };
