const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const { auth } = require("../middleware/auth");

//=================================
//             Image
//=================================

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        console.log('잘옴')
         if (ext !== '.png') {
             console.log('file 형식 에러')
            return cb(res.status(400).end('only jpg, png is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadfiles", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log('uploadfiles 옴')
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});



router.post('/uploadPost', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    //이미지 정보 저장
    const post = new Post(req.body)

    post.save((err, doc) => {
        if (err) return res.json({success: false, err})
        res.status(200).json({ success: true })
    })

})


router.get("/getPosts", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    Post.find()
        .populate('writer')
        .sort({'createdAt':-1})
        .exec((err, posts) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, posts })
        })

});

module.exports = router;