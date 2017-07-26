// initialize everything, web server, socket.io, filesystem, johnny-five
var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http'),
  server = http.createServer(app).listen(4200),
  io = require('socket.io').listen(server),
  fs = require('fs'),
  five = require("johnny-five"),
  board,servo0,servo1,servo2,servo3,servo4,piezo,led;

app.use(express.static(path.join(__dirname, 'public')));
board = new five.Board();



// on board ready
board.on("ready", function() {
  piezo = new five.Piezo(8);
  var led = new five.Led(13);
  led.blink(500);
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

board.on("exit", function() {
  var led = new five.Led(13);
  led.off();
});

  board.repl.inject({
    piezo: piezo
  });


// make web server listen on chosen port

// app.listen(4200);


// handle web server
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


// on a socket connection
io.sockets.on('connection', function (socket) {



  // if servo message received
  socket.on('servo0', function (data) {
    console.log(data);
    if(board.isReady){ servo0.to(data.pos);}
  });

  socket.on('servo1', function (data) {
    console.log(data);
    if(board.isReady){ servo1.to(data.pos);
    }
  });

  socket.on('servo2', function (data) {
    console.log(data);
    if(board.isReady){ servo2.to(data.pos);
    }
  });

  socket.on('servo3', function (data) {
    console.log(data);
    if(board.isReady){ servo3.to(data.pos);
      }
  });

  socket.on('servo4', function (data) {
    console.log(data);
    if(board.isReady){ servo4.to(data.pos);
     }
  });

  socket.on('piezo', function (){
    if(board.isReady){
      piezo.play({
          song: [
            ["A", 500],
            [null, 50],
            ["A", 500],
            [null, 50],
            ["A", 500],
            [null, 50],
            ["F", 350],
            [null, 50],
            ["C5", 150],
            [null, 50],
            ["A", 500],
            [null, 50],
            ["F", 350],
            [null, 50],
            ["C5", 150],
            [null, 50],
            ["A", 650],
            [null, 50],
            [null, 500],
            ["E5", 500],
            [null, 50],
            ["E5", 500],
            [null, 50],
            ["E5", 500],
            [null, 50],
            ["F5", 350],
            [null, 50],
            ["C5", 150],
            [null, 50],
            ["G4", 500],
            [null, 50],
            ["F", 350],
            [null, 50],
            ["C5", 150],
            [null, 50],
            ["A", 650],
            [null, 50],
            [null, 500],

            ["A5", 500],
            [null, 50],
            ["A", 300],
            [null, 50],
            ["A", 150],
            [null, 50],
            ["A5", 500],
            [null, 50],
            ["G#5", 325],
            [null, 50],
            ["G5", 175],
            [null, 50],
            ["F#5", 125],
            [null, 50],
            ["F5", 125],
            [null, 50],
            ["F#5", 250],
            [null, 50],
            [null, 325],
            ["A4", 250],
            [null, 50],
            ["D#5", 500],
            [null, 50],
            ["D5", 325],
            [null, 50],
            ["C#5", 175],
            [null, 50],
            ["C5", 125],
            [null, 50],
            ["B", 125],
            [null, 50],
            ["C5", 250],
            [null, 50],
            [null, 350],

            ["F", 250],
            [null, 50],
            ["G4", 500],
            [null, 50],
            ["F", 350],
            [null, 50],
            ["A", 125],
            [null, 50],
            ["C5", 500],
            [null, 50],
            ["A", 375],
            [null, 50],
            ["C5", 125],
            [null, 50],
            ["E5", 650],
            [null, 50],
            [null, 500],

            ["A5", 500],
            [null, 50],
            ["A", 300],
            [null, 50],
            ["A", 150],
            [null, 50],
            ["A5", 500],
            [null, 50],
            ["G#5", 325],
            [null, 50],
            ["G5", 175],
            [null, 50],
            ["F#5", 125],
            [null, 50],
            ["F5", 125],
            [null, 50],
            ["F#5", 250],
            [null, 50],
            [null, 325],
            ["A4", 250],
            [null, 50],
            ["D#5", 500],
            [null, 50],
            ["D5", 325],
            [null, 50],
            ["C#5", 175],
            [null, 50],
            ["C5", 125],
            [null, 50],
            ["B", 125],
            [null, 50],
            ["C5", 250],
            [null, 50],
            [null, 350],

            ["F", 250],
            [null, 50],
            ["G4", 500],
            [null, 50],
            ["F", 375],
            [null, 50],
            ["C5", 125],
            [null, 50],
            ["A", 500],
            [null, 50],
            ["F", 375],
            [null, 50],
            ["C5", 125],
            [null, 50],
            ["A", 650],
            [null, 50],
            [null, 650]
          ],
          tempo: 100000

      });
    }
  })

});
