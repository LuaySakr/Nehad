const express = require('express');
const app = express();
const router = express.Router();

//Index Routes
router.get('/', (req, res) => {
    const title = "Welcome";
    res.render('index', {
        title: title
    });
});


module.exports = router;