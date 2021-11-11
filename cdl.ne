# To compile: nearleyc cdl.ne -o cdl.js
@preprocessor esmodule
@builtin "number.ne"
@builtin "string.ne"
# The first element in the grammar is the default to start
# parsing.
# The compass consists of one or more elements
Compass -> Element:+
WS -> [ \t\n\v\f]:*
# An element is a space or a circle
Element -> spaceElement | circleElement
# A space is e.g., SPACE(1.5)
spaceElement -> "SPACE" WS "(" WS decimal WS ")" WS
# A circle is e.g., CIRCLE(1, "black", "none")
circleElement -> "CIRCLE" WS "(" WS decimal WS "," WS dqstring WS
                 "," WS dqstring WS ")" WS
