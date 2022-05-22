# To compile: nearleyc cdl.ne -o cdl.js
@preprocessor esmodule
@builtin "number.ne"
@builtin "string.ne"
# The first element in the grammar is the default to start
# parsing.
# The background consists of one or more background elements
Compass -> Element:+ {% data => data[0].map(a => a[0]) %}
WS -> [ \t\n\v\f]:*
# A list of all the legal CDL elements
Element -> spaceElement | moveElement| circleElement | rlineElement | rcircleElement |
           rtriElement | rpointElement | rtextElement | rarcElement | rdiamondElement |
	   rwaveElement | rememberElement | recallElement
# Remember a location
rememberElement -> "REMEMBER"i WS "(" WS dqstring WS ")" WS
		   {% data => ({op: "REMEMBER", name: data[4]}) %}
# Recall a location
recallElement -> "RECALL"i WS "(" WS dqstring WS ")" WS
	      	 {% data => ({op: "RECALL", name: data[4]}) %}
# A space is e.g., SPACE(1.5)
spaceElement -> "SPACE"i WS "(" WS decimal WS ")" WS {% data => ({op: "SPACE", n: data[4]}) %}
# A move is e.g., MOVE(45)
moveElement -> "MOVE"i WS "(" WS decimal WS ")" WS {% data => ({op: "MOVE", n: data[4]}) %}
# A circle is e.g., CIRCLE(1, "black", "none")
circleElement -> "CIRCLE"i WS "(" WS decimal WS "," WS dqstring WS
                 "," WS dqstring WS ")" WS {% data => ({op: "CIRCLE", lineWidth: data[4], lineColor: data[8], fillColor: data[12]}) %}
# A radial line element
# RLINE(start, repeats, length, lineWidth, color)
rlineElement -> "RLINE"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS "," WS decimal WS "," WS dqstring WS ")" WS
{% data => ({op: "RLINE", start: data[4], repeats: data[8], length: data[12], width: data[16], color: data[20]}) %}
# A radial circle element
# RCIRCLE(start, repeats, size, lineWidth, lineColor, fillColor)
rcircleElement -> "RCIRCLE"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS "," WS decimal WS "," WS dqstring WS "," WS dqstring WS ")" WS
{% data => ({op: "RCIRCLE", start: data[4], repeats: data[8], size: data[12], lwidth: data[16], color: data[20], fill: data[24]}) %}
# A radial triangle element
# RTRI(start, repeats, height, width, lineWidth, lineColor, fillColor)
# or
# RTRI(start, repeats, height, width, lineWidth, lineColor, fillColor, darkFill)
rtriElement -> "RTRI"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS ","
                              WS decimal WS "," WS decimal WS "," WS dqstring WS ","
			      WS dqstring WS ")" WS
	      {% data => ({op: "RTRI", start: data[4], repeats: data[8], height: data[12],
	                   width: data[16], lwidth: data[20], color: data[24],
			   fill: data[28], darkFill: data[28]}) %}
rtriElement -> "RTRI"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS ","
                              WS decimal WS "," WS decimal WS "," WS dqstring WS ","
			      WS dqstring WS "," WS dqstring WS ")" WS
              {% data => ({op: "RTRI", start: data[4], repeats: data[8], height: data[12],
	                   width: data[16], lwidth: data[20], color: data[24],
			   fill: data[28], darkFill: data[32]}) %}
# A radial compass point element
# RPOINT(start, repeats, span, width, lineWidth, lineColor, lightFill, darkFill)
rpointElement -> "RPOINT"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS "," 
                                  WS decimal WS "," WS decimal WS "," WS dqstring WS "," 
                                  WS dqstring WS "," WS dqstring WS ")" WS
                 {% data => ({op: "RPOINT", start: data[4], repeats: data[8], span: data[12],
                              width: data[16], lwidth: data[20], lcolor: data[24], 
                              lightFill: data[28], darkFill: data[32]}) %}
# DQLIST
# A list of double-quoted strings, possibly empty
dqList -> "[" WS dqElements WS "]" {% data => data[2] %}
dqElements -> null {% data => [] %}
	      | dqstring {% data => data %}
	      | dqstring WS "," WS dqElements {% data => [data[0], ...data[4]] %}
# Radial text
# RTEXT(start, repeats, font, size, color, style, orientation, texts)
rtextElement -> "RTEXT"i WS "(" WS decimal WS "," WS decimal WS "," WS dqstring WS ","
	     		        WS decimal WS "," WS dqstring WS "," WS dqstring WS "," 
				WS dqstring WS "," WS dqstring WS "," WS dqList WS ")" WS
                 {% data => ({op: "RTEXT", start: data[4], repeats: data[8], font: data[12],
                              size: data[16], color: data[20], style: data[24], weight: data[28],
			      orientation: data[32], texts: data[36]}) %}
# Radial arc
# RARC(start, repeats, subtend, width, color)
rarcElement -> "RARC"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS ","
	       	              WS decimal WS "," WS dqstring WS ")" WS
                 {% data => ({op: "RARC", start: data[4], repeats: data[8], subtend: data[12],
                              width: data[16], color: data[20]}) %}
# A radial diamond element
# RDIAMOND(start, repeats, height, width, lineWidth, lineColor, fillColor)
# or
# RDIAMOND(start, repeats, height, width, lineWidth, lineColor, fillColor, darkFill)
rdiamondElement -> "RDIAMOND"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS ","
                              WS decimal WS "," WS decimal WS "," WS dqstring WS ","
			      WS dqstring WS ")" WS
	      {% data => ({op: "RDIAMOND", start: data[4], repeats: data[8], height: data[12],
	                   width: data[16], lwidth: data[20], color: data[24],
			   fill: data[28], darkfill: data[28]}) %}
rdiamondElement -> "RDIAMOND"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS ","
                              WS decimal WS "," WS decimal WS "," WS dqstring WS ","
			      WS dqstring WS "," WS dqstring WS ")" WS
              {% data => ({op: "RDIAMOND", start: data[4], repeats: data[8], height: data[12],
	                   width: data[16], lwidth: data[20], color: data[24],
			   fill: data[28], darkFill: data[32]}) %}
# A radial wavy compass point element
# RWAVE(start, repeats, span, width, lineWidth, lineColor, lightFill, darkFill)
rwaveElement -> "RWAVE"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS "," 
                                  WS decimal WS "," WS decimal WS "," WS dqstring WS "," 
                                  WS dqstring WS "," WS dqstring WS ")" WS
                 {% data => ({op: "RWAVE", start: data[4], repeats: data[8], span: data[12],
                              width: data[16], lwidth: data[20], lcolor: data[24], 
                              lightFill: data[28], darkFill: data[32]}) %}
