import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import { useSelector } from "react-redux";
import { urlencoded } from 'body-parser';
function DetailPostPage(props) {


    const postId = props.match.params.postId
    const [Post, setPost] = useState([])
    const [CommentLists, setCommentLists] = useState([])


    const user = useSelector(state => state.user)
    var loginOrNot =0;

    if(user.userData && user.userData.isAuth){
        loginOrNot=1
        //console.log("userdata="+user.userData+" "+user.userData.isAuth)
    } 

   

    const postVariable = {
        postId: postId
    }

    useEffect(() => {
        axios.post('http://localhost:5000/api/post/getPost', postVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.post)
                    setPost(response.data.post)
                } else {
                    alert('Failed to get video Info')
                }
            })

        axios.post('http://localhost:5000/api/comment/getComments', postVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })


    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    //   {backgroundImage:`http://localhost:5000/${Video.thumbnail}`}

    if (Post.writer) {

        var person = getPercent();

        function getPercent() {
            var peo = 100 / Post.people;
            if (Post.in) {
                peo = peo * Post.in
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }

        return (
            <Row>
                <div id="thumb_main" style={{ position: 'relative', width: '100%', height: '400px', textAlign: 'left', overflow: 'hidden' }}>
                    <img style={{ position: 'absolute', height: 'auto', width: "100%", resize: 'both', left: '50%', transform: 'translate(-50%,0)', filter: 'brightness(50%)' }} 
                                src={`http://localhost:5000/${Post.filePath}`} />
                                {/* localhost */}
                    <label id="proj_title">{Post.title}</label>
                </div>

                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em', minHeight: '150px' }}>
                        <h2>프로젝트 소개</h2>
                        <div dangerouslySetInnerHTML={ {__html: Post.description} }></div>
                        {/* <p>{Post.description}</p> */}
                        {/* <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video> */}

                    </div>
                    <div className="commentPage" style={{ width: '100%', padding: '3rem 2em' }}>
                        <Comments CommentLists={CommentLists} postId={Post._id} refreshFunction={updateComment} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <div className="postPage" style={{ width: '100%', height: '300px', padding: '3rem 0rem', textAlign: 'center', alignItems: 'center' }}>

                        <div style={{
                            position: 'absolute', height: '300px', width: '80%', left: '50%',
                            transform: 'translate(-50%,0)', border: '1px solid white', borderRadius: '20px 20px', marginBottom: "30px", background: 'orange'
                        }}>
                            <h2 style={{ marginTop: '30px' }}>제안자</h2>
                            <Avatar src={Post.writer && Post.writer.image} />
                            <span style={{ marginLeft: '10px' }}>{Post.writer.name}</span><br />
                            <br />
                            <div style={{ width: '100%', minHeight: '90px' }}>
                                <h4 style={{ color: 'black', fontStyle: 'bold' }}>자기소개</h4>
                                <p style={{ margin: '0px 40px' }}>{Post.writer.intro}</p>
                            </div>
                            <a href={`http://github.com/${Post.writer.git}`} ><p><strong>GitHub ID:</strong> {Post.writer.git}</p></a>
                            <p><strong>Skills:</strong> {Post.writer.skill}</p>
                        </div>
                    </div>

                    <div className="postPage" style={{ width: '100%', height: '300px', padding: '3rem 0rem', textAlign: 'center', alignItems: 'center' }}>
                        <h3 style={{ marginTop: '50px' }}>모집 상황 안내</h3>
                        <div style={{ marginTop: '10px', marginLeft: '23px', width: '50%', height: '10px', display: 'inline-block', border: '1px solid gray', borderRadius: '10px 10px' }}>
                            <div className='bar' name='bar' id="bar" style={{ float: 'left', width: `${person}`, height: '10px', display: 'inline', border: '1px solid gray', borderRadius: '10px 10px', background: 'red' }}></div>
                        </div>
                        <span> {Post.in ? Post.in : `0`}/{Post.people ? (Post.people + `명`) : `∞명`}</span><br /><br />
                        <List.Item id='like'
                            actions={[
                            <LikeDislikes post postId={postId} userId={localStorage.getItem('userId')} />, 
                            (loginOrNot 
                                ? (Post.writer._id == localStorage.getItem('userId') 
                                    ? <Subscriber userTo={Post.writer._id} userFrom={localStorage.getItem('userId')} postId={postId} /> 
                                    : <Subscriber userTo={Post.writer._id} userFrom={localStorage.getItem('userId')} postId={postId} />)
                                : <button>로그인해주세요</button>)]}
                        />


                    </div>
                    {/* <List.Item
                            actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}  />, <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                        />
                            <div></div>
                        </List.Item>
                    <SideVideo /> */}

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }


}

export default DetailPostPage

