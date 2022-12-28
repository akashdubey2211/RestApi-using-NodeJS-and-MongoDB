const express = require("express");
const User = require("../models/users");
const router =  express.Router();

//status and it's reference
// 400- failure
// 500-not found
// 200- success
// 201- successfully created

//  getting all user data
router.get('/',async (req, res) =>{
try {
    const user = await User.find();
    res.json(user)
} catch (error) {
    res.status(500).json({message:error.message})
}
})
//  getting one data
router.get('/:id',getUser,(req, res) =>{
    res.json(res.user)
})
//  creating users
router.post('/',async(req, res) =>{
    const user = new User({
        name:req.body.name,
        joined: req.body.joined
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})
//  updating
router.patch('/:id',getUser,async(req, res) =>{
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})
//  deleting
router.delete('/:id',getUser,async(req, res) =>{
    try {
        await res.user.remove()
        res.json({message:"deleted user successfully!"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//creating middleware that will be used in all route which accepts id
async function getUser(req,res, next){
    let user;
    try {
        user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({message:" not found"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    res.user = user
    next()
}

module.exports = router