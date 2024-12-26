require('dotenv').config();

const Recruiter = require('../models/Recruiter');
const User = require('../models/User');
const { sendMail } = require('../utils/nodemailer');

class RecruiterController {
    // [GET] recruiters/
    getRecruiters = async (req, res) => {
        try {
            const recruiters = await Recruiter.find();
            res.status(200).json(recruiters);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [GET] recruiter/
    getRecruiter = async (req, res) => {
        try {
            const recruiter = await Recruiter.findOne({ userId: req.user?._id }).populate('postedJobs');
            if (!recruiter) {
                return res.status(200).json({
                    err: 1,
                    msg: 'recruiter not found',
                });
            }

            return res.status(200).json({
                recruiter,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                err: 2,
                msg: 'Internal server error',
            });
        }
    };

    // [POST] recruiter/send-verification-code
    sendVerificationCode = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { email } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (user.role === 'RECRUITER') {
                return res.status(400).json({ message: 'User is already a recruiter.' });
            }

            const existingRecruiter = await Recruiter.findOne({ userId });
            if (existingRecruiter) {
                const currentTime = Date.now();
                if (existingRecruiter.validateEmail === false && existingRecruiter.verificationExpires > currentTime) {
                    return res.status(400).json({
                        message:
                            'Mã xác minh đã gửi còn hiệu lực. Kiểm tra email hoặc gửi lại yêu cầu sau khi mã hết hiệu lực!.',
                    });
                }

                if (existingRecruiter.verificationExpires < currentTime) {
                    return;
                }
            }

            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            const verificationExpires = Date.now() + 3600000;

            const newRecruiter = new Recruiter({
                userId,
                email,
                validateEmail: false,
                verificationCode,
                verificationExpires,
            });

            await newRecruiter.save();

            const subject = 'Đăng ký trở thành Nhà Tuyển Dụng tại SMART CV';
            const text = `Vui lòng nhập mã xác minh của bạn: ${verificationCode}. Mã này sẽ hết hạn sau 1 giờ.`;
            await sendMail(email, subject, text);

            return res.status(201).json({ message: 'Sent code successfully', expires: verificationExpires });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };

    // [POST] recruiter/verified-code
    verifiedMail = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { code } = req.body;

            const recruiter = await Recruiter.findOne({ userId: userId });

            if (!recruiter) {
                return res.status(400).send('Email không tồn tại');
            }

            if (recruiter.verificationCode !== code) {
                return res.status(400).send('Mã xác minh không chính xác');
            }

            if (recruiter.verificationExpires < Date.now()) {
                return res.status(400).send('Mã xác minh đã hết hạn');
            }

            recruiter.validateEmail = true;
            recruiter.verificationCode = undefined;
            recruiter.verificationExpires = undefined;

            const updatedUser = await User.findByIdAndUpdate(userId, { role: 'RECRUITER' }, { new: true });

            await recruiter.save();

            return res.status(201).json({ message: 'Xác minh email thành công!', data: recruiter });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };

    // [POST] recruiters/update
    updateRecruiter = async (req, res) => {
        try {
            const userId = req.user?._id;
            const updateData = req.body;

            const recruiter = await Recruiter.findOne({ userId: userId });
            if (!recruiter) {
                return res.status(400).json({ message: 'Recruiter is not exist.' });
            }

            const allowedFields = [
                'fullName',
                'email',
                'validateEmail',
                'verificationCode',
                'verificationExpires',
                'taxCode',
                'companyName',
                'businessLicense',
                'province',
                'district',
                'companyAddress',
                'webLink',
                'postedJobs',
            ];
            const filteredUpdateData = Object.keys(updateData)
                .filter((key) => allowedFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updateData[key];
                    return obj;
                }, {});

            if (Object.keys(filteredUpdateData).length === 0) {
                return res.status(400).json({ message: 'No valid fields provided for update.' });
            }

            const updatedRecruiter = await Recruiter.findOneAndUpdate(
                { userId: userId },
                { $set: filteredUpdateData },
                { new: true, runValidators: true },
            );

            if (!updatedRecruiter) {
                return res.status(404).json({ message: 'Recruiter not found.' });
            }

            return res.status(200).json({ message: 'Recruiter updated successfully.', recruiter: updatedRecruiter });
        } catch (error) {
            console.error('Error updating recruiter:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
}

module.exports = new RecruiterController();
