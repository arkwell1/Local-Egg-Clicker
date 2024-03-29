const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let clickCount = 1000000; // Initialize clicking count from 1,000,000

// Load click count from file when server starts
loadClickCountFromFile();

io.on('connection', (socket) => {
    console.log(`A user connected from ${socket.handshake.address}. Total users: ${io.engine.clientsCount}`);

    socket.emit('clickCount', clickCount);

    socket.on('click', () => {
        clickCount++;
        io.emit('clickCount', clickCount);
        saveClickCountToFile(clickCount);
    });

    socket.on('disconnect', () => {
        console.log(`A user disconnected. Total users: ${io.engine.clientsCount}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function loadClickCountFromFile() {
    const filePath = path.join(__dirname, 'public', 'click_count.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error loading click count from file:', err);
            return;
        }
        clickCount = parseInt(data.trim(), 10);
        console.log('Click count loaded from file:', clickCount);
    });
}

function saveClickCountToFile(count) {
    const filePath = path.join(__dirname, 'public', 'click_count.txt');
    fs.writeFile(filePath, count.toString(), (err) => {
        if (err) {
            console.error('Error saving click count to file:', err);
        } // else {
        //     console.log('Click count saved to file successfully.');
        // }
    });
}
