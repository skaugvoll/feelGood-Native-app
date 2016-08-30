var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var path = require('path');
var updater = require('electron-updater');

var browserWindow = require('browser-window');

var icon = path.join(__dirname,"app/images/feelGoodIcon.png");
var appIcon = null;
var win = null; //instance of chrome

var feelGoodAray = ["smooking!","Looking good!"," da man!",
                      "the best there is!", "awesome!",
                      "perfect","the bomb","nasty fresh",
                      "cool as ice", "kind"
                    ];

function random () {
    var high = feelGoodAray.length;
    return Math.floor((Math.random() * high));
}

function getIcon(){
  return icon;
}

function getThatFeeling(){
  return "You're ";
}

var ipcMain = require('electron').ipcMain;

ipcMain.on('load', function(event, arg){
  var sentence =  "You're " + feelGoodAray[random()];
  event.sender.send('print',sentence);
});


ipcMain.on('close', function(event, arg){
  win.hide();
});

app.on('ready', function(){
  win = new browserWindow({
      title: "feelGood",
      show: false,
      frame : false,
      x: 1200,  //Window's left offset from screen. Default is to center the window.
      y: 520, //Window's top offset from screen. Default is to center the window.
      height : 375,
      width: 633,
      resizable: false,
      movable: false,

      transparent: true
   });

  //win.webContents.openDevTools();

  appIcon = new Tray(icon);

  updater.on('ready',function(){
  });

  updater.on('updateRequired', function(){
    app.quit();
    updater.start();
  });

  updater.on('updateAvailable', function(){
    app.quit();
    updater.start();
  });


  var contextMenu = Menu.buildFromTemplate([
    {
      label: "You're " + feelGoodAray[random()]
    }]);
  appIcon.setToolTip("Push to feel good m8'10");
  //appIcon.setContextMenu(contextMenu); // right-mouse click meny.
  appIcon.displayBalloon({
    icon: getIcon(),
    title: "feelGood thinks that you're  ",
    content: feelGoodAray[random()]
  });

  appIcon.on('click', function(){
    win.loadURL(__dirname + '/app/index.html');
    win.show(true);
  });

});
