import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

// USER REGISTER
export const register = async (req, res, next) => {
   try{
       const {username, email, password} = req.body

       const usernameCheck = await User.findOne({username})
       if (usernameCheck)
           return res.json({
               msg: 'Username already used',
               status: false
           })
       const emailCheck = await User.findOne({email})
       if (emailCheck)
           return res.json({
               msg: 'Email already used',
               status: false
           })
       const hashedPassword = await bcrypt.hash(password, 10)
       const user = await User.create({
           username,
           email,
           password:hashedPassword
       })
       delete user.password;
       return  res.json({
           user,
           status: true
       })
   }catch (e) {
       next(e)
   }
}