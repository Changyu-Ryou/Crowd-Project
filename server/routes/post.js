const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");
const { Subscriber } = require("../models/Subscriber");
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
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })

});


router.post("/getAppliedPost", (req, res) => {


    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    //Need to find all of the Users that I am subscribing to From Subscriber Collection 

    Subscriber.find({ 'userFrom': req.body.userFrom })
        .exec((err, subscribers) => {
            if (err) return res.status(400).send(err);

            let subscribedUser = [];

            subscribers.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo)
            })

            let postList = [];
            subscribers.map((subscriber, i) => {
                postList.push(subscriber.postId)
            })


            //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
            Post.find({ writer: { $in: subscribedUser }, })
                .populate('writer')
                .exec((err, posts) => {

                    Post.find({ _id: { $in: postList }, })
                        .populate('_id')
                        .exec((err, posts) => {
                            if (err) return res.status(400).send(err);
                            res.status(200).json({ success: true, posts })
                        })
                })
        })
});

router.get("/getPosts", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    Post.find()
        .populate('writer')
        .sort({ 'createdAt': -1 })
        .exec((err, posts) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, posts })
        })

});

router.post("/categotyGetPost", (req, res) => {             //메인 화면 모든 포스트 보내기
    res.header("Access-Control-Allow-Origin", "*");
    Post.find({ "category": req.body.category })
        .populate('writer')
        .sort({ 'createdAt': -1 })
        .exec((err, posts) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, posts })
        })

});


router.post("/getPost", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    Post.findOne({ "_id": req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
});


module.exports = router;