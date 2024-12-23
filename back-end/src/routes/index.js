const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const recruiterRouter = require('./recruiter.routes');
const candidateRouter = require('./candidate.routes');
const jobRouter = require('./job.routes');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/recruiters', recruiterRouter);
    app.use('/api/candidates', candidateRouter);
    app.use('/api/jobs', jobRouter);
}

module.exports = route;
