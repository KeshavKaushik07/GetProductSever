const testUserControler = (req,resp) =>{
    try{
        resp.status(200).send();
    }catch(err){
        console.log(`somthing went wrong ${err}`);
    }
}

module.exports = testUserControler;           