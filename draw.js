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

function rline(svg, center, radius, start, repeats, angle, i, op) {
    // Length == 0 indicates a line that goes to the center of the compass
    if (op.length == 0) op.length = radius;
    const sx = center[0] + radius * Math.cos(angle);
    const sy = center[1] - radius * Math.sin(angle);
    const ex = center[0] + (radius-op.length) * Math.cos(angle);
    const ey = center[1] - (radius-op.length) * Math.sin(angle);
    line(svg, [sx, sy], [ex, ey], op.width, op.color);
};

//
//  Rotate p2 around p1 by angle (in radians)
//
function rotate(p1, p2, angle) {
    let cos = Math.cos(angle),
        sin = Math.sin(angle),
        nx = (cos * (p2[0] - p1[0])) - (sin * (p2[1] - p1[1])) + p1[0],
        ny = (cos * (p2[1] - p1[1])) + (sin * (p2[0] - p1[0])) + p1[1];
    return [nx, ny];
}

const lineFunc = d3.line()
      .x(pt => pt[0])
      .y(pt => pt[1])
      .curve(d3.curveLinearClosed);

function rtri(svg, center, radius, start, repeats, angle, i, op) {    
    if (op.height == 0) op.height = radius;
    let triangle = [[center[0]-op.width/2, center[1]-radius], 
		    [center[0]+op.width/2, center[1]-radius],
		    [center[0], center[1]-radius+op.height]];
    triangle = triangle.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', op.lwidth)
	.style('stroke', op.color)
	.style('fill', op.fill)
	.attr('d', lineFunc(triangle));
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
    rcircle: rcircle,
    rline: rline,
    repeat: repeat,
    rtri: rtri,

    dummy: null
};
