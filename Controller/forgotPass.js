const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");

const forgotPass = async (req,resp) => {
    try {
    const {email , answer , password} = req.body;
    if(!email || !answer || !password)
    {
        return resp.status(500).send({
                success: false,
                message: "Enter email and password"
            });
    }
    const user = await userModel.findOne({email});
    if(!user)
    {
        return resp.status(500).send({
                success: false,
                message: "user not found"
            });
    }
    if(answer != user.answer)
    {
         return resp.status(500).send({
                success: false,
                message: "Wrong Answer"
            });
    }

    var salt = bcrypt.genSaltSync(10);
            const hashpassword = await bcrypt.hash(password, salt);

            await userModel.updateOne({ email },{ password : hashpassword});

        resp.status(201).send({
            success: true,
            message: "password updated successfully"
        }) 
}
catch(err)
{
    resp.status(500).send({
        success: false,
                message: "Somthing wrong in fogot Api",
                err
    })
}
}

module.exports = forgotPass;