const User = require('../model/user')
const bcrypt = require('bcrypt')
const signupUser = async (req, res) => {
    try{
        // encrypting password before saving
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // new syntax, do not need prior salt generation 
        const user = {
            username: req.body.username, 
            name: req.body.name, 
            password: hashedPassword 
        }
        const newUser = new User(user);
        await newUser.save()
        return res.status(200).json({msg: 'Signup successful'})
    } catch(error){
        return res.status(500).json({msg: 'Error while user signup'})
    }
}

module.exports = {signupUser}