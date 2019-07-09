const express = require("express");
// express = lightweight
// routers -> organizing our endpoints
// middleware -> allows us to expand and customize

const db = require('./data/db.js');

const server = express();
//const { hubs } = db;

// creating endpoints
// I want to make something available in case anyone needs it
server.use(express.json()); // makes post and put work
  //console.log('inside the get request');
  // specify a data type
  // set a status code
  // send a response
  server.get("/", (req, res) => {
    res.send("<h2>Hello World</h2>");
  });



//Create
server.post("/users", (req, res) => {
  
  const newUser = req.body;
 
  db.insert(newUser)
   
    .then(user => {
      res.status(201).json(user); /*created*/
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user to the database" })
    });
    
});

//Read
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      //handle error
      res.status(500).json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const {id} = req.params /* using id you have to define it first*/
    db.findById(id) /* be sure you are running the correct function found in db.js*/
      .then(id => {  /* if successful run this */
        res.status(200).json(id);
      })
      .catch(err => { /*if not successful run this instead*/
        //handle error
        res.status(500).json({ error: "The users information could not be retrieved." });
      });
  });


//Delete
server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
    .then(deleted => {
      res.status(204).end(); //end tells client that request is finished.
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting id' });
    });
});

//Update
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const {name, bio} = req.body
    if(!name|| !bio) {
      res.status(404).json({ error: "Name and Bio required" });
    }else {
    db.update(req.params.id, req.body )
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } 
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user to the database" });
    })}});


// listening
server.listen(8000, () => {
  console.log('Listening on port 8000');
});