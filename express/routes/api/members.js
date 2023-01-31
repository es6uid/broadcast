const express = require('express');
const router = express.Router();
const members = require('../../Members') // Data - Array of objects
const uuid = require('uuid')
const {getMember, postMember, updateMember, deleteMember} = require('../../controllers/membercontroller')

// View / GET route AND Create / POST route
router.route('/').get(getMember).post(postMember);

//Update / PUT route AND Delete route
router.route('/:id').put(updateMember).delete(deleteMember);

// View / GET route
// router.get('/', getMember)

// Create / POST route
// router.post('/', postMember)

//Update / PUT route
// router.put('/:id', updateMember)

// Delete route
// router.delete('/:id', deleteMember)


// Get All active members
// router.get('/', (req, res) =>{
//     res.json(members);
// })
  
// Get active members
// router.get('/active',(req, res) => {
//     const activefound = members.some(member => member.status === 'active');
//     if(activefound) {
//         res.json(members.filter(member => member.status === 'active'))
//     }else{
//         res.status(400).json({msg: 'No active members'})
//     }
// })

// Create member
// router.post('/', (req, res) => {
//     const newMember = {
//         ...req.body,
//         id: uuid.v4(),
//         // name: req.body.name,
//         // email: req.body.email,   
//         status: 'active'
//     }
//     if(!newMember.name || !newMember.email){
//         return res.status(400).json({msg: 'Please include name and email'})
//     }
//     members.push(newMember)
//     res.json(members)
// })

// Delete member
// router.delete('/:id', (req, res) => {
//     const found = members.some(member => parseInt(member.id) === parseInt(req.params.id));
//     // res.json({msg: `${req.params.id}, ${found}`})

//     if(found){
//         res.json({
//             msg: 'Member deleted',
//             members: members.filter(member => parseInt(member.id) !== parseInt(req.params.id))
//         })
//     }else{
//         res.status(400).json({msg: `No member with the id ${req.params.id}`})
//     }
// })

module.exports = router;