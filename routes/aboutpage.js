const express = require('express');
const app = express();
const router = express.Router();


//About Routes
router.get('/', (req, res) => {
    res.render('about');
});

module.exports = router;