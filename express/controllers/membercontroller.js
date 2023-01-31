const Member = require('../models/memberModel')
const asyncHandler = require('express-async-handler')
// @desc    Get All Members
// @route   GET api/members
// @access  Private
const getMember = asyncHandler(async (req, res) => {
    const member = await Member.find()
    // res.status(200).json(member)
    const broadCastVideo = member.filter(data => data.status === false)
    console.log(broadCastVideo)

    broadCastVideo.length ? res.status(200).json([{broadCastVideo: false}, member]) : res.status(200).json([{broadCastVideo: true}, member])
    // res.status(200).json({msg: "Get route"})
})

// @desc    Post a Members
// @route   POST api/members
// @access  Private
const postMember = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field');
    }
    const member = await Member.create({
        text: req.body.text,
        status: req.body.status,
        email: req.body.email
    })
    res.status(201).json(member)
    // res.status(201).json({msg: "Create route"})
})

// @desc    Update a Members
// @route   PUT api/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id)
    if(!member){
        res.status(400)
        throw new Error('Member not found')
    }
    const updatedmember = await Member.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedmember)
    // res.status(200).json({msg: `Update route ${req.params.id}`})
})

// @desc    Delete a Members
// @route   DELETE api/members/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id)
    if(!member){
        res.status(400)
        throw new Error('Member not found')
    }
    await Member.remove()
    res.status(200).json(req.params.id)
    // res.status(200).json({msg: `Delete route ${req.params.id}`})
})
module.exports = {
    getMember,
    postMember,
    updateMember,
    deleteMember
}