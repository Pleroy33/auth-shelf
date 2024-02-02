const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
  router.get('/', (req, res) => {
    console.log('in /get route')
    console.log('in authenicated?', req.isAuthenticated())
    console.log('user,', req.user)

    if( req.isAuthenticated()){
    const query = `
      SELECT * FROM "item"
        ORDER BY "description" ASC;
    `;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all movies', err);
        res.sendStatus(500)
      })}else {
        res.sendStatus(403)
      }
  
  });

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
  if(req.isAuthenticated()) {
    let newItem = req.body;


  const sqlText = `INSERT INTO "item" ("description", "image_url", "user_id")
      VALUES ($1, $2, $3);`;

  const queryParams = [
    newItem.description,
    newItem.image_url,
    req.user.id
  ];

  pool
    .query(sqlText, queryParams)
    .then(() => {
      res.status(201).send(); // Sending a 201 status code
    })
    .catch((error) => {
      console.log("ERROR in server POST route");
      console.error(error); // Changed from console.log to console.error for better error indication
    });
  }
  
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id/:itemId', (req, res) => {
  console.log('TROUBLE', req.params.id, req.user.id, req.params.itemId);
  if (req.isAuthenticated() && Number(req.params.id) === req.user.id) {
    // endpoint functionality
    const queryText = `DELETE FROM "item" WHERE "id" = $1`
    const queryParams = [req.params.itemId]
    pool
    .query(queryText,queryParams)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('delete item didnt work,', err);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403)
  }
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  let ItemId = req.params.id;
  let ItemDescription = req.body.description;
  const queryText = `
    UPDATE "item" SET "description" = $1 WHERE "id" = $2;
  `;
  const queryParams = [ItemDescription, ItemId];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error:", error);
    });
});
/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
    console.log('TROUBLE', req.params.id, req.user.id, req.params.itemId);
    if (req.isAuthenticated() && Number(req.params.id) === req.user.id) {
      // endpoint functionality
      const queryText = `SELECT FROM "item" WHERE "id" = $1`
      const queryParams = [req.params.itemId]
      pool
      .query(queryText,queryParams)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          console.log('delete item didnt work,', err);
          res.sendStatus(500)
        })
    } else {
      res.sendStatus(403)
    }
  });


module.exports = router;
