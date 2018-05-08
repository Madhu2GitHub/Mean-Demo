const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const Contact = require('../models/contact');

//create contact
router.post('/contact',bodyParser.json(),(req, res)=>{
    console.log('body: ', req.body)
    console.log('query: ', req.query)
   let newContact = new Contact({
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       phone_number : req.body.phone_number
   });

   newContact.save(function(err,contact){
    if(err)
    {
        res.json({masg:"Failed to add contact:"+err});
    }
    else
    {
        res.json(contact);
    }
   });
});

//read contacts
router.get('/contacts',(req, res, next)=>{
    Contact.find(function(err,contacts){
        res.json(contacts);
    });
});

// //update contact
// router.put('/contacts/:id',(req, res, next)=>{
//     Contact.delete(function(err,contacts){
//         res.json(contacts);
//     });
// });

//delete contact
router.delete('/contact/:id',(req, res, next)=>{

    Contact.remove({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json({masg:"Failed to delete contact:"+err});
        }
        else
        {
            res.json(result);
        }
    });
});

module.exports = router;