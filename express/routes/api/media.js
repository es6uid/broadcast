const express = require('express');
const router = express.Router();
// const members = require('../../Media') // Data - Array of objects
// const uuid = require('uuid')
const {getMedia, upsertMedia, deleteMedia} = require('../../controllers/mediaController')

// View / GET route AND Create / POST route
router.route('/').get(getMedia).post(upsertMedia);

//Update / PUT route AND Delete route
// router.route('/:id').put(updateMedia);
router.route('/:id').put(upsertMedia).delete(deleteMedia);


// app.get('/api/media', (req, res) => {
//   res.json('iframe')
// })

module.exports = router;