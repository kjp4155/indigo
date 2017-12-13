int N, M;
int x, y;
int[][] map = new int[1050][1050];
String filename= "../pde_codes/mapmap.txt";
int dotr = 6;
int[][] dawn = new int[200][200];
int[][] dusk = new int[200][200];
int[][] goldenHour = new int[200][200];
int[][] goldenHourEnd = new int[200][200];
int[][] nadir = new int[200][200];
int[][] nauticalDawn = new int[200][200];
int[][] nauticalDusk = new int[200][200];
int[][] night = new int[200][200];
int[][] nightEnd = new int[200][200];
int[][] solarNoon = new int[200][200];
int[][] sunrise = new int[200][200];
int[][] sunriseEnd = new int[200][200];
int[][] sunset = new int[200][200];
int[][] sunsetStart = new int[200][200];
int[][] status = new int[200][200];

void timeDataParsing() {
  String[] lines = loadStrings("../pde_codes/res.txt");
  for (int i=0; i<lines.length; i++) {
    String[] arr; 
    int secs = 0;
    arr = lines[i].split(" ");
    x = parseInt(arr[1]);
    y = parseInt(arr[0]);
    String type = arr[2];
    secs = parseInt(arr[3]); 

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

void setStatus() {
  int curtime = hour()*3600 + minute()*60 + second()*1800;
  int dsecs = 24*3600;
  for (int x=0; x<M; x++) {
    for (int y=0; y<N; y++) {
      int mn = 9999999, tmp = 99999999;
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

void setup() {
  //size(1980, 1020);
  background(0);
  //pixelDensity(displayDensity());
  stroke(255);

  x = 50; 
  y = 50;

  // Get map data
  String[] lines = loadStrings(filename);
  N = lines.length;
  M = lines[0].length();
  for (int i=0; i<lines.length; i++) {
    for (int j=0; j<lines[i].length(); j++) {
      map[i][j] = lines[i].charAt(j) - '0';
    }
  }
  println("N = " + N + " M = " + M);
  println( "" + hour() + " : " + minute() + " : " + second() );

  timeDataParsing();
  setStatus();
  noStroke();
}

void draw() {
  setStatus();
  for (int x=0; x<M; x++) {
    for (int y=0; y<N; y++) {
      if ( status[x][y] == 0 ) fill(0, 0, 0);
      if ( status[x][y] == 1 ) fill(0, 125, 0);
      if ( status[x][y] == 2 ) fill(125, 0, 0);
      if ( status[x][y] == 3 ) fill(0, 0, 125);
      if ( status[x][y] == 4 ) fill(0, 125, 125);
      if ( status[x][y] > 10 ) fill(120,60,200);
      int t = status[x][y];
      fill(t*30,t*30,t*30);
      if ( map[y][x] == 1 ) ellipse(10+x*10, 10+y*10, dotr, dotr);
      //ellipse(10+x*10, 10+y*10, dotr, dotr);
    }
  }
}