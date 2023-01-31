const ObjectId = require('mongodb').ObjectID;

const Media = require('../models/mediaModel')
const asyncHandler = require('express-async-handler')
// @desc    Get All Media
// @route   GET api/media
// @access  Private
const getMedia = asyncHandler(async (req, res) => {
    const media = await Media.find()
    res.status(200).json(media)
    // const broadCastVideo = member.filter(data => data.status === false)
    // console.log(broadCastVideo)

    // broadCastVideo.length ? res.status(200).json([{broadCastVideo: false}, member]) : res.status(200).json([{broadCastVideo: true}, member])
    // res.status(200).json({msg: "Get route"})
})

// @desc    Post a Media
// @route   POST api/media
// @access  Private
// const postMedia = asyncHandler(async (req, res) => {
//     if(!req.body.text){
//         res.status(400)
//         throw new Error('Please add a text media Iframe');
//     }
//     const media = await Media.create({
//         text: req.body.text
//     })
//     res.status(201).json(media)
// })

const createMedia = async (req, res) => {
    if(!req.body.text){
        console.log('create called')
        res.status(400)
        throw new Error('Please add a text media Iframe');
    }
    const media = await Media.create({
        text: req.body.text
    })
    res.status(201).json(media)
}

const updateMedia = async (req, res) => {

    const media = await Media.findById(req.params.id)
    if(!media){
        console.log('update called')
        res.status(400)
        throw new Error('Media not found')
    }
    const updatedmedia = await Media.findByIdAndUpdate(req.params.id, req.body, {new:true})
    // const updatedmedia = await Media.findByIdAndUpdate(
    //     {_id: ObjectId(req.params.id)}, 
    //     {$set: req.body}, 
    //     {upsert:true}
    //     )
    res.status(200).json(updatedmedia)
    // res.status(200).json({msg: `Update route ${req.params.id}`})
}


const upsertMedia = asyncHandler(async (req, res) => {
    console.log('anshul', req.params.id)
    // req.params.id ? await updateMedia(req, res) : await createMedia(req, res)
    req.params.id ? console.log('pass') : console.log('fail')
})

// @desc    Delete a Media
// @route   DELETE api/media/:id
// @access  Private
const deleteMedia = asyncHandler(async (req, res) => {
    const media = await Media.findById(req.params.id)
    if(!media){
        res.status(400)
        throw new Error('Media not found')
    }
    await Media.remove()
    res.status(200).json(req.params.id)
    // res.status(200).json({msg: `Delete route ${req.params.id}`})
})
module.exports = {
    getMedia,
    upsertMedia,
    deleteMedia 
}