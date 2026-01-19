const JWT = require("jsonwebtoken");

module.exports = async (req,resp,next) => {
    try{
        //get token
        console.log("header key is : ",req?.headers["authorization"]);
        const token = req.headers["authorization"].split(" ")[1];
        console.log("token is : ",token);
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err)
            {
                return resp.status(401).send({
                    success : false,
                    message : "un-authorized user"
                })
            }else{
                console.log("decode is : ",decode);
                req.body.id = decode.id;
                console.log("Id at MiddleWare",req.body.id);
                next();
            }
        })
    }catch(err){
        console.log(err);
        resp.status(500).send({
            success : false,
            message : "please provide token",
            err
        })
        
    }
}