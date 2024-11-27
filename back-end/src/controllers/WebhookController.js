require('dotenv').config();

const { Webhook } = require('svix');

const User = require('../models/User');

class WebhookController {
    // [POST] api/webhooks
    handleWebhooks = async function (req, res) {
        try {
            const payloadString = req.body.toString();
            const svixHeaders = req.headers;

            const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
            const evt = wh.verify(payloadString, svixHeaders);
            const { id, ...attributes } = evt.data;

            // Handle the webhooks
            const eventType = evt.type;
            if (eventType === 'user.created') {
                console.log(`User ${id} was ${eventType}`);

                const username = attributes.last_name;

                const emailObject = attributes.email_addresses.find(
                    (email) => email.id === attributes.primary_email_address_id,
                );
                const email = emailObject ? emailObject.email_address : null;

                if (!email) {
                    throw new Error('No email found for user');
                }
                console.log(email);

                const existingUser = await User.findOne({ email: email });
                if (existingUser) {
                    console.log(`User with email ${email} already exists`);
                    return res.status(400).json({
                        success: false,
                        message: 'User already exists with this email',
                    });
                }

                const user = new User({
                    clerkUserId: id,
                    username: username || id,
                    email: email,
                    password: null,
                    role: 'candidate',
                });

                await user.save();
                console.log('User saved to database:', user);
            }

            res.status(200).json({
                success: true,
                message: 'Webhook received',
            });
        } catch (err) {
            console.error('Error stack:', err.stack);
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    };
}

module.exports = new WebhookController();
