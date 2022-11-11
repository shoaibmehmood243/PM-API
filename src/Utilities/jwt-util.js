const JWT = require("jsonwebtoken");

const signToken = async(data)=> {
    return new Promise((resolve, reject)=> {
        const payload = {

        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "2d",
            issuer: "portfolio-master.com",
            audience: data
        }

        JWT.sign(payload, secret, options, (err, token)=> {
            if(err){
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    signToken
}