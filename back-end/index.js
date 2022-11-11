import fs from 'fs'
import path from 'path';
import csv from 'csvtojson'
import { setTimeout } from 'timers/promises';
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://rodrigo:senha@rodrigo.8fj9sjv.mongodb.net/?retryWrites=true&w=majority";

const runDados = async (json) => {
    const selecao_queimadas = new MongoClient(uri);
    try {
        const database = selecao_queimadas.db("selecao_queimadas");
        const queimadas = database.collection("queimadas");
      // create a document to insert
    const result = await queimadas.insertOne(json);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch(error) {
        console.log('Some error:',error)
    }
    await selecao_queimadas.close();
}

export const pegarDadosCsv = async () => {
    const csvFile = fs.createReadStream(
        path.join("./fire_risk.csv")
    );
    async function Data (json) {
        // Utilizo o Timeout Para que o Sistema não Sobrecarregue com a demanda de informaçoes e com a biblioteca 
        console.log(json)
        await runDados(json)
        
    }

    function Error(err) {
        console.error('Some error:', err.message);
    }
    function Done() {
        console.log('Done!!!');
    }
    csv({ delimiter: ';' }).fromStream(csvFile).subscribe(
        Data,
        Error,
        Done
    );
}

