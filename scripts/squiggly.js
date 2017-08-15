var Squiggly = function () {

  function random(range) {
    var min = 3 //range * 0.075;
    var max = min * 2;
    return (min - Math.round(Math.random() * max));
  }

  function q(x1,y1,x2,y2) {
    var points = 4;
    var xd = (x2-x1) / points;
    var yd = (y2-y1) / points;
    var path = ` `;
    for(i=0; i<points; i++) {
      path += `q ${(xd/2)+random(xd)} ${(yd/2)+random(yd)} ${xd} ${yd}`;
    }
    return path;
  }

  function RectanglePath(x1, y1, x2, y2) {
    var	top = q(x1,y1,x2,y1);
    var right = q(x2,y1,x2,y2);
    var bottom = q(x2,y2,x1,y2);
    var left = q(x1,y2,x1,y1);
    return `M ${x1} ${y1} ${top} ${right} ${bottom} ${left}`;
    // return `M ${x1} ${y2} ${left}`;
  }

  return {
    rectangle: RectanglePath
  }

} ();