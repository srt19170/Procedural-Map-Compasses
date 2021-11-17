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

export default {
    circle: circle,

    dummy: null
};
