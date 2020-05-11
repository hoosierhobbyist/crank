module.paths.push('C:\\Users\\sedab\\AppData\\Roaming\\npm\\node_modules');

const path = require('path');
const express = require('express');
express.static.mime.define({'application/javascript': ['js']});

const port = 3000;
const hostname = '127.0.0.1';
const server = express();

server.use('/src', express.static(__dirname + '/src'));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});//end get

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});//end listen
