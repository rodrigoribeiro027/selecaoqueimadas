import express from "express";
import cors from "cors";
import multer from 'multer';
import mongoose from"mongoose"
import { pegarDadosCsv } from "./index.js";

export const coneccao = 'mongodb+srv://rodrigo:senha@rodrigo.8fj9sjv.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(
    coneccao,
    { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },(err) => {
    if (err) {
    console.log("error in connection");
    } else {
    console.log("mongodb is connected");
    }});


const app = express();

const upload = multer({
    dest: './tmp'
})

try {
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
app.use(express.json());
app.use(cors());

app.get('/PegarCSV', async (request, response) => {
    pegarDadosCsv()
    response.json({'deu':'deucerto'})
});


app.listen(8042, () => console.log('Server running at port 8042'));