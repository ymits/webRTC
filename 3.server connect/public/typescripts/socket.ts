import io = require('socket.io');

var socket = io.connect('http://localhost');
export = socket;