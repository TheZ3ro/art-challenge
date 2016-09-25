function setup() {
  createCanvas(700, 400);
  background(102);
  colorMode(HSB, 360, 100, 100);

  push();
  translate(width*0.5, height*0.5);
  rotate(HALF_PI*3);
  polygon(0, 0, 150, 3, 100);
  pop();
}

function draw() {

}

function polygon(x, y, radius, npoints, nparts) {
  var angle = TWO_PI / npoints;
  var points = [];
  var matrix =  [[],[],[]];
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
    var p = [sx, sy];
    append(points,p)
  }
  endShape(CLOSE);
  //println(points);
  var d = int(dist(points[1][0], points[1][1], points[2][0], points[2][1]));
  for (var i = 0; i < npoints; i += 1) {
    var n = angle*i;
    for (var j = 0; j < d; j+=d/nparts){
      var newpoint = []
      var ang = getAngle(i);
      append(newpoint, points[i][0]+j*cos(ang+n))
      append(newpoint, points[i][1]-j*sin(ang+n))
      /* // This will draw every point on each side
      beginShape();
      strokeWeight(3);
      if (j == d/20) {
        stroke('red');
      } else {
        stroke('blue');
      }
      vertex(newpoint[0],newpoint[1]);
      endShape(CLOSE);
      */
      append(matrix[i],newpoint)
    }
  }
  strokeWeight(1);
  var h = 0;
  for(var i = 0; i < nparts; i++) {
    h = (h + 360/nparts) % 360;
    stroke(h, 90, 90);
    line(matrix[0][i][0], matrix[0][i][1], matrix[1][i][0], matrix[1][i][1]);
    line(matrix[1][i][0], matrix[1][i][1], matrix[2][i][0], matrix[2][i][1]);
    line(matrix[2][i][0], matrix[2][i][1], matrix[0][i][0], matrix[0][i][1]);
  }
}

function getAngle(i) {
  if (i == 0) {
    return PI-PI/6;
  }
  else if (i == 1) {
    return HALF_PI*3;
  }
  else if (i == 2) {
    return PI/6;
  }
}
