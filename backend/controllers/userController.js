import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import { generateToken } from '../utils/generateTokens.js'

export const signupUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body
  const exists = await User.findOne({ email })
 
  if (exists === null) {
    const user = await User.create({
      email,
      password,
      name
    })
    console.log(password)
    if (user) {
        const User = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        }
      return res.status(201).json({
        message: 'Signup is successful',
        User
      })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
  } else {
    res.status(400).json({
      Error: 'User already exists',
    })
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  
  if (user && await user.comparePasswords(password)) {
    const User = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    } 
    res.status(200).json({
      message: 'Login is successful',
      User
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or passowrd')
  }
})

export const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json({
    users,
  })
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
        user.password = req.body.password
    }
    const updatedUser = user.save()
    return res.json({
        message: "Profile updated",
        user,
        token: generateToken(updatedUser._id)
    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})


export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json({
    users,
  })
})

export const deleteUser = asyncHandler(async(req, res)=>{
  const user = User.findById(req.params.id)
  if(user){
    await user.remove()
    return res.json({message: 'User Removed'})
  }else{
    res.status(404)
    throw new Error('User not found')
  }
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if(user){
    res.json({
      user
    })
  }else{
    res.status(404)
    throw new Error('User not found')
  }
})

export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updatedUser = await user.save()
    return res.json({
        message: "User updated",
        user
    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})

