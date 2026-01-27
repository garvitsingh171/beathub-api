import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const MONGODB_URI = process.env.MONGODB_URI

async function connectToDB() {
    try {
        await mongoose.connection(MONGODB_URI)
        console.log('Connected Successfully')
    } 
    catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}