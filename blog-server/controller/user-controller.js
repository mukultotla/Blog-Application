const User = require('../model/user')
const Token = require('../model/token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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
        return res.status(500).json({msg: `Error while user signup: ${error}`})
    }
}

const loginUser = async(req, res) => {
    try{
        console.log('inside login user controller')
        const {username, password} = req.body
        let user = await User.findOne({username})
        console.log('user -> ', user)
        if(!user){
            return res.status(400).json({msg: 'Username does not match'})
        }
        let match = await bcrypt.compare(password, user.password)
        if(match){
            const accessToken = jwt.sign({user}, process.env.JWT_ACCESS_SECRET, {
                expiresIn: '15m'
            })
            const refreshToken = jwt.sign({user}, process.env.JWT_REFRESH_SECRET)
            const newToken = new Token({token: refreshToken})
            await newToken.save() 
            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username})   
        }
        else{
            return res.status(400).json({msg: 'Password does not match'})
        }
    } catch(error) {
        return res.status(500).json({msg: `Error while login : ${error}`})
    }
}

module.exports = {signupUser, loginUser}