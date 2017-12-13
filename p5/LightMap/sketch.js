var N, M;
var x, y;
var dotr = 6;
var map = [];
var dawn = [];
var dusk = [];
var goldenHour = [];
var goldenHourEnd = [];
var nadir = [];
var nauticalDawn = [];
var nauticalDusk = [];
var night = [];
var nightEnd = [];
var solarNoon = [];
var sunrise = [];
var sunriseEnd = [];
var sunset = [];
var sunsetStart = [];
var stat = [];

function init(){
	for( var i = 0; i < 200; i ++){
		map[i] = [];
		dawn[i] = [];
		dusk[i] = [];
		goldenHour[i] = [];
		goldenHourEnd[i] = [];
		nadir[i] = [];
		nauticalDawn[i] = [];
		nauticalDusk[i] = [];
		night[i] = [];
		nightEnd[i] = [];
		solarNoon[i] = [];
		sunrise[i] = [];
		sunriseEnd[i] = [];
		sunset[i] = [];
		sunsetStart[i] = [];
		stat[i] = [];
	}
	
}
var maplines;
function timeDataParsing() {
  for (var i=0; i<maplines.length; i++) {
    var arr = []; 
    var secs = 0;
    arr = maplines[i].split(" ");
    x = parseInt(arr[1]);
    y = parseInt(arr[0]);
    var type = arr[2];
    secs = parseInt(arr[3]); 

    if( type === "dawn" ) dawn[x][y] = secs;
    if( type === "dusk" ) dusk[x][y] = secs;
    if( type === "goldenHour" ) goldenHour[x][y] = secs;  
    if( type === "goldenHourEnd"  ) goldenHourEnd[x][y] = secs; 
    if( type === "nadir"  ) nadir[x][y] = secs;  
    if( type === "nauticalDawn"  ) nauticalDawn[x][y] = secs;
    if( type === "nauticalDusk"  ) nauticalDusk[x][y] = secs;  
    if( type === "night"  )  night[x][y] = secs;
    if( type === "nightEnd"  ) nightEnd[x][y] = secs;  
    if( type === "solarNoon"  ) solarNoon[x][y] = secs;  
    if( type === "sunrise"  ) sunrise[x][y] = secs;  
    if( type === "sunriseEnd"  ) sunriseEnd[x][y] = secs;  
    if( type === "sunset"  ) sunset[x][y] = secs;  
    if( type === "sunsetStart"  ) sunsetStart[x][y] = secs;   
    
  }
}


function setStatus() {
  var d = new Date();
  var curtime = d.getHours()*3600 + d.getMinutes()*60 + d.getSeconds()*1800;
  
  for (var x=0; x<M; x++) {
    for (var y=0; y<N; y++) {
      var tmp = 99999999;
      stat[x][y] = 100;
     
      if( dawn[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-dawn[x][y]));
      if( dusk[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-dusk[x][y]));
      if( goldenHour[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-goldenHour[x][y]));
      if( goldenHourEnd[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-goldenHourEnd[x][y]));
      if( nadir[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-nadir[x][y]));
      if( nauticalDawn[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-nauticalDawn[x][y]));
      if( nauticalDusk[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-nauticalDusk[x][y]));
      if( night[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-night[x][y]));
      if( nightEnd[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-nightEnd[x][y]));
      if( solarNoon[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-solarNoon[x][y]));
      if( sunrise[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-sunrise[x][y]));
      if( sunriseEnd[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-sunriseEnd[x][y]));
      if( sunset[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-sunset[x][y]));
      if( sunsetStart[x][y] != -1 ) tmp = Math.min(tmp,Math.abs(curtime-sunsetStart[x][y]));
      
      if( tmp == Math.abs(curtime-sunrise[x][y] ) ) stat[x][y] = 4;
      if( tmp == Math.abs(curtime-sunriseEnd[x][y] ) ) stat[x][y] = 3;
      if( tmp == Math.abs(curtime-goldenHourEnd[x][y] ) ) stat[x][y] = 2;
      if( tmp == Math.abs(curtime-solarNoon[x][y] ) ) stat[x][y] = 1;
      if( tmp == Math.abs(curtime-goldenHour[x][y] ) ) stat[x][y] = 0;
      if( tmp == Math.abs(curtime-sunsetStart[x][y] ) ) stat[x][y] = 1;
      if( tmp == Math.abs(curtime-sunset[x][y] ) ) stat[x][y] = 2;
      if( tmp == Math.abs(curtime-dusk[x][y] ) ) stat[x][y] = 3;
      if( tmp == Math.abs(curtime-nauticalDusk[x][y] ) ) stat[x][y] = 4;
      if( tmp == Math.abs(curtime-night[x][y] ) ) stat[x][y] = 5;
      if( tmp == Math.abs(curtime-nadir[x][y] ) ) stat[x][y] = 6;
      if( tmp == Math.abs(curtime-nightEnd[x][y] ) ) stat[x][y] = 7;
      if( tmp == Math.abs(curtime-nauticalDawn[x][y] ) ) stat[x][y] = 6;
      if( tmp == Math.abs(curtime-dawn[x][y] ) ) stat[x][y] = 5;
    }
  }
}
var lines;
function preload(){
  init();

  // Get map data
  lines = loadStrings("./mapmap.txt");
  maplines = loadStrings("./res.txt");
}

function setup() {
  var canvas = createCanvas(1200, 700);
  canvas.parent('sketch-holder');
  frameRate(3);
  background(0);
  pixelDensity(displayDensity());
  stroke(255);

  x = 50; 
  y = 50;
  N = floor(lines.length);
  M = lines[0].length;
  for (var i=0; i<lines.length; i++) {
    for (var j=0; j<lines[i].length; j++) {
      map[i][j] = lines[i].charCodeAt(j) - 48;
    }
  }
  //println("N = " + N + " M = " + M);
  //println( "" + hour() + " : " + minute() + " : " + second() );

  timeDataParsing();
  noStroke();
  
}

function draw() {
  setStatus();
  background(0);
  for (var x=0; x<M; x++) {
    for (var y=0; y<N; y++) {
      if ( stat[x][y] == 0 ) fill(0, 0, 0);
      if ( stat[x][y] == 1 ) fill(0, 125, 0);
      if ( stat[x][y] == 2 ) fill(125, 0, 0);
      if ( stat[x][y] == 3 ) fill(0, 0, 125);
      if ( stat[x][y] == 4 ) fill(0, 125, 125);
      if ( stat[x][y] > 10 ) fill(120,60,200);
      var t = stat[x][y];
      dotr = 6;
      fill(t*30,t*30,t*30);
      if ( map[y][x] == 1 ) ellipse(10+x*10, 10+y*10, dotr, dotr);
      //ellipse(10+x*10, 10+y*10, dotr, dotr);
    }
  }
}