const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");

const { auth } = require("../middleware/auth");

//=================================
//             Image
//=================================

router.post('/uploadPost', (req, res) => {

    //이미지 정보 저장
    const post = new Post(req.body)

    post.save((err, doc) => {
        if (err) return res.json({success: false, err})
        res.status(200).json({ success: true })
    })

})

module.exports = router;