const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const { underline } = require("colors");
const JWT = require("jsonwebtoken");

const registerController = async (req, resp) => {

    try {
        const { userName, email, password, phone, address, answer } = req.body;

        //validation    
        if (!userName || !email || !password || !phone || !address || !answer) {
            return resp.status(500).send({
                success: false,
                message: "all fields are required"
            });
        }

        //check if user exist or not
        const exist = await userModel.findOne({ email })

        if (exist) {
            return resp.status(500).send({
                success: false,
                message: "Email already Exist"
            });
        }

        //Hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({ userName, email, password:hashpassword, phone, address, answer });
        user.password = undefined;
        resp.status(201).send({
            success: true,
            message: "successfully Registered",
            user
        });
    } catch (err) {
        console.log("some error ", err);
        resp.status(500).send({
            success: false,
            message: "Error in Register API",
            err
        });
    }
}

const loginController = async (req, resp) => {

    try {
        const { email, password } = req.body;

        // check if fields are empty or not
        if (!email || !password) {
            return resp.status(500).send({
                success: false,
                message: "Enter email and password"
            });
        }

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: "user not found"
            });
        }

        // check password
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            return resp.status(500).send({
                success : false,
                message : "Invalid password"
            })
        }
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        user.password = undefined;
        resp.status(200).send({
            success: true,
            message: "login successfuly",
            token,
            user
        })
    } catch (err) {
        console.log("some error ", err);
        resp.status(500).send({
            success: false,
            message: "Error in Login API",
            err
        });
    }
}


module.exports = { registerController, loginController }