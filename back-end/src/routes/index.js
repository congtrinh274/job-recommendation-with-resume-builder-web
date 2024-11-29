const userRouter = require('./user.routes');
const recruiterRouter = require('./recruiter.routes');
const candidateRouter = require('./candidate.routes');

function route(app) {
    app.use('/api/users', userRouter);
    app.use('/api/recruiters', recruiterRouter);
    app.use('/api/candidates', candidateRouter);
}

module.exports = route;
