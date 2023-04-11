const User = require ('../models/User')
const bcrypt = require ('bcryptjs');

const userController = {
    register: async function (req, res){
        
        const selectedUser = await User.findOne({email:req.body.email})
        if(selectedUser) return res.status(400).send('Email already exists')
        
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)   
        })

        try {
            const savedUser = await user.save()
            res.send(savedUser)
        }catch (error){
            res.status(400).send(error)
        }
    },
    login:async function (req, res){
        const selectedUser = await User.findOne({email:req.body.email})
        if(!selectedUser) return res.status(400).send('Email or Password incorrent')
    
        const passawordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passawordAndUserMatch) return res.status(400).send('Email or Password incorrent')
    
        res.send("User logged")
    }
    
}

module.exports = userController