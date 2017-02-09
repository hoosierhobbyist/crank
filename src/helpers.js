//helpers.js

function eq(a, b){
  return Math.abs(a - b) <= .1;
}//end eq
function ne(a, b){
  return !eq(a, b);
}//end ne
function lt(a, b){
  return ne(a, b) && a < b;
}//end lt
function gt(a, b){
  return ne(a, b) && a > b;
}//end gt
function le(a, b){
  return a < b || eq(a, b);
}//end le
function ge(a, b){
  return a > b || eq(a, b);
}//end ge
function sq(n){
  return n * n;
}//end sq
function dist(pt1, pt2){
  return Math.sqrt(sq(pt2.x - pt1.x) + (pt2.y - pt1.y));
}//end dist
