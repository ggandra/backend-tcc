const { Router } = require('express')
const router =  new Router();

router.get('/checker', (req, res) => {
    return res.send('Sever Working Fine')
});

module.exports = router;