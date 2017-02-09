//line.js

class Line {

  constructor(_pt1, _pt2){
    if(typeof _pt1.x !== 'number'){
      throw TypeError("invalid x-value for pt1");
    }//end if
    if(typeof _pt1.y !== 'number'){
      throw TypeError("invalid y-value for pt1");
    }//end if
    if(typeof _pt2.x !== 'number'){
      throw TypeError("invalid x-value for pt2");
    }//end if
    if(typeof _pt2.y !== 'number'){
      throw TypeError("invalid y-value for pt2");
    }//end if

    Object.defineProperties(this, {
      m: {
        enumerable: true,
        get: function(){
          if(eq(_pt1.x, _pt2.x)){
            return NaN;
          } else {
            return (_pt2.y - _pt1.y) / (_pt2.x - _pt1.x);
          }//end if/else
        }//end get
      },//end m
      b: {
        enumerable: true,
        get: function(){
          if(eq(_pt1.x, _pt2.x)){
            return NaN;
          } else {
            return -this.m * _pt1.x + _pt1.y;
          }//end if/else
        }//end get
      },//end b
      length: {
        enumerable: true,
        get: function(){
          return dist(_pt1, _pt2);
        }//end get
      },//end length
      domain: {
        enumerable: true,
        get: function(){
          let domain = new Float64Array(new ArrayBuffer(16));

          if(le(_pt1.x, _pt2.x)){
            domain[0] = _pt1.x;
            domain[1] = _pt2.x;
          } else {
            domain[0] = _pt2.x;
            domain[1] = _pt1.x;
          }//end if/else

          return domain;
        }//end get
      },//end domain
      range: {
        enumerable: true,
        get: function(){
          let range = new Float64Array(new ArrayBuffer(16));

          if(le(_pt1.y, _pt2.y)){
            range[0] = _pt1.y;
            range[1] = _pt2.y;
          } else {
            range[0] = _pt2.y;
            range[1] = _pt1.y;
          }//end if/else

          return range;
        }//end get
      },//end range
      pts: {
        get: function(){
          return [new Point(_pt1.x, _pt1.y), new Point(_pt2.x, _pt2.y)];
        }//end get
      }//end pts
    });//end defineProperties
  }//end constructor

  has(pt){
    let domain = this.domain;
    let range = this.range;

    if(le(domain[0], pt.x) && le(pt.x, domain[1])){
      if(le(range[0], pt.y) && le(pt.y, range[1])){
        if(!Number.isNaN(this.m)){
          return eq(pt.y, this.m * pt.x + this.b);
        } else {
          return true;
        }//end if/else
      }//end if
    }//end if

    return false;
  }//end has

  intersection(other){
    if(!(other instanceof Line)){
      throw TypeError("argument 'other' must be an instance of Line class");
    }//end if

    let x = NaN;
    let y = NaN;

    if(!Number.isNaN(this.m)){
      if(!Number.isNaN(other.m)){
        if(ne(this.m, other.m)){
          x = (other.b - this.b) / (this.m - other.m);
          y = this.m * x + this.b;
        }//end if
      } else {
        x = other.pts[0].x;
        y = this.m * x + this.b;
      }//end if/else
    } else if(!Number.isNaN(other.m)) {
      x = this.pts[0].x;
      y = other.m * x + other.b;
    }//end if/else if

    return new Point(x, y);
  }//end intersection

  draw(ctx){
    let pts = this.pts;

    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(pts[0].x, -pts[0].y);
    ctx.lineTo(pts[1].x, -pts[1].y);
    ctx.stroke();
    ctx.restore();
  }//end draw

}//end class Line
