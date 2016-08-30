var ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.send('load','huffda');

ipcRenderer.on('print',function(event, rec){
    document.getElementById("feeling").innerHTML = rec;
});

setTimeout(function(){
  ipcRenderer.send('close',"done");
},3000);
