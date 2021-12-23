const express = require('express');
const app = express();
const PORT = 2002;
app.use(express.json());
const pg = require('knex')({
  client: 'pg',
  version: '14',      
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:basic123@localhost:5432/animes'
});


app.get("/get", async(req, res) => {
  await pg.select().from('animes')
  .then(data => {
    res.send(data)
  })

  

})
app.put("/update", async (req, res) => {
  const {title: title, studio: studio, episodes: episodes, image: image, genre: genre} = req.body
      await pg('animes')
      .where({title:title})
      .update({
        title: title,
        studio: studio,
        episodes: episodes
      })
      .then(data => {
        res.sendStatus(200)
      })
})

app.post("/post",async(req,res)=>{
  const {title: title, studio: studio, episodes: episodes, image: image, genre: genre} = req.body
  if(title,  studio, episodes,  image){

        await pg('animes').insert({title: title, studio: studio, episodes: episodes, image: image, genre: genre})
        .then(data => {
          res.sendStatus(200);
        })
    
  }else{
    res.sendStatus(400);
  }
});



app.delete('/delete', async (req, res) => {
  const {id} = req.body
  if(!id) return res.sendStatus(400);
  await pg('animes').where('id', id)
  .del()
  .then(data => {
    if(data !== 1) return res.sendStatus(400)
    res.sendStatus(200)
  })
})

async function initialiseTables() {
  await pg.schema.hasTable('animes').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('animes', (table) => {
          table.increments();
          table.string('title');
          table.string('studio');
          table.integer('episodes');
          table.string('image');
          table.string('genre');
          table.timestamps(true, true);
        })
        .then(async () => {
          
        });
    }else{
      
    }});
    await pg.schema.hasTable('genre').then(async (exists) => {
      if (!exists) {
        await pg.schema
          .createTable('genre', (table) => {
            table.increments();
            table.string('genre');
            table.timestamps(true, true);
          })
          .then(async () => {
            
          });
      }else{
        
      }
  });
}
initialiseTables();

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);

});
