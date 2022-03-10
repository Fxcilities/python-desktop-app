/*
Python Desktop App Configuation

This source code was originally from https://www.fyears.org/2015/06/electron-as-gui-of-python-apps.html
Modified for further customization, and better preformance

Read the comments to see which values to change

Python must be in PATH for this to work
to check if it is, type `python` into console, and if it opens python shell, it will work.
*/

const { BrowserWindow, Menu } = require('electron');
const electron = require('electron');
const app = electron.app;

// Set this to true if you want the application menu buttons (File, Edit, etc...)
Menu.setApplicationMenu(false)

const host = "localhost"; // This value should only be one of the two options: localhost, 127.0.0.1   -   Other ips such as 0.0.0.0 will not work due to obvious reasons
const port = 5000; // Change this to your liking. Example: 80, 443, 5000

const width = 1000; // Change this value to edit the width of the application
const height = 500; // Change this value to edit the height of the application
const hasFrame = true; // Change this value to false if you want the application to be frameless

/*
From now on values should not be changed
*/

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    var python = require('child_process').spawn('python', ['../main.py', host, port]);
    
    var mainWindow = new BrowserWindow({
      width: width, 
      height: height,
      frame: hasFrame,
    });
    mainWindow.loadURL(`http://${host}:${port}`);
    mainWindow.on('closed', function() {
      python.kill('SIGINT'); // Kill python process with keyboard inturrupt
    });

    python.stdout.on('data', (data) => console.log(data.toString('utf8'))); // log output to console
    python.stderr.on('data', (data) => console.log(data.toString('utf8'))); // Log errors to console
})