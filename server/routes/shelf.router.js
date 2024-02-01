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
  let newItem = req.body;

  const sqlText = `INSERT INTO "item" ("description", "image_url", "user_id")
      VALUES ($1, $2, $3);`;

  const queryParams = [
    newItem.description,
    newItem.image_url,
    newItem.user_id
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
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
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
  // endpoint functionality
});

module.exports = router;
