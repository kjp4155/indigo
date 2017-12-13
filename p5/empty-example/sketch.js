var N, M;
var x, y;
var dotr = 6;

function init(){
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
	var status = [];
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
		status[i] = [];
	}
	
}
var maplines;
function timeDataParsing() {
  for (var i=0; i<maplines.length; i++) {
    var arr = []; 
    var secs = 0;
    arr = maplines[i].split(" ");
    x = Integer.parseInt(arr[1]);
    y = Integer.parseInt(arr[0]);
    var type = arr[2];
    secs = Integer.parseInt(arr[3]); 

    if( type.equals("dawn") == true ) dawn[x][y] = secs;
    if( type.equals("dusk") == true ) dusk[x][y] = secs;
    if( type.equals("goldenHour") == true ) goldenHour[x][y] = secs;  
    if( type.equals("goldenHourEnd") == true ) goldenHourEnd[x][y] = secs; 
    if( type.equals("nadir") == true ) nadir[x][y] = secs;  
    if( type.equals("nauticalDawn") == true ) nauticalDawn[x][y] = secs;
    if( type.equals("nauticalDusk") == true ) nauticalDusk[x][y] = secs;  
    if( type.equals("night") == true )  night[x][y] = secs;
    if( type.equals("nightEnd") == true ) nightEnd[x][y] = secs;  
    if( type.equals("solarNoon") == true ) solarNoon[x][y] = secs;  
    if( type.equals("sunrise") == true ) sunrise[x][y] = secs;  
    if( type.equals("sunriseEnd") == true ) sunriseEnd[x][y] = secs;  
    if( type.equals("sunset") == true ) sunset[x][y] = secs;  
    if( type.equals("sunsetStart") == true ) sunsetStart[x][y] = secs;   
    
  }
}

function setStatus() {
  var curtime = hour()*3600 + minute()*60 + second()*1800;
  
  for (var x=0; x<M; x++) {
    for (var y=0; y<N; y++) {
      var tmp = 99999999;
      status[x][y] = 100;
      /*
      tmp = curtime-dawn[x][y]; if( tmp < 0 ) tmp += dsecs;
      if( tmp < mn ){
        mn = tmp; status[x][y] = 1;
      }
      */
      if( dawn[x][y] != -1 ) tmp = min(tmp,abs(curtime-dawn[x][y]));
      if( dusk[x][y] != -1 ) tmp = min(tmp,abs(curtime-dusk[x][y]));
      if( goldenHour[x][y] != -1 ) tmp = min(tmp,abs(curtime-goldenHour[x][y]));
      if( goldenHourEnd[x][y] != -1 ) tmp = min(tmp,abs(curtime-goldenHourEnd[x][y]));
      if( nadir[x][y] != -1 ) tmp = min(tmp,abs(curtime-nadir[x][y]));
      if( nauticalDawn[x][y] != -1 ) tmp = min(tmp,abs(curtime-nauticalDawn[x][y]));
      if( nauticalDusk[x][y] != -1 ) tmp = min(tmp,abs(curtime-nauticalDusk[x][y]));
      if( night[x][y] != -1 ) tmp = min(tmp,abs(curtime-night[x][y]));
      if( nightEnd[x][y] != -1 ) tmp = min(tmp,abs(curtime-nightEnd[x][y]));
      if( solarNoon[x][y] != -1 ) tmp = min(tmp,abs(curtime-solarNoon[x][y]));
      if( sunrise[x][y] != -1 ) tmp = min(tmp,abs(curtime-sunrise[x][y]));
      if( sunriseEnd[x][y] != -1 ) tmp = min(tmp,abs(curtime-sunriseEnd[x][y]));
      if( sunset[x][y] != -1 ) tmp = min(tmp,abs(curtime-sunset[x][y]));
      if( sunsetStart[x][y] != -1 ) tmp = min(tmp,abs(curtime-sunsetStart[x][y]));
      
      if( tmp == abs(curtime-sunrise[x][y] ) ) status[x][y] = 4;
      if( tmp == abs(curtime-sunriseEnd[x][y] ) ) status[x][y] = 3;
      if( tmp == abs(curtime-goldenHourEnd[x][y] ) ) status[x][y] = 2;
      if( tmp == abs(curtime-solarNoon[x][y] ) ) status[x][y] = 1;
      if( tmp == abs(curtime-goldenHour[x][y] ) ) status[x][y] = 0;
      if( tmp == abs(curtime-sunsetStart[x][y] ) ) status[x][y] = 1;
      if( tmp == abs(curtime-sunset[x][y] ) ) status[x][y] = 2;
      if( tmp == abs(curtime-dusk[x][y] ) ) status[x][y] = 3;
      if( tmp == abs(curtime-nauticalDusk[x][y] ) ) status[x][y] = 4;
      if( tmp == abs(curtime-night[x][y] ) ) status[x][y] = 5;
      if( tmp == abs(curtime-nadir[x][y] ) ) status[x][y] = 6;
      if( tmp == abs(curtime-nightEnd[x][y] ) ) status[x][y] = 7;
      if( tmp == abs(curtime-nauticalDawn[x][y] ) ) status[x][y] = 6;
      if( tmp == abs(curtime-dawn[x][y] ) ) status[x][y] = 5;
    }
  }
}
var lines;
function preload(){
  // Get map data
  lines = loadStrings("./mapmap.txt");
  maplines = loadStrings("./res.txt");
}

function setup() {
  createCanvas(1980, 1020);
  init();
  background(0);
  pixelDensity(displayDensity());
  stroke(255);

  x = 50; 
  y = 50;
  N = floor(lines.length);
  console.log(lines);
  for(var i in lines){
    console.log(i);
  }
  console.log(lines.length);
  console.log(lines[1]);
  M = lines[0].length;
  for (var i=0; i<lines.length; i++) {
    for (var j=0; j<lines[i].length; j++) {
      map[i][j] = lines[i].charCodeAt(j) - 48;
    }
  }
  println("N = " + N + " M = " + M);
  println( "" + hour() + " : " + minute() + " : " + second() );

  timeDataParsing();
  setStatus();
  noStroke();
  
}

function draw() {
  setStatus();
  for (var x=0; x<M; x++) {
    for (var y=0; y<N; y++) {
      if ( status[x][y] == 0 ) fill(0, 0, 0);
      if ( status[x][y] == 1 ) fill(0, 125, 0);
      if ( status[x][y] == 2 ) fill(125, 0, 0);
      if ( status[x][y] == 3 ) fill(0, 0, 125);
      if ( status[x][y] == 4 ) fill(0, 125, 125);
      if ( status[x][y] > 10 ) fill(120,60,200);
      var t = status[x][y];
     
      fill(t*30,t*30,t*30);
      if ( map[y][x] == 1 ) ellipse(10+x*10, 10+y*10, dotr, dotr);
      //ellipse(10+x*10, 10+y*10, dotr, dotr);
    }
  }
}