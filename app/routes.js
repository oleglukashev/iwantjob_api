'use strict';

const Router = require('koa-router');
const jobsController = require('./controllers/jobs');


const router = new Router();
router.get('/jobs', jobsController.getAll);
router.get('/spec', jobsController.getSwaggerSpec);

module.exports = router;
