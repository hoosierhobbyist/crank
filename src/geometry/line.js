import MinMax from '../misc/minMax.js';

function eq(a, b){
    return Math.abs(a - b) <= .1;
}//end eq
function le(a, b){
    return a < b || eq(a, b);
}//end le
function dist(pt1, pt2){
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}//end dist

export default class Line {
    
    constructor(pt1, pt2){
        
        Object.defineProperties(this, {
            m: {
                enumerable: true,
                get: function(){
                    if(eq(pt1.x, pt2.x)){
                        return NaN;
                    } else {
                        return (pt2.y - pt1.y) / (pt2.x - pt1.x);
                    }//end if/else
                }//end get
            },//end m
            b: {
                enumerable: true,
                get: function(){
                    if(eq(pt1.x, pt2.x)){
                        return NaN;
                    } else {
                        return -this.m * pt1.x + pt1.y;
                    }//end if/else
                }//end get
            },//end b
            length: {
                enumerable: true,
                get: function(){
                    return dist(pt1, pt2);
                }//end get
            },//end length
            domain: {
                enumerable: true,
                get: function(){
                    return new MinMax(pt1.x, pt2.x);
                }//end get
            },//end domain
            range: {
                enumerable: true,
                get: function(){
                    return new MinMax(pt1.y, pt2.y);
                }//end get
            },//end range
            pts: {
                get: function(){
                    return [pt1, pt2];
                }//end get
            }//end pts
        });//end defineProperties
    }//end constructor
    
    has(pt){
        let domain = this.domain;
        let range = this.range;
        
        if(le(domain.min, pt.x) && le(pt.x, domain.max)){
            if(le(range.min, pt.y) && le(pt.y, range.max)){
                if(this.m || this.m === 0){
                    return eq(pt.y, this.m * pt.x + this.b);
                } else {
                    return true;
                }//end if/else
            }//end if
        }//end if
        return false;
    }//end has
    
    intersection(other){
        let x = NaN;
        let y = NaN;
        
        if(!Number.isNaN(this.m)){
            if(!Number.isNaN(other.m)){
                if(!eq(this.m, other.m)){
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
