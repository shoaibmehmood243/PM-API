const User = require("./../Models/user.model");
const { Signup } = require("./../Utilities/Validations");
const sendEmail = require("../Utilities/sendEmail");
const path = require("path");
const { signToken } = require("../Utilities/jwt-util");
const ejs = require("ejs");
const SetPasswordTemplate = path.join(__dirname, ".", "..", "Templates/SetPasswordTemplate.ejs");

const authController = {
    signUp : async (req, res, next)=> {
        try {
            const userObj = await Signup.validateAsync(req.body);
            const emailExists = await User.find({user_email: req.body.user_email});
            const numberExists = await User.find({number: req.body.number});
            if(emailExists.length > 0 || numberExists.length > 0) {
                res.status(200).send({error:{ status: 500, message: "Account with the provided information already exists." }});
            } else {
                const user = await User.create(userObj);
                const token = await signToken(userObj.user_email);
                const link = `${process.env.APP_URL}/set-password`;
                await ejs.renderFile(SetPasswordTemplate, { username: userObj.username, link: link, token: token }, async(err, emailData)=> {
                    if(err){
                        next(err);
                    } else {
                        await sendEmail(userObj.user_email, "Please Verify Your Account", emailData, (err, success)=> {
                            if(err){
                                next(err);
                            } else {
                                res.status(200).send({message: "Account Created successfully. Email Sent to your email. Please Verify."});
                            }
                        })
                    }
                })
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authController;