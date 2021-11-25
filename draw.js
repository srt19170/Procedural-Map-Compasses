//
//  Implementation of drawing routines for map compasses using SVG & D3
//

function circle(svg, center, radius, lineWidth, lineColor, fillColor) {
    svg.append('circle')
	.attr('cx', center[0])
	.attr('cy', center[1])
	.attr('r', radius)
	.style('stroke-width', lineWidth)
	.style('stroke', lineColor)
	.style('fill', fillColor);
};

function rcircle(svg, center, radius, start, repeats, angle, i, op) {
    const sx = center[0] + radius * Math.cos(angle);
    const sy = center[1] - radius * Math.sin(angle);
    circle(svg, [sx, sy], op.length, op.lwidth, op.color, op.fill);
};

function line(svg, start, end, width, color) {
	svg.append('line')
	    .style('stroke-width', width)
	    .style('stroke', color)
	    .attr('x1', start[0])
	    .attr('y1', start[1])
	    .attr('x2', end[0])
	    .attr('y2', end[1]);
};

function rline2(svg, center, radius, start, repeats, angle, i, op) {
    // Length == 0 indicates a line that goes to the center of the compass
    if (op.length == 0) op.length = radius;
    const sx = center[0] + radius * Math.cos(angle);
    const sy = center[1] - radius * Math.sin(angle);
    const ex = center[0] + (radius-op.length) * Math.cos(angle);
    const ey = center[1] - (radius-op.length) * Math.sin(angle);
    line(svg, [sx, sy], [ex, ey], op.width, op.color);
};

function rline(svg, center, radius, start, repeats, len, width, color) {
    for(let angle = start+(Math.PI/2); angle < start+Math.PI*2+(Math.PI/2); angle += (Math.PI*2)/repeats) {
	// Length == 0 indicates a line that goes to the center of the compass
	if (len == 0) len = radius;
	const sx = center[0] + radius * Math.cos(angle);
	const sy = center[1] - radius * Math.sin(angle);
	const ex = center[0] + (radius-len) * Math.cos(angle);
	const ey = center[1] - (radius-len) * Math.sin(angle);
	line(svg, [sx, sy], [ex, ey], width, color);
    };
};

function repeat(svg, center, radius, start, repeats, op, fn) {
    let angle = start+(Math.PI/2);
    for(let i=0;i<repeats;i++) {
	fn(svg, center, radius, start, repeats, angle, i, op);
	angle += (Math.PI*2)/repeats;
    };
};

export default {
    circle: circle,
    rline: rline,
    rline2: rline2,
    rcircle: rcircle,
    repeat: repeat,

    dummy: null
};
