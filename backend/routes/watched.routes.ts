const Router = require('express');
const watchController = require('../controller/watch.controller');

const router = new Router();

router.get('/watched', watchController.getWatched);

module.exports = router;
