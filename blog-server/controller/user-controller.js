const User = require('../model/user')
const signupUser = async (req, res) => {
    try{
        const user = req.body;
        const newUser = new User(user);
        await newUser.save()
        return res.status(200).json({msg: 'Signup successful'})
    } catch(error){
        return res.status(500).json({msg: 'Error while user signup'})
    }
}

module.exports = {signupUser}