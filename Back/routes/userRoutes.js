const router = require('express').Router();
const User = require("../models/user");


router.post("/cadastro", async(req,res) =>{
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (username == null || email == null || password == null) {
            return res.status(400).json({error: "preencha tudo"})
        }

        const user = new User({
            username: username,
            email: email,
            password: password,
        })

        const newUser = await user.save();

        return res.status(200).json(newUser);

    } catch (e) {
        return res.status(400).json({error: "Não foi possivel" + e})
    }
});


//ISSO AQUI EMBAIXO N FUNCIONA

router.post("/login", async(req,res) =>{
    try {

        console.log(req.body)
        let email = req.body.email;
        let password = req.body.password;

        if (email == null || password == null) {
            console.log('ERRO AQUI')
            return res.status(400).json({error: "preencha tudo"})
        }else{

           const usuario = await User.findOne({
                email: email,
                password: password
            }, function(err, result){
                if(err){
                    console.log('ERRRO')
                    return res.send(err)
                }
                
                if(result!=null){
                    return res.json({
                        message: 'user logado'
                    })
                }else{
                    return res.json({
                        message: 'erro no login'
                    })
                }
                
            })
        }

    } catch (e) {
        return res.status(400).json({error: "Não foi possivel" + e})
    }
});

module.exports = router;