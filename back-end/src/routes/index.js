const userRouter = require('./user.routes');
const recruiterRouter = require('./recruiter.routes');
const candidateRouter = require('./candidate.routes');
const cvRouter = require('./cv.routes');

function route(app) {
    app.use('/api/users', userRouter);
    app.use('/api/recruiters', recruiterRouter);
    app.use('/api/candidates', candidateRouter);
    app.use('/api/cvs', cvRouter);
}

module.exports = route;
