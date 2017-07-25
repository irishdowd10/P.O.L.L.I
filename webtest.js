// initialize everything, web server, socket.io, filesystem, johnny-five
var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http'),
  server = http.createServer(app).listen(4200),
  io = require('socket.io').listen(server),
  fs = require('fs'),
  five = require("johnny-five"),
  board,servo0,servo1,servo2,servo3,servo4,piezo;

app.use(express.static(path.join(__dirname, 'public')));
board = new five.Board();

servo0Data = [];
servo1Data = [];
servo2Data = [];
servo3Data = [];
servo4Data = [];

// on board ready
board.on("ready", function() {
  piezo = new five.Piezo(8);

  // setup a stanard servo, center at start
  servo0 = new five.Servo({
    pin:3,
    range: [0,180],
    type: "standard",
    center:true
  });

  servo1 = new five.Servo({
    pin:9,
    range: [0,180],
    type: "standard",
    center:true
  });

  servo2 = new five.Servo({
    pin:10,
    range: [0,180],
    type: "standard",
    center:true
  });

  servo3 = new five.Servo({
    pin:12,
    range: [0,180],
    type: "standard",
    center:true
  });

  servo4 = new five.Servo({
    pin:6,
    range: [0,180],
    type: "standard",
    center:true
  });

});

  board.repl.inject({
    piezo: piezo
  });

// make web server listen on chosen port

// app.listen(4200);


// handle web server
function handler (req, res) {
  fs.readFile(__dirname + '/controls.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading controls.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


// on a socket connection
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  // if board is ready
  // if(board.isReady){
  //   // read in sensor data, pass to browser
  //   sensor.on("data",function(){
  //     socket.emit('sensor', { raw: this.raw });
  //   });
  // }

  // if servo message received
  socket.on('servo0', function (data) {
    console.log(data);
    if(board.isReady){ servo0.to(data.pos);
    servo0Data.push(data);
    console.log(servo0Data[0])}
  });

  socket.on('servo1', function (data) {
    console.log(data);
    if(board.isReady){ servo1.to(data.pos);
      servo1Data.push(data);
      console.log(servo0Data[0]) }
  });

  socket.on('servo2', function (data) {
    console.log(data);
    if(board.isReady){ servo2.to(data.pos);
      servo2Data.push(data);
      console.log(servo0Data[0])  }
  });

  socket.on('servo3', function (data) {
    console.log(data);
    if(board.isReady){ servo3.to(data.pos);
      servo3Data.push(data);
      console.log(servo0Data[0])  }
  });

  socket.on('servo4', function (data) {
    console.log(data);
    if(board.isReady){ servo4.to(data.pos);
      servo4Data.push(data);
      console.log(servo0Data[0])  }
  });

  socket.on('piezo', function (){
    if(board.isReady){
      piezo.play({
        song: [
          ["C4", 1 / 4],
          ["D4", 1 / 4],
          ["F4", 1 / 4],
          ["D4", 1 / 4],
          ["A4", 1 / 4],
          [null, 1 / 4],
          ["A4", 1],
          ["G4", 1],
          [null, 1 / 2],
          ["C4", 1 / 4],
          ["D4", 1 / 4],
          ["F4", 1 / 4],
          ["D4", 1 / 4],
          ["G4", 1 / 4],
          [null, 1 / 4],
          ["G4", 1],
          ["F4", 1],
          [null, 1 / 2]
        ],
        tempo: 100
      });
    }
  })

});
