const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const recruiterRouter = require('./recruiter.routes');
const candidateRouter = require('./candidate.routes');
const cvRouter = require('./cv.routes');
const jobRouter = require('./job.routes');
const categoryJobRouter = require('./categoryJob.routes');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/recruiters', recruiterRouter);
    app.use('/api/candidates', candidateRouter);
    app.use('/api/cvs', cvRouter);
    app.use('/api/jobs', jobRouter);
    app.use('/api/job-categories', categoryJobRouter);
}

module.exports = route;
