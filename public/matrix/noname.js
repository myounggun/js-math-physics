//3d rotation
function rotate3D (pt, ori) {
     var x = pt[0];
     var y = pt[1];
     var z = pt[2];
     var result = [];
     var xyz = 0;
     var xa = ori[0]; ya = ori[1]; za = ori[2];
     
     if (xa != 0) {
      xyz = y*Math.cos(xa)-z*Math.sin(xa);
      z = y*Math.sin(xa)+z*Math.cos(xa);
      y = xyz;
     }
     if (ya != 0) {
      xyz = z*Math.cos(ya)-x*Math.sin(ya);
      x = z*Math.sin(ya)+x*Math.cos(ya);
      z = xyz;
     }
     if (za != 0) {
      xyz =x*Math.cos(za)-y*Math.sin(za);
      y = x*Math.sin(za)+y*Math.cos(za);
      x = xyz;
     }
     result[0] = x;
     result[1] = y;
     result[2] = z;
     return result;
}
//Convert 3D to 2D
function  convScreen(pt,  distance) {
    var scale = distance/(distance + pt[2]);
    var pt2D = [];
    pt2D[0]  =pt[0]*scale;
    pt2D[1]  =pt[1]*scale;
    return pt2D;
}
 
function mod2Pi( angle) {
 if (angle < -Math.PI) 
    angle +=(2*Math.PI);
 if (angle > Math.PI )
    angle -= (2*Math.PI) ;
 return angle;   
 }
 
function mod2Pi3D (ori9) {
 for (var i = 0; i<3; i++)
   ori9[i] =  mod2Pi(ori9[i]);
}
 
//MovieClip method extension drawFilledPoly3D
MovieClip.prototype.drawFilledPoly3D = function(corners,  fillC,  alp){
var  imax = corners.length;
var i;
this.clear();
this.lineStyle(0, fillC,  alp);
this.beginFill(fillC, alp);
this.moveTo(corners[0][0],  corners[0][1]);
for ( i = 1; i <imax; i++)
    this.lineTo(corners[i][0], corners[i][1]);
    this.lineTo(corners[0][0],  corners[0][1]);
  this.endFill();
}
 
function calDotData(pt3D1,   sizeCube,  sizeDot){
 var pt3DA = [];
if (Math.abs (pt3D1[0])==sizeCube) 
   {
    pt3DA[0] =[pt3D1[0], pt3D1[1] + sizeDot,  pt3D1[2]];
    pt3DA[1] = [pt3D1[0], pt3D1[1] + sizeDot,  pt3D1[2]+sizeDot];
    pt3DA[2] = [pt3D1[0], pt3D1[1],  pt3D1[2]+sizeDot];
    pt3DA[3] = [pt3D1[0], pt3D1[1] -sizeDot,  pt3D1[2]+sizeDot];
    pt3DA[4] = [pt3D1[0], pt3D1[1] -sizeDot,  pt3D1[2]];
    pt3DA[5] = [pt3D1[0], pt3D1[1] -sizeDot,  pt3D1[2]-sizeDot];
    pt3DA[6] = [pt3D1[0], pt3D1[1],  pt3D1[2]-sizeDot];
    pt3DA[7] = [pt3D1[0], pt3D1[1] +sizeDot,  pt3D1[2]-sizeDot];
    }
 else 
    {
     if( Math.abs (pt3D1[1])==sizeCube)   
    {
        pt3DA[0] = [pt3D1[0] + sizeDot,  pt3D1[1],  pt3D1[2]];
      pt3DA[1] = [pt3D1[0] + sizeDot,  pt3D1[1],  pt3D1[2]+ sizeDot];
      pt3DA[2] = [pt3D1[0],  pt3D1[1], pt3D1[2]+sizeDot];
      pt3DA[3] = [pt3D1[0] -sizeDot,  pt3D1[1], pt3D1[2]+sizeDot];
      pt3DA[4] = [pt3D1[0] -sizeDot,  pt3D1[1], pt3D1[2]];
      pt3DA[5] = [pt3D1[0] -sizeDot,  pt3D1[1], pt3D1[2]-sizeDot];
      pt3DA[6] = [pt3D1[0],  pt3D1[1], pt3D1[2]-sizeDot];
      pt3DA[7] = [pt3D1[0] +sizeDot,  pt3D1[1], pt3D1[2]-sizeDot];
 } else {
     pt3DA[0] =[pt3D1[0],  pt3D1[1] + sizeDot,  pt3D1[2]];
    pt3DA[1] = [pt3D1[0]+sizeDot , pt3D1[1] + sizeDot,  pt3D1[2]];
    pt3DA[2] = [pt3D1[0]+sizeDot , pt3D1[1],  pt3D1[2]];
    pt3DA[3] = [pt3D1[0]+sizeDot , pt3D1[1] - sizeDot,  pt3D1[2]];
    pt3DA[4] = [pt3D1[0],  pt3D1[1] - sizeDot,  pt3D1[2]];
    pt3DA[5] = [pt3D1[0]-sizeDot , pt3D1[1] - sizeDot,  pt3D1[2]];
    pt3DA[6] = [pt3D1[0]-sizeDot , pt3D1[1],  pt3D1[2]];
    pt3DA[7] = [pt3D1[0]-sizeDot , pt3D1[1] + sizeDot,  pt3D1[2]];
  }
 }
 return pt3DA;
}
 
//draw a dot of sizeDot centered at pt3D 
//on a face of face size sizeCube in current orientation ori2.
MovieClip.prototype.drawDot = function(oneDot,  ori2){
 
 var pt2DA = [];
 var oneD = [];
 for (var i = 0;  i <8;  i++)
                oneD[i] = rotate3D(oneDot[i],  ori2);
 for (var i = 0;  i <8;  i++)
            pt2DA[i] = convScreen(oneD[i], 400);
 
this.lineStyle(0, 0x000000,  100);
this.beginFill(0x000000, 100);
this.moveTo(pt2DA[0][0],  pt2DA[0][1]);
for ( i = 1; i <6; i = i + 2)
    this.curveTo(pt2DA[i][0], pt2DA[i][1], pt2DA[i+1][0], pt2DA[i+1][1]);
    this.curveTo(pt2DA[7][0], pt2DA[7][1], pt2DA[0][0], pt2DA[0][1]);
  this.endFill();
}
 
 
//coloring of a face and drawing dots on the face of face number fNum.
MovieClip.prototype.drawFace = function(fNum, corners,  fillC,  alp,  dotDA,  orientation1){
var jb = fNum*(fNum+1)/2;
var je =  (fNum+1)*(fNum+2)/2;
this.clear();
this.drawFilledPoly3D(corners, fillC, alp);
for(j = jb;  j<je; j++)
this.drawDot(dotDA[j],  orientation1);
}
 
MovieClip.prototype.newTextField = function(instance, depth1, x, y)
{
     return this.createTextField(instance, depth1, x, y, 0, 0);
}
 
TextField.prototype.updateField = function(text, fontName, fontSize, fontColor, backColor)
{
    // While not a movie clip extension, this function is included
    // here to supplement MovieClip.prototype.newTextField (above)
    if(backColor == undefined)
        this.background = false;
    else
    {
        this.background      = true;
        this.backgroundColor = backColor;
    }
    var newFormat   = new TextFormat();
    newFormat.color = fontColor;
    newFormat.font  = fontName;
    newFormat.size  = fontSize;
 newFormat.bold = true;
    this.autoSize = true; // Adjusts field size to hold text 
 
    this.text = text;
    this.setTextFormat(newFormat);
}
 
//---------------------
//createSolid (dice, sizeCube, sizeDot, fX, fY)
createSolid = function (dice,  sizeCube,  sizeDot,  fX, fY) {
 // create the empty movie clip 'dice' that will become the dice,
 // and inside it create the movie clips that will become the faces...
 this.createEmptyMovieClip(dice, fDepth);
 fDepth++;
 this[dice]._x = fX;
 this[dice]._y = fY;
 this[dice].sizeCube = sizeCube;
 this[dice].sizeDot = sizeDot;
 initializeSolid.apply(this[dice]);
};
initializeSolid = function () {
 // initialize the dice variables and events...
    var xa, ya,za;
    var zz;
 var pt2D = [1,1];
 var pt3D = [1,1,1];
 var aCube = [];
 var aCube2D = [];
 var cornsIndex8 = [];
 var cornsIndex3 = [];
    var corns2D = [];
    var corns2D3 = [];
    var x01, y01, x21, y21;
 var path;
 var dotsC =[];
 var dotData = [];
 var orientation = [];
    var numberOfFaces ;
    var numCorners ;
 
 this.createFaces = function(numFaces) {
  var numFaces, kkk;
   for (kkk=0; kkk<numFaces; kkk++) {
   this.createEmptyMovieClip("surface"+kkk, kkk);
         this["surface"+kkk].col = this.colorA[kkk];
 }
  for (kkk=0; kkk<8; kkk++) {
   this.createEmptyMovieClip("vert"+kkk, kkk+10);
         this["vert"+kkk].col3 = this.colorA3[kkk];
  }
 };
  
 this.drawsurface = function(ori) {
  var imax = aCube.length;
  var currentCube = [];
  for (var i = 0;  i <imax;  i++)
                currentCube[i]= rotate3D(aCube[i],  ori);
  for (var i = 0;  i <imax;  i++)
                aCube2D[i] = convScreen(currentCube[i], 400);
 for (s=0; s<numberOfFaces; s++) {
     path = this["surface"+s];
 for (var i = 0;  i <numCorners; i++)
    corns2D[i] =  aCube2D[cornsIndex8[s][i]];
    x01 =  corns2D[0][0]-corns2D[1][0];
    y01 =  corns2D[0][1]-corns2D[1][1];
    x21 =  corns2D[2][0]-corns2D[1][0];
    y21 =  corns2D[2][1]-corns2D[1][1];
    zz =  x01*y21 - y01*x21;
     if(zz>0)
         path.drawFace(s,  corns2D,  path.col,   100,  dotData,  ori);
   else
     path.clear();
     }
  //will cut  8 corners
  for (s=0; s<8; s++) {
     path = this["vert"+s];
 for (var i = 0;  i <3; i++)
             corns2D3[i] =  aCube2D[cornsIndex3[s][i]];
    x01 =  corns2D3[0][0]-corns2D3[1][0];
    y01 =  corns2D3[0][1]-corns2D3[1][1];
    x21 =  corns2D3[2][0]-corns2D3[1][0];
    y21 =  corns2D3[2][1]-corns2D3[1][1];
    zz =  x01*y21 - y01*x21;
     if(zz>0)
            path.drawFilledPoly3D(corns2D3,  path.col3,   100);
   else
     path.clear();
     } 
 };
 this.surfaceControl = function() {
  xa  *= 0.91; ya *= 0.91; za *=0.91;
  this.onMouseDown = function (){
           xa =  0.003*this._ymouse;
      ya = -0.003*this._xmouse;
  }
     orientation[0] += xa;
     orientation[1] += ya;
     orientation[2] += za;
  mod2Pi3D(orientation);
    this.drawsurface(orientation);
 
  if( (Math.abs(xa) + Math.abs (ya)+Math.abs (za))<0.0001)
  this.stop();
 };
 this.init = function() {
//color of 6 faces  
//  this.ColorA= [0xFF0000,  0x0000FF, 0x00FF00, 0x00FFFF, 0xFFFF00, 0xFF00FF ];
  this.ColorA= [0xff0000, 0xffa500, 0xffff00, 0x008000, 0x0000ff, 0x8a2be2];
//color of  8 corners  
//  this.ColorA3= [0x880000,  0x000088, 0x008800, 0x008888, 0x888800, 0x880088,  0x888888, 0xAAAAAA];
//  this.ColorA3= [0xCCCCCC,  0xCCCCCC, 0xCCCCCC,  0xCCCCCC, 0xCCCCCC,  0xCCCCCC,0xCCCCCC,  0xCCCCCC];
  this.ColorA3= [0xAA61AA, 0xFF8C00, 0xAA5555, 0x552AFF, 0x83704B, 0xD89AA0, 0x8363F5,  0x2E39A0]; 
 
        numberOfFaces = 6;
     numCorners = 8 ;
  var del = 0.3;
  orientation = [0, Math.PI/2, 0];
  var sd = 1 - del;
//Coordinates of 24 vertices
        aCube[0] = [sd, 1, -1];        aCube[1] = [1, sd, -1];        aCube[2] = [1, 1, -sd];
        aCube[3] = [sd, -1, -1];       aCube[4] = [1, -sd, -1];      aCube[5] = [1, -1, -sd];
        aCube[6] = [-sd, -1, -1];     aCube[7] = [-1, -sd, -1];     aCube[8] = [-1, -1, -sd];
        aCube[9] = [-sd, 1, -1];       aCube[10] = [-1, sd, -1];     aCube[11] = [-1, 1, -sd];
        aCube[12] = [sd, 1, 1];        aCube[13] = [1, sd, 1];        aCube[14] = [1, 1, sd];
        aCube[15] = [sd, -1, 1];      aCube[16] = [1, -sd, 1];       aCube[17] = [1, -1, sd];
        aCube[18] = [-sd, -1, 1];    aCube[19] = [-1, -sd, 1];      aCube[20] = [-1, -1, sd];
        aCube[21] = [-sd, 1, 1];      aCube[22] = [-1, sd, 1];        aCube[23] = [-1, 1, sd];
        for (var i=0; i<aCube.length; i++) {
           for (var j=0; j<3; j++) {
          aCube[i][j] = aCube[i][j]*this.sizeCube;
                }
             }
 
        for (var i=0; i<aCube.length; i++) 
           aCube2D[i] = pt2D;
 
 //Indices of vertices of 6 Octagons  representing 6 faces.
        cornsIndex8[0] = [0, 1, 4, 3, 6, 7, 10, 9];
     cornsIndex8[1] = [1, 2, 14, 13, 16, 17,  5, 4];
        cornsIndex8[2] = [3, 5, 17, 15, 18, 20, 8, 6];
        cornsIndex8[3] = [0, 9, 11, 23, 21, 12, 14, 2];
     cornsIndex8[4] = [7, 8, 20, 19, 22, 23, 11,10];
        cornsIndex8[5] = [12, 21, 22, 19, 18, 15, 16, 13];
//Indices of 8 riangles of  corners cut.  
  cornsIndex3[0] = [2, 1, 0];
     cornsIndex3[1] = [3, 4, 5];
        cornsIndex3[2] = [8, 7, 6];
        cornsIndex3[3] = [9, 10, 11];
     cornsIndex3[4] = [12, 13, 14];
        cornsIndex3[5] = [17, 16, 15];
     cornsIndex3[6] = [18, 19, 20];
        cornsIndex3[7] = [23, 22, 21];
//3D coordiantes of ceters of 21 dots. 
  dotsC[0] = [0, 0, -1];    dotsC[1] = [1, 0.4, -0.4];    dotsC[2] = [1, -0.4, 0.4]; 
     dotsC[3] = [-0.5, -1, -0.5];    dotsC[4] = [0, -1, 0];    dotsC[5] = [0.5, -1, 0.5]; 
     dotsC[6] = [-0.5, 1, -0.5];    dotsC[7] = [0.5, 1, -0.5];    dotsC[8] = [0.5, 1, 0.5]; 
     dotsC[9] = [-0.5, 1, 0.5];     dotsC[10] = [-1, 0, 0];    dotsC[11] = [-1, 0.5, -0.5]; 
     dotsC[12] = [-1, -0.5, -0.5];    dotsC[13] = [-1, -0.5, 0.5];    dotsC[14] = [-1, 0.5, 0.5]; 
     dotsC[15] = [-0.5, -0.5, 1];    dotsC[16] = [0, -0.5, 1];    dotsC[17] = [0.5, -0.5, 1]; 
     dotsC[18] = [0.5, 0.5, 1];    dotsC[19] = [0, 0.5, 1];    dotsC[20] = [-0.5, 0.5, 1]; 
 
for (var i=0; i<21; i++) {
           for (var j=0; j<3; j++) {
          dotsC[i][j] = dotsC[i][j]*this.sizeCube;
                }
             }
    
for (var i= 0; i<21; i++)
   dotData[i] = [pt3D,  pt3D, pt3D, pt3D, pt3D, pt3D, pt3D, pt3D];
 
for (var i= 0; i<21; i++)
   dotData[i] = calDotData(dotsC[i],   this.sizeCube,  this.sizeDot);
 
 
 
    this.newTextField("myText",  38, 80, 180);
  this.myText.updateField("Created by Prof. K-C Lee. (2002/12/29)", "_sans", 12, 0x666666);
     this.newTextField("myText1",  40,  -250, 160);
  this.myText1.updateField("Click the mouse to rotate. \nFarther the mouse, faster the motion.", "_sans", 14, 0x999999);
};
 // 
 this.init();
 this.createFaces(numberOfFaces);
 this.onEnterFrame = this.surfaceControl;
};
 
fDepth = 0;
var fx = 250;
var fy = 200;
sizeCube = 60;
sizeDot = 12;
 
// createSolid (dice,  dice_size, dot_size, fX, fY)
createSolid("dice", sizeCube,  sizeDot,  fx, fy);
 