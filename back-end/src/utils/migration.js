require('dotenv').config();
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// 1. Schema User
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['candidate', 'recruiter', 'admin'], required: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const User = mongoose.model('User', userSchema);

// 2. Schema Candidate
const candidateSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        skills: [{ type: String }],
        experience: { type: String },
        education: { type: String },
        uploadedCV: { type: String },
        generatedCV: { type: String },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Candidate = mongoose.model('Candidate', candidateSchema);

// 3. Schema Recruiter
const recruiterSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        companyName: { type: String, required: true },
        companyAddress: { type: String },
        companyWebsite: { type: String },
        postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Recruiter = mongoose.model('Recruiter', recruiterSchema);

// 4. Schema Job
const jobSchema = new mongoose.Schema(
    {
        recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
        title: { type: String, required: true },
        description: { type: String },
        requirements: [{ type: String }],
        skills: [{ type: String }],
        location: { type: String },
        salary: { type: String },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Job = mongoose.model('Job', jobSchema);

// Tạo dữ liệu mẫu
const createSampleData = async () => {
    try {
        // Tạo người dùng admin
        const admin = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: 'hashed_password', // Mật khẩu đã mã hóa
            role: 'admin',
        });
        await admin.save();
        console.log('Admin user created');

        // Tạo ứng viên
        const candidate = new Candidate({
            userId: admin._id,
            fullName: 'John Doe',
            phone: '123-456-789',
            skills: ['JavaScript', 'Node.js', 'MongoDB'],
            experience: '2 years experience as software developer',
            education: 'Bachelor of Computer Science',
            uploadedCV: '/path/to/cv.pdf',
            generatedCV: '/path/to/generated/cv.pdf',
        });
        await candidate.save();
        console.log('Candidate created');

        // Tạo nhà tuyển dụng
        const recruiter = new Recruiter({
            userId: admin._id,
            companyName: 'Tech Corp',
            companyAddress: '123 Tech Street',
            companyWebsite: 'https://techcorp.com',
            postedJobs: [],
        });
        await recruiter.save();
        console.log('Recruiter created');

        // Tạo công việc
        const job = new Job({
            recruiterId: recruiter._id,
            title: 'Full Stack Developer',
            description: 'Developing full-stack applications',
            requirements: ['JavaScript', 'React', 'Node.js'],
            skills: ['JavaScript', 'Node.js', 'MongoDB'],
            location: 'Hanoi, Vietnam',
            salary: '$5000/month',
        });
        await job.save();
        console.log('Job created');
    } catch (error) {
        console.error('Error creating sample data:', error);
    } finally {
        mongoose.disconnect();
    }
};

createSampleData();
