const { MongoClient} = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();

const uri = process.env.DB_LINK

const client = new MongoClient(uri);

async function main(){
    
    
    try{
        await client.connect();
        
        //await listDatabases(client);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}

/*
 async function listDatabases(){
     databaselist = await client.db().admin().listDatabases();
     
     console.log('Databases');
     databaselist.databases.forEach(db => console.log(` - ${db.name}`));
 }
 */


async function inserirNota(note){
    try{
        await client.connect();

        const res = await client.db('notas').collection('tabela_notas').insertOne(note);
        console.log(`Foi inserido uma nota. ID: ${res.insertedId}`)
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
}

async function recuperarTodasNotas(){
    let list = []
    try{
        await client.connect()
        const res = await client.db('notas').collection('tabela_notas').find({}).toArray();
        
        list = res
    }catch(e){
        console.log(e)
    }finally{
        await client.close()
    }
    return list
}  

async function recuperarNota(id){
    try{
        await client.connect()
        const res = await client.db('notas').collection('tabela_notas').findOne({_id: new ObjectId(id)});
        console.log(res)
        return res
    }catch(e){
        console.log(e)
    }finally{
        await client.close()
    }
}  

async function atualizarNota(id, dados){
    try{
        await client.connect()
        const res = await client.db('notas').collection('tabela_notas').updateOne({ 
                _id: new ObjectId(id) // tem que importar a função ObjectId
            }, 
            {$set: dados}
        )
        return res;
    }catch(e){
        console.log(e);
    }finally{
        await client.close()
    }
}

async function deletarNota(id){
    try{
        await client.connect()
        const res = await client.db("notas").collection('tabela_notas').deleteOne({_id: new ObjectId(id)})
        console.log(res);
        return res
    }catch(e){
        console.log(e)
    }finally{
        await client.close()
    }
}

/*try {
    await client.connect();
    const database = client.db("notes");
    const movies = database.collection("tabela_notas");
    
    const cursor = movies.find({});
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}*/

module.exports = {
    inserirNota,
    recuperarTodasNotas, 
    atualizarNota,
    recuperarNota,
    deletarNota
} 