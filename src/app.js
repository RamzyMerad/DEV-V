const express = require('express');

const app = express();

const pg = require('knex')({
  client: 'pg',
  version: '14',      
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:basic123@localhost:5432/animes'
});

const users = [];


app.use(express.json());

app.get("/", async(req, res) => {
  await pg.select().from('animes')
  .then(data => {
    res.send(data)
  })

})
app.put('/', async (req, res) => {
  const {title: title, studio: studio, episodes: episodes, image: image} = req.body
  if(title,  studio, episodes,  image){
      await pg('animes')
      .where('title', title)
      .update({
        title: title,
        studio: studio,
        episodes: episodes,
      })
      .then(data => {
        if(data !== 1) return res.sendStatus(400)
        res.sendStatus(200)
      })
  }else{
    res.sendStatus(400);
  }
})

app.post("/",async(req,res)=>{
  const {title: title, studio: studio, episodes: episodes, image: image} = req.body
  if(title,  studio, episodes,  image){

        await pg('animes').insert({title: title, studio: studio, episodes: episodes, image: image})
        .then(data => {
          res.sendStatus(200);
        })
    
  }else{
    res.sendStatus(400);
  }
});



app.delete('/', async (req, res) => {
  const {id} = req.body
  console.log(id)
  if(!id) return res.sendStatus(400);
  console.log(id)
  await pg('animes').where('id', id)
  .del()
  .then(data => {
    if(data !== 1) return res.sendStatus(400)
    res.sendStatus(200)
  })
})

