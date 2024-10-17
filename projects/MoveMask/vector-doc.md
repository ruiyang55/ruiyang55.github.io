## Vector library

Vector: can be called with numbers `new Vector(0,0,0)` or an array (including a Vector) `new Vector(v)`

# Outputs and debug

* print: prints the vector to console in a readable way
outside of the given dimensions

# Making a new Vector

* clone(): returns a new Vector equal to this one
* clonePolarOffset(r, theta): returns a new Vector equal to this one, plus a polar offset
* getOffsetTo()
* getNormal()

# Overwrite this vector

* setTo(v): sets this equal to the given Vector (or array), or numbers
* setToLerp(v0, v1, pct): set to the linear interpolation of the two Vectors, e.g `v0*(1-pct) + v1*pct)`
* setToDifference(v1, v0, pct): set to `v1-v0`
* setToMultiple(v, m): set to `v*m`
* setToAddMultiples(): takes an even number of arguments (v0, m0, v1, m1, ....vn, mn) and sets it to `v0*m0 + v1*m1....+ vn*mn`
* setToNormal(v): sets it to the normal of a vector (ie, rotated 90° and normalized to length 1)
* setToAverage(): given n vectors, sets it to their average
* setToPolar(r, theta): sets it to the given polar coordinate
* setToPolarOffset(v, r, theta): sets it to vector, offset by the polar coordinate



# Modify this vector

* mult(m): multiply times a scalar
* div(m): divide by a scalar
* add() can take an array of vectors add(v0, v1, v2) or numbers add(x, y, z) and adds them to the current vector
*  sub(): can take an array of vectors add(v0, v1, v2) or numbers add(x, y, z) and subtracts them from the current vector
* addPolar(r, theta): add this polar coordinate to this vector
*  addMultiples(): takes an even number of arguments (v0, m0, v1, m1, ....vn, mn) and sets it to `v0*m0 + v1*m1....+ vn*mn`


# Magnitude and angle operations

* magnitude: accessor (not a function!, e.g. `v.magnitude`) 
* angle: accessor (not a function), angle in radians
* getDistanceTo(v): get distance to a vector
* angleTo(v): the angle to a Vector, in radians
* normalize(): if not a 0 magnitude, normalize (set length to 1)
* clampMagnitude(min, max): constrain the magnitude to this range
* wrap(x0, x1, y0, y1, ...): wrap around these coordinates
* clamp(x0, x1, y0, y1,...): clamp to this range


# Drawing
Note that these all start with (p...) because they need the p5 object to draw

* **vertex**(p): make a p5 vertex at this point
* **curveVertex**(p): make a p5 curveVertex at this point
* **bezierVertex**(p, cp0, cp1): make a p5 bezier vertex with these control points
* **polarOffsetVertex**(p): make a p5 vertex at this point, but with a polar offset
* **polarOffsetCurveVertex**(p): make a p5 curveVertex at this point, but with a polar offset
* draw(p): draw a circle (default r=1) at this point
* **drawLine**({p, center, multiple, paddingStart, paddingEnd, offsetNormal}): Draws this vector, positioned at the center, multiplied by m. Padding will offset the start and end points along the edge length, offsetNormal will offset relative to the normal (useful for drawing offset line segments)
* **drawLine**({p, center, multiple, paddingStart, paddingEnd, offsetNormal}): Draws from this vector *to another vector*. Padding will offset the start and end points along the edge length, offsetNormal will offset relative to the normal (useful for drawing offset line segments)
* **drawArrow**({p, center, multiple, paddingStart, paddingEnd, offsetNormal, color, arrowSize, arrowWidth, arrowNormal}): Draws this vector as an ARROW, positioned at the center, multiplied by m. Padding will offset the start and end points along the edge length, offsetNormal will offset relative to the normal. draws in color, with the arrowSize, arrowWidth, arrowIndent controling the size of the arrowhead (and are optional)
* **drawBlurryCircle**({p, color, layers, shade, radiusDieoff, opacityDieoff, radius, innerRadius, opacity}): Everything but p is optional.  Draws a blurry circle at this point, made of many overlapping circles. "shade=1" makes it fade to white in the center, "shade=-1" makes it fade to black, innerRadius makes the innermost circle that radius. Dieoffs make the progression non-linear.

# Other ways to create a vector
* Vector.empty(dimension): creates a [0,0...0] Vector of this dimension
* Vector.random(dimension): creates a n-dimensional vector with values [0-1]
* Vector.randomPolar(r): creates a random vector in a circle

Also has all of the setTo (but creates a new)

* lerp(v0, v1, pct): set to the linear interpolation of the two Vectors, e.g `v0*(1-pct) + v1*pct)`
* difference(v1, v0, pct): set to `v1-v0`
* multiple(v, m): set to `v*m`
* addMultiples(): takes an even number of arguments (v0, m0, v1, m1, ....vn, mn) and sets it to `v0*m0 + v1*m1....+ vn*mn`
* normal(v): sets it to the normal of a vector (ie, rotated 90° and normalized to length 1)
* average(): given n vectors, sets it to their average
* polar(r, theta): sets it to the given polar coordinate
* polarOffset(v, r, theta): sets it to vector, offset by the polar coordinate

