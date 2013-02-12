var canvas,ctx,prevX=0,currX=0,prevY=0,currY=0;
var x="black",y=2;
function initDiagram()
{
    canvas=document.getElementById('can');
    ctx=canvas.getContext("2d");
    w=canvas.width;
    h=canvas.height;

    canvas.addEventListener("mousemove",function(e){ findxy('move',e)  },false);
    canvas.addEventListener("mousedown",function(e){ findxy('down',e)  },false);
    canvas.addEventListener("mouseup",function(e){ findxy('up',e)  },false);
    canvas.addEventListener("mouseout",function(e){ findxy('out',e)  },false);

    currX = w/2; currY = h/2;

    drawStar();
}
function color(obj)
{
    switch(obj.id)
    {
        case "green" : x="green";break;
        case "blue" : x="blue";break;
        case "red" : x="red";break;
        case "yellow" : x="yellow";break;
        case "orange" : x="orange";break;
        case "black" : x="black";break;
        case "white" : x="white";break;
    }
    if(x=="white") y=14;
    else y=2;

}
function draw()
{
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(currX,currY);
    ctx.strokeStyle=x;
    ctx.lineWidth=y;
    ctx.stroke();
    ctx.closePath();
}
function drawLine(sx, sy, text)
{
    ctx.beginPath();
    ctx.moveTo(currX,currY);
    ctx.lineTo(sx,sy);
    ctx.stroke();
    ctx.closePath();

    var angle = Math.atan2(sy-currY, sx-currX);

    var dist;
    //alert(text + ": " + degrees(angle));
    if (angle == 0) 
      dist = w - currX;
    else if (angle == Math.PI)
      dist = currX;
    else {
      var dx = currX;
      if (Math.cos(angle) > 0) dx = w-currX;
      var dy = currY;
      if (Math.sin(angle) > 0) dy = h-currY;
      dist = Math.min(Math.abs(dx/Math.cos(angle)), Math.abs(dy/Math.sin(angle)));
    }
      
    dist = .8* dist;
    //alert(text + ": " + degrees(angle) + ", dist = " + dist);
    var tx = dist * Math.cos(angle) + currX;
    var ty = dist * Math.sin(angle) + currY;
    /*
    if (tx < 0) tx = 0;
    if (ty < 10) ty = 10;
    if (tx > w) tx = w;
    if (ty > h) ty = h;
    alert(text + ": " + degrees(angle) + ", " + dist + ", " + tx + ", " + ty 
      + ", cos(angle) = " + Math.cos(angle)
      + ", sin(angle) = " + Math.sin(angle)
      );
    */

    size = (dist)*60/w;
    if (size < 10) size = 10;
    drawText(tx, ty, text,size);

}
function drawText(sx, sy, text,size) 
{
  ctx.fillStyle = "yellow";
  ctx.font = "bold " + size + "px Arial";
  var textW = ctx.measureText(text).width +6;
  var textH = ctx.measureText('M').width +6;
  //alert(textH);
  ctx.fillRect(sx-3, sy-textH + 3, textW, textH);
  ctx.fillStyle = "blue";
  ctx.fillText(text, sx, sy);
}
var mm = 120;	// margin
var ulx, uly, urx, ury, llx, lly, lrx, lry;	// upper-left X, upper-left y, etc
var lx, ly, rx, ry;				// left x, left y, right x, right y
var lineLength;
function initPoints() {
  lineLength = w*2;
  ulx = currX - Math.cos(radians(-45)) * lineLength;
  uly = currY - Math.cos(radians(-45)) * lineLength;

  urx = currX + Math.cos(radians(-45)) * lineLength;
  ury = uly;
  
  llx = ulx;
  lly = currY + Math.cos(radians(-45)) * lineLength;
  
  lrx = urx;
  lry = lly;

}
function radians(d) {
  return d*Math.PI/180;
}
function degrees(d) {
  return d * 180/Math.PI;
}
function drawStar()
{
    ctx.clearRect(0,0,w,h);

    ctx.strokeStyle=x;
    ctx.lineWidth=y;

    initPoints();
    
    drawLine(ulx, uly, "Text1");
    drawLine(urx, ury, "Text2");

    drawLine(0,currY, "Text3");
    drawLine(w,currY, "Text4");

    drawLine(llx, lly, "Text5");
    drawLine(lrx, lry, "Text6");

}
function findxy(res,e)
{

    if(res=='down')
    {
	prevX=currX;prevY=currY;
	currX=e.clientX-canvas.offsetLeft;
	currY=e.clientY-canvas.offsetTop; 

	drawStar();
    }
}
