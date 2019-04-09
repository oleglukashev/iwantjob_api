'use strict';

const pkginfo = require('../../package.json');
const spec = require('../spec');


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Get API information.
 *     operationId: getApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
exports.getAll = ctx => {
  return ctx.app.pool.query(`SELECT * FROM jobs`)
    .then((res) => {
      return ctx.res.ok({
        data: res.rows
      });
    })
    .catch(err => console.error('Error executing query', err.stack))

  //return ctx.app.pool.query('SELECT * FROM jobs');
};

/**
 * @swagger
 * /spec:
 *   get:
 *     tags:
 *       - Public
 *     summary: Get Open API specification.
 *     operationId: getSwaggerSpec
 *     responses:
 *       200:
 *         description: Describe Swagger Open API Specification
 */
exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};
