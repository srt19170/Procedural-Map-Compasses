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
Element -> spaceElement | circleElement
# A space is e.g., SPACE(1.5)
spaceElement -> "SPACE"i WS "(" WS decimal WS ")" WS {% data => ({op: "SPACE", n: data[4]}) %}
# A circle is e.g., CIRCLE(1, "black", "none")
circleElement -> "CIRCLE"i WS "(" WS decimal WS "," WS dqstring WS
                 "," WS dqstring WS ")" WS {% data => ({op: "CIRCLE", lineWidth: data[4], lineColor: data[8], fillColor: data[12]}) %}
