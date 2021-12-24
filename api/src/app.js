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

//get
app.get("/get/animes", async(req, res) => {
  await pg.select().from('animes')
  .then(data => {
    res.send(data)
  })
})

  app.get("/get/genre", async(req, res) => {
    await pg.select().from('genre')
    .then(data => {
      res.send(data)
    })
})
//update
app.put("/update/animes", async (req, res) => {
  const {title: title, studio: studio, episodes: episodes, image: image, genre: genre} = req.body
      await pg('animes')
      .where({title:title})
      .update({
        title: title,
        studio: studio,
        episodes: episodes,
        genre:genre
      })
      .then(data => {
        res.sendStatus(200)
      })
});

app.put("/update/genre", async (req, res) => {
  const {genre: genre} = req.body
      await pg('genre')
      .where({genre:genre})
      .update({
        genre:genre
      })
      .then(data => {
        res.sendStatus(200)
      })
});

// post
app.post("/post/animes",async(req,res)=>{
  const {title: title, studio: studio, episodes: episodes, image: image, genre: genre} = req.body
  if(title,  studio, episodes,  image,genre){

        await pg('animes').insert({title: title, studio: studio, episodes: episodes, image: image, genre: genre})
        .then(data => {
          res.sendStatus(200);
        })
    
  }else{
    res.sendStatus(400);
  }
  
});
app.post("/post/genre",async(req,res)=>{
  const {genre: genre} = req.body
  if(genre){

        await pg('genre').insert({genre: genre})
        .then(data => {
          res.sendStatus(200);
        })
    
  }else{
    res.sendStatus(400);
  }
  
});


// delete
app.delete('/delete/animes', async (req, res) => {
  const {id} = req.body
  if(!id) return res.sendStatus(400);
  await pg('animes').where('id', id)
  .del()
  .then(data => {
    if(data !== 1) return res.sendStatus(400)
    res.sendStatus(200)
  })
})

app.delete('/delete/genre', async (req, res) => {
  const {id} = req.body
  if(!id) return res.sendStatus(400);
  await pg('genre').where('id', id)
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
