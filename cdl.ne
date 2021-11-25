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
Element -> spaceElement | circleElement | rlineElement | rcircleElement
# A space is e.g., SPACE(1.5)
spaceElement -> "SPACE"i WS "(" WS decimal WS ")" WS {% data => ({op: "SPACE", n: data[4]}) %}
# A circle is e.g., CIRCLE(1, "black", "none")
circleElement -> "CIRCLE"i WS "(" WS decimal WS "," WS dqstring WS
                 "," WS dqstring WS ")" WS {% data => ({op: "CIRCLE", lineWidth: data[4], lineColor: data[8], fillColor: data[12]}) %}
# A radial line element
rlineElement -> "RLINE"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS "," WS decimal WS "," WS dqstring WS ")" WS
{% data => ({op: "RLINE", start: data[4], repeats: data[8], length: data[12], width: data[16], color: data[20]}) %}
# A radial circle element
# RCIRCLE(start, repeats, length, line width, line color, fill color)
rcircleElement -> "RCIRCLE"i WS "(" WS decimal WS "," WS decimal WS "," WS decimal WS "," WS decimal WS "," WS dqstring WS "," WS dqstring WS ")" WS
{% data => ({op: "RCIRCLE", start: data[4], repeats: data[8], length: data[12], lwidth: data[16], color: data[20], fill: data[24]}) %}
