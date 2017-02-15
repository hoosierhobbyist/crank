//circle.js

class Circle {

  constructor(_r, _ref = {x: 0, y: 0}){
    if(_r < 0){
      throw RangeError("radius must be greater than or equal to zero");
    }//end if
    if(typeof _ref.x !== 'number'){
      throw TypeError("invalid x-value for reference object");
    }//end if
    if(typeof _ref.y !== 'number'){
      throw TypeError("invalid y-value for reference object");
    }//end if

    Object.defineProperties(this, {
      a: {
        enumerable: true,
        get: function(){
          return _ref.x;
        }//end get
      },//end a
      b: {
        enumerable: true,
        get: function(){
          return _ref.y;
        }//end get
      },//end b
      r: {
        enumerable: true,
        get: function(){
          return _r;
        },//end get
        set: function(value){
          value = parseFloat(value);
          if(value >= 0){
            _r = value;
          }//end if
        }//end set
      },//end r
      center: {
        get: function(){
          return new Point(this.a, this.b);
        }//end get
      }//end center
    });//end defineProperties
  }//end constructor

  has(pt){
    return le(dist(this.center, pt), this.r);
  }//end has

  intersections(ln){
    if(!(ln instanceof Line)){
      throw TypeError("argument 'other' must be an instance of the Line class");
    }//end if

    let x1 = NaN;
    let y1 = NaN;
    let x2 = NaN;
    let y2 = NaN;

    if(Number.isNaN(ln.m)){
      if(ge(ln.pts[0].x, cr.a - cr.r)){
        if(le(ln.pts[0].x, cr.a + cr.r)){
          x1 = ln.pts[0].x;
          y1 = cr.b + Math.sqrt(sq(cr.r) - sq(x1 - cr.a));
          x2 = ln.pts[0].x;
          y2 = cr.b + Math.sqrt(sq(cr.r) - sq(x2 - cr.a));
        }//end if
      }//end if
    } else {
      let a = 1 + sq(ln.m);
      let b = 2 * (ln.m * ln.b - ln.m * cr.b - cr.a);
      let c = sq(cr.a) + sq(cr.b) + sq(ln.b) - sq(cr.r) - 2 * ln.b * cr.b;
      let det = sq(b) - 4 * a * c;

      if(det >= 0){
        x1 = (-b + Math.sqrt(det)) / (2 * a);
        y1 = ln.m * x1 + ln.b;
        x2 = (-b - Math.sqrt(det)) / (2 * a);
        y2 = ln.m * x2 + ln.b;
      }//end if
    }//end if/else

    return [new Point(x1, y1), new Point(x2, y2)];
  }//end intersections

  collidesWith(other){
    if(other instanceof Circle){
      if(le(dist(this.center, other.center), this.r + other.r)){
        return true;
      }//end if

      return false;
    } else if(other instanceof Polygon){
      if(gt(dist(this.center, other.center), this.r + other.r)){
        return false;
      }//end if
      if(other.has(this.center)){
        return true;
      }//end if

      for(let ln of other.lns){
        let intsct = this.intersections(ln);
        if(ln.has(intsct[0]) || ln.has(intsct[1])){
          return true;
        }//end if
      }//end for

      return false;
    } else if(other instanceof Line){
      if(this.has(other.pts[0]) || this.has(other.pts[1])){
        return true;
      } else {
        let intscts = this.inersections(other);
        if(other.has(intscts[0]) || other.has(intscts[1])){
          return true;
        }//end if
      }//end else

      return false;
    } else {
      throw TypeError("argument 'other' must be an instance of Line, Circle or Polygon");
    }//end if/else if/else
  }//end collidesWith

  draw(ctx){
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(this.a, -this.b, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }//end draw

}//end class Circle
