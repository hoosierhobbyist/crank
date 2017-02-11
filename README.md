# Crank Gaming Engine
## API quick reference
### class Point (x, y [,ref={x: 0, y: 0}])
  + **Properties**
    - x
    - y
    - angle
    - radius
  + **Methods**
    - draw(ctx)

### class Circle (r [,ref={x: 0, y: 0}])
  + **Properties**
    - a
    - b
    - r
    - center
  + **Methods**
    - has(pt)
    - intersections(ln)
    - collidesWith(other)
    - draw(ctx)

### class Line (pt1, pt2)
  + **Properties**
    - m
    - b
    - length
    - domain
    - range
    - pts
  + **Methods**
    - has(pt)
    - intersection(ln)
    - draw(ctx)

### class Polygon (...pts)
  + **Properties**
    - n
    - r
    - center
    - domain
    - range
    - pts
    - lns
  + **Methods**
    - has(pt)
    - collidesWith(other)
    - draw(ctx)

### class Emitter (maxListeners=10)
  + **Properties**
    - events
    - maxListeners
  + **Methods**
    - on(event, listener)
    - once(event, listener)
    - emit(event [,...args])
    - remove(event, listener)

### Crank - Emitter instance
  + **Properties**
    - left
    - right
    - top
    - bottom
    - mouse
    - canvas
    - ctx
    - isRunning
    - frameRate
  + **Methods**
    - start()
    - stop()
    - clear()
    - isDown(key)
