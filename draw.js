//
//  Implementation of drawing routines for map compasses using SVG & D3
//
const lineFunc = d3.line()
      .x(pt => pt[0])
      .y(pt => pt[1])
      .curve(d3.curveLinearClosed);

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
    const effRadius = radius+op.size/2;
    const sx = center[0] + effRadius * Math.cos(angle);
    const sy = center[1] - effRadius * Math.sin(angle);
    circle(svg, [sx, sy], Math.abs(op.size/2), op.lwidth, op.color, op.fill);
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

function rtri(svg, center, radius, start, repeats, angle, i, op) {    
    if (op.height == 0) op.height = radius;
    let left = [[center[0]-op.width/2, center[1]-radius],
		[center[0], center[1]-radius],
		[center[0], center[1]-radius+op.height]];
    left = left.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.fill)
	.attr('d', lineFunc(left));
    let right = [[center[0]+op.width/2, center[1]-radius],
		 [center[0], center[1]-radius],
		 [center[0], center[1]-radius+op.height]];
    right = right.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.darkFill)
	.attr('d', lineFunc(right));
    let triangle = [[center[0]-op.width/2, center[1]-radius], 
		    [center[0]+op.width/2, center[1]-radius],
		    [center[0], center[1]-radius+op.height]];
    triangle = triangle.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', op.lwidth)
	.style('stroke', op.color)
	.style('fill', 'none')
	.attr('d', lineFunc(triangle));
};

function rpoint(svg, center, radius, startAngle, repeats, angle, i, op) {
    let start = [center[0], center[1]-radius];
    let end = center;
    // Midpoint is the point on the center line where the
    // diamond will have its maximum width
    let midpoint;
    if (op.span <= 1) {
	// Treat span as a % of radius
	op.span = op.span*radius;
    };
    midpoint = [center[0], center[1]-radius+op.span];
    // The maximum width is one that just touches the adjacent point.
    // Phi is the angle between adjacent points.
    const phi = (2*Math.PI)/repeats;
    const maxWidth = Math.tan(phi/2)*(radius-op.span)*2;
    // Calculate the actual width based on width
    if (op.width <= 1) {
	op.width = op.width*maxWidth;
    };
    // Calculate the two side points
    let side1 = [center[0]-op.width/2, center[1]-radius+op.span];
    let side2 = [center[0]+op.width/2, center[1]-radius+op.span];
    // Rotate the diamond points.
    start = rotate(center, start, angle);
    end = rotate(center, end, angle);
    side1 = rotate(center, side1, angle);
    side2 = rotate(center, side2, angle);
    // Create and fill the left (light) side area
    const left = [start, side1, end];
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.lightFill)
	.attr('d', lineFunc(left));
    // Create and fill the right (dark) side area
    const right = [start, side2, end];
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.darkFill)
	.attr('d', lineFunc(right));
    // Draw the outline
    let p = [start, side1, end, side2];
    svg.append('path')
	.style('stroke-width', op.lwidth)
	.style('stroke', op.lcolor)
	.style('fill', 'none')
	.attr('d', lineFunc(p));
};

function rad2degrees(rad) {
    return rad * (180/Math.PI);
};

function rtext(svg, center, radius, startAngle, repeats, angle, iteration, op) {
    let x = center[0];
    let y = center[1]-radius;
    // If orientation == vertical, then rotate [x, y] around the center by
    // angle to find the spot for the label.
    if (op.orientation == 'vertical') {
	[x, y] = rotate(center, [x, y], angle-Math.PI/2);
    };
    // Now draw the label
    let label = svg.append('text')
	.attr('x', x)
	.attr('y', y)
	.style('font-family', op.font)
	.style('fill', op.color)
	.style('font-size', op.size)
	.style('font-style', op.style)
	.style('font-weight', op.weight)
	.style('text-anchor', 'middle')
	.text(op.texts[iteration]);
    // If orientation == radial, then we've drawn the label at 12 o'clock
    // and need to use SVG transform to rotate it around to the correct
    // spot.
    if (op.orientation != 'vertical') {
	label.attr('transform', 'rotate('+rad2degrees(angle-Math.PI/2)+','+center[0]+','+center[1]+')');
    } else {
	label.style('dominant-baseline', 'central');
    };
};

// Make a circular arc
function makeCircularArc(center, radius, start, end, num) {
    const [x, y] = center;
    const result = [];
    const step = (end-start)/num;
    for(let t=start;t<end;t += step) {
	result.push([radius*Math.cos(t)+x,radius*Math.sin(t)+y]);
    };
    result.push([radius*Math.cos(end)+x,radius*Math.sin(end)+y]);
    return result;
};

function rarc(svg, center, radius, startAngle, repeats, angle, iteration, op) {
    const arcStart = angle-0.5*op.subtend;
    const arcEnd = angle+0.5*op.subtend;
    const outsideEdge = makeCircularArc(center, radius, arcStart, arcEnd, 20);
    const insideEdge = makeCircularArc(center, radius-op.width, arcStart, arcEnd, 20);
    const polygon = outsideEdge.concat(insideEdge.reverse());
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.color)
	.attr('d', lineFunc(polygon));
};

function repeat(svg, center, radius, start, repeats, op, fn) {
    let angle = start+(Math.PI/2);
    for(let i=0;i<repeats;i++) {
	fn(svg, center, radius, start, repeats, angle, i, op);
	angle += (Math.PI*2)/repeats;
    };
};

function rdiamond(svg, center, radius, start, repeats, angle, i, op) {    
    if (op.height == 0) op.height = radius;
    let left = [[center[0], center[1]-radius],
		[center[0]-op.width/2, center[1]-radius+op.height/2],
		[center[0], center[1]-radius+op.height]];
    left = left.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.fill)
	.attr('d', lineFunc(left));
    let right = [[center[0], center[1]-radius],
		[center[0]+op.width/2, center[1]-radius+op.height/2],
		[center[0], center[1]-radius+op.height]];
    right = right.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.darkFill)
	.attr('d', lineFunc(right));
    let diamond = [[center[0], center[1]-radius],
		   [center[0]+op.width/2, center[1]-radius+op.height/2],
		   [center[0], center[1]-radius+op.height],
		   [center[0]-op.width/2, center[1]-radius+op.height/2]
		  ];
    diamond = diamond.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', op.lwidth)
	.style('stroke', op.color)
	.style('fill', 'none')
	.attr('d', lineFunc(diamond));
};

// Divides a line segment into pieces
function divideLineSegment(p1, p2, n) {
    // How many steps in this line?
    const dx = (p2[0]-p1[0])/n;
    const dy = (p2[1]-p1[1])/n;
    const npl = [p1];
    // We do this n-1 times so that we can use p2 as
    // the last point just to be sure it doesn't move
    // because of a rounding error.
    for(let i=1;i<n;i++) {
	npl.push([p1[0]+dx*i, p1[1]+dy*i]);
    };
    npl.push(p2);
    return npl;
};

const lineFuncWavy = d3.line()
      .x(pt => pt[0])
      .y(pt => pt[1])
      .curve(d3.curveNatural);

function rwave(svg, center, radius, startAngle, repeats, angle, i, op) {
    let start = [center[0], center[1]-radius];
    let end = center;
    // Midpoint is the point on the center line where the
    // diamond will have its maximum width
    let midpoint;
    if (op.span <= 1) {
	// Treat span as a % of radius
	op.span = op.span*radius;
    };
    midpoint = [center[0], center[1]-radius+op.span];
    // The maximum width is one that just touches the adjacent point.
    // Phi is the angle between adjacent points.
    const phi = (2*Math.PI)/repeats;
    const maxWidth = Math.tan(phi/2)*(radius-op.span)*2;
    // Calculate the actual width based on width
    if (op.width <= 1) {
	op.width = op.width*maxWidth;
    };
    // Create the side lines
    let side1 = divideLineSegment(start, [center[0]-op.width/2, center[1]-radius+op.span], 3);
    let side2 = divideLineSegment(start, [center[0]+op.width/2, center[1]-radius+op.span], 3);
    // Shift the mid points
    const shiftPercentage = 0.15;
    const shift1 = (side1[1][0]-side2[1][0])*shiftPercentage;
    side1[1][0] += shift1;
    side2[1][0] += shift1;
    const shift2 = (side1[2][0]-side2[2][0])*shiftPercentage;
    side1[2][0] -= shift2;
    side2[2][0] -= shift2;
    // Create a polygon consisting of the two sides, and the center point of the compass.
    // Remove the first point in one of the sides so that we don't end up with duplicate
    // points.  Reverse one of the sides so that the polygon flows correctly.
    let outline = side1.slice().reverse().concat(side2.slice(1)).concat([end]);
    // Create a center line and shift it's points
    let cline = divideLineSegment(start, [center[0], center[1]-radius+op.span], 3);
    cline[1][0] += shift1;
    cline[2][0] -= shift2;
    cline.push(end);
    // Construct left and right areas
    let left = cline.concat(side1.slice(1).reverse());
    let right = cline.concat(side2.slice(1).reverse());
    // Rotate everything
    outline = outline.map(pt => rotate(center, pt, angle));
    cline = cline.map(pt => rotate(center, pt, angle));
    left = left.map(pt => rotate(center, pt, angle));
    right = right.map(pt => rotate(center, pt, angle));
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.lightFill)
	.attr('d', lineFuncWavy(left));
    svg.append('path')
	.style('stroke-width', 0)
	.style('stroke', 'none')
	.style('fill', op.darkFill)
	.attr('d', lineFuncWavy(right));
    svg.append('path')
	.style('stroke-width', op.lwidth)
	.style('stroke', op.lcolor)
	.style('fill', 'none')
	.attr('d', lineFuncWavy(outline));
    svg.append('path')
	.style('stroke-width', op.lwidth)
	.style('stroke', op.lcolor)
	.style('fill', 'none')
	.attr('d', lineFuncWavy(cline));
};

export default {
    circle: circle,
    rcircle: rcircle,
    rline: rline,
    repeat: repeat,
    rtri: rtri,
    rpoint: rpoint,
    rtext: rtext,
    rarc: rarc,
    rdiamond: rdiamond,
    rwave: rwave,

    dummy: null
};
