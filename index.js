require('dotenv').config();

const { application } = require('./API/discord/index');
const { readdir } = require('fs');

const basePath = "./src/events/"

readdir(basePath, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
    if(!file.endsWith('.js')) return;
      
    const event = require(basePath + file);
    const listener = file.split(".")[0];
    application.on(listener, event.bind(null, application));
    });

    
});


