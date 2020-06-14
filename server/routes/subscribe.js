const express = require('express');
const router = express.Router();
const {User} = require("../models/User");

const { Subscriber } = require("../models/Subscriber");
const {Post} = require("../models/Post");

const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================


router.post("/subscribeNumber", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        res.status(200).json({ success: true, subscribeNumber: subscribe.length  })
    })

});



router.post("/subscribed", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom, "postId":req.body.postId })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(subscribe.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, subcribed: result  })
    })

});


router.post("/inornot", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom, "postId":req.body.postId })
    .exec((err, inornot) => {
        if(err) return res.status(400).send(err)
        
      //  let result = inornot.join;

        res.status(200).json({ success: true, inornot  })
    })

});

router.post("/getApply", (req, res) => {
    console.log("innnnn");

    Subscriber.find({ 'postId': req.body.postId , 'userTo': req.body.userTo})
    .exec((err, posts) => {
        if (err) return res.status(400).send(err);

        let subscribedUser = [];

        posts.map((subscriber, i) => {
            subscribedUser.push(subscriber.userFrom)
        })

        let postList = [];
        posts.map((subscriber, i) => {
            postList.push(subscriber.UserTo)
        })


        //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
        User.find({ _id: { $in: subscribedUser }, })
            
            .exec((err, posts) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, posts })
                

                // Post.find({ _id: { $in: postList }, })
                //     .populate('_id')
                //     .exec((err, posts) => {
                //         if (err) return res.status(400).send(err);
                //         res.status(200).json({ success: true, posts })
                //     })
            })
    })

});

router.post("/in", (req, res) => {
    console.log("innnnn");

    Subscriber.updateOne({ "userTo": req.body.userTo , "userFrom": req.body.userFrom, "postId":req.body.postId}
                            , { $set: { "join" : 1 } })
    .exec((err, inornot) => {
        if(err) return res.status(400).send({success: false, err})
        else{
            return res.status(200).json({ success: true,  inornot})
            
        }
        
        
    })

});

router.post("/out", (req, res) => {
    console.log("outt");

    Subscriber.updateOne({ "userTo": req.body.userTo , "userFrom": req.body.userFrom, "postId":req.body.postId}
                            , { $set: { "join" : 0 } })
    .exec((err, inornot) => {
        if(err) return res.status(400).send({success: false, err})
        else{
            return res.status(200).json({ success: true,  inornot})
            
        }
        
        
    })

});



router.post("/subscribe", (req, res) => {

    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/unSubscribe", (req, res) => {

    console.log(req.body)

    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom,postId:req.body.postId })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
});



module.exports = router;
