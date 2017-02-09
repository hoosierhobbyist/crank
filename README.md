# Crank Gaming Engine
## API quick reference
### Point (x, y, [ref={x: 0, y: 0}])
  + #### Properties
    - x
    - y
    - angle
    - radius
  + #### Methods
    - draw(ctx)

### Circle (r, [ref={x: 0, y: 0}])
  + #### Properties
    - a
    - b
    - r
    - center
  + #### Methods
    - has(pt)
    - intersections(ln)
    - collidesWith(other)
    - draw(ctx)

### Line (pt1, pt2)
  + #### Properties
    - m
    - b
    - length
    - domain
    - range
    - pts
  + #### Methods
    - has(pt)
    - intersection(ln)
    - draw(ctx)

### Polygon (...pts)
  + #### Properties
    - n
    - r
    - center
    - domain
    - range
    - pts
    - lns
  + #### Methods
    - has(pt)
    - collidesWith(other)
    - draw(ctx)
