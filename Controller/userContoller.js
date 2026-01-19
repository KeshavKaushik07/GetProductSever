const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt")
//get user info
const getUserContolle = async (req, resp) => {
    console.log("user ID is : ", req.body.email);
    try {
        //find user
        const user = await userModel.findOne({email: req.body.email});
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: "User not Found"
            })
        }
        resp.status(200).send({
            success: true,
            message: "get user successfully",
            user
        })

    } catch (err) {
        console.log(err);
        resp.status(500).send({
            success: false,
            message: "Error in getting user info",
            err
        })

    }

}
module.exports = { getUserContolle };