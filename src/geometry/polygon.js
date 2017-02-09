//polygon.js

class Polygon {

  constructor(..._pts){
    if(_pts.length < 3){
      throw RangeError("Polygon objects must have at least three points");
    }//end if
    _pts.forEach(function(pt, i){
      if(typeof pt.x !== 'number'){
        throw TypeError(`invalid x-value for point ${i+1}`);
      }//end if
      if(typeof pt.y !== 'number'){
        throw TypeError(`invalid y-value for point ${i+1}`);
      }//end if
    });//end forEach

    Object.defineProperties(this, {
      n: {
        enumerable: true,
        get: function(){
          return _pts.length;
        }//end get
      },//end n
      r: {
        enumerable: true,
        get: function(){
          let r = 0;
          let center = this.center;

          _pts.forEach((pt) => {
            if(gt(dist(pt, center), r)){
              r = dist(pt, center);
            }//end if
          });//end forEach

          return r;
        }//end get
      },//end r
      center: {
        enumerable: true,
        get: function(){
          let x = 0;
          let y = 0;

          _pts.forEach(function(pt){
            x += pt.x;
            y += pt.y;
          });//end forEach

          return new Point(x /= this.n, y /= this.n);
        }//end get
      },//end center
      domain: {
        enumerable: true,
        get: function(){
          let lns = this.lns;
          let domain = new Float64Array(new ArrayBuffer(16));

          domain[0] = Math.min(...lns.map(ln => ln.domain[0]));
          domain[1] = Math.max(...lns.map(ln => ln.domain[1]));

          return domain;
        }//end get
      },//end domain
      range: {
        enumerable: true,
        get: function(){
          let lns = this.lns;
          let range = new Float64Array(new ArrayBuffer(16));

          range[0] = Math.min(...lns.map(ln => ln.range[0]));
          range[1] = Math.max(...lns.map(ln => ln.range[1]));

          return range;
        }//end get
      },//end range
      pts: {
        get: function(){
          return _pts.map(pt => new Point(pt.x, pt.y));
        }//end get
      },//end pts
      lns: {
        get: function(){
          let lns = [];
          let pts = this.pts;

          pts.forEach(function(pt, i){
            if(i === pts.length - 1){
              lns.push(new Line(pt, pts[0]));
            } else {
              lns.push(new Line(pt, pts[i+1]));
            }//end if/else
          });//end forEach

          return lns;
        }//end get
      }//end lns
    });//end defineProperites
  }//end constructor

  has(pt){
    let r = this.r;
    let center = this.center;
    let range = this.range;
    let domain = this.domain;

    if(gt(dist(pt, center), r)){
      return false;
    }//end if
    if(lt(pt.x, domain[0])){
      return false;
    }///end if
    if(gt(pt.x, domain[1])){
      return false;
    }//end if
    if(lt(pt.y, range[0])){
      return false;
    }//end if
    if(gt(pt.y, range[1])){
      return false;
    }//end if

    let intscts = [];
    let lns = this.lns;
    let control = new Line(new Point(domain[0]-1, pt.y), new Point(domain[1]+1, pt.y));

    lns.forEach(function(ln){
      let intsct = control.intersection(ln);

      if(ln.has(intsct)){
        if(control.has(intsct)){
          intscts.push(intsct);
        }//end if
      }//end if
    });//end forEach

    intscts.sort((pt1, pt2) => pt1.x - pt2.x);
    for(let i = 0; i < intscts.length; ++i){
      if(i % 2 === 0){
        if(le(intscts[i].x, pt.x)){
          if(i < intscts.length - 1){
            if(ge(intscts[i+1].x, pt.x)){
              return true;
            }//end if
          }//end if
        }//end if
      }//end if
    }//end for

    return false;
  }//end has

  collidesWith(other){
    if(other instanceof Polygon){
      let tRadius = this.r;
      let oRadius = other.r;
      let tCenter = this.center;
      let oCenter = other.center;
      let tDomain = this.domain;
      let oDomain = other.domain;
      let tRange = this.range;
      let oRange = other.range;

      if(gt(dist(tCenter, oCenter), tRadius + oRadius)){
        return false;
      }//end if
      if(lt(tDomain[1], oDomain[0])){
        return false;
      }//end if
      if(gt(tDomain[0], oDomain[1])){
        return false;
      }//end if
      if(lt(tRange[1], oRange[0])){
        return false;
      }//end if
      if(gt(tRange[0], oRange[1])){
        return false;
      }//end if

      let tPoints = this.pts;
      let oPoints = other.pts;

      for(let pt of tPoints){
        if(other.has(pt)){
          return true;
        }//end if
      }//end for
      for(let pt of oPoints){
        if(this.has(pt)){
          return true;
        }//end if
      }//end for

      let tLines = this.lns;
      let oLines = other.lns;

      for(let ln1 of tLines){
        for(let ln2 of oLines){
          let intsct = ln1.intersection(ln2);
          if(ln1.has(intsct)){
            if(ln2.has(intsct)){
              return true;
            }//end if
          }//end if
        }//end for
      }//end for

      return false;
    } else if(other instanceof Circle){
      if(gt(dist(this.center, other.center), this.r + other.r)){
        return false;
      }//end if
      if(this.has(other.center)){
        return true;
      }//end if

      for(let ln of this.lns){
        let intsct = other.intersections(ln);
        if(ln.has(intsct[0]) || ln.has(intsct[1])){
          return true;
        }//end if
      }//end for

      return false;
    } else {
      throw TypeError("argument 'other' must be an instance of either Circle or Polygon");
    }//end if/else if/else
  }//end collidesWith

  draw(ctx){
    let pts = this.pts;

    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    pts.forEach(function(pt, i){
      if(i === 0){
        ctx.moveTo(pt.x, -pt.y);
      } else {
        ctx.lineTo(pt.x, -pt.y);
        if(i === pts.length - 1){
          ctx.closePath();
        }//end if
      }//end if/else
    });//end forEach
    ctx.stroke();
    ctx.restore();
  }//end draw

}//end class Polygon
