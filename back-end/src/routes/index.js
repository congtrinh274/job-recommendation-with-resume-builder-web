const webhookRoutes = require('./webhook.routes');
const userRouter = require('./user.routes');
const recruiterRouter = require('./recruiter.routes');
const candidateRouter = require('./candidate.routes');

function route(app) {
    app.use('/', webhookRoutes);
    app.use('/users', userRouter);
    app.use('/recruiters', recruiterRouter);
    app.use('/candidates', candidateRouter);
}

module.exports = route;
