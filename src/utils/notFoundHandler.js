const notFoundRouter = require('express').Router();

notFoundRouter.get('*', (req, res) => {
    res.status(404).send({status: 'failed', msg: '404 not found (server)' });
});

module.exports = notFoundRouter;