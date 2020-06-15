import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { List } from 'antd';
import InOrNot from './Sections/InOrNot.js';
import FinApply from './Sections/FinApply.js'
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function CheckApply(props) {

    const [Post, setPost] = useState([])

    const postId = props.match.params.postId;
    //console.log(Post);
    let variable = { postId: postId, userTo: localStorage.getItem('userId')}
    useEffect(() => {
        axios.post(/*localhost123*/'/api/subscribe/getApply', variable)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.posts)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }, [])


    const renderCards = Post.map((post, index) => {

        return <Col lg={8} md={12} xs={24}>
            <div className="postPage" style={{ width: '100%', height: '300px', padding: '3rem 0rem', textAlign: 'center', alignItems: 'center', marginBottom:'100px'}}>

                <div style={{
                    position: 'absolute', height: '300px', width: '80%', left: '50%',
                    transform: 'translate(-50%,0)', border: '1px solid #9A9A9A', borderRadius: '20px 20px', marginBottom: "30px", background: 'white'
                }}>
                    <h2 style={{ marginTop: '30px' }}>지원자</h2>
                    <Avatar src={post.writer && post.image} />
                    <span style={{ marginLeft: '10px' }}>{post.name}</span><br />
                    <br />
                    <div style={{ width: '100%', minHeight: '90px' }}>
                        <h4 style={{ color: 'black', fontStyle: 'bold' }}>자기소개</h4>
                        <p style={{ margin: '0px 40px' }}>{post.intro}</p>
                    </div>
                    <a href={`http://github.com/${post.git}`} ><p><strong>GitHub ID:</strong> {post.git}</p></a>
                    <p><strong>Skills:</strong> {post.skill}</p>
                    {console.log(post._id)}
                    <List.Item id='like' style={{ justifyContent: 'center' }}
                        actions={[
                            <InOrNot userTo={localStorage.getItem('userId')} userFrom={post._id} postId={postId} fin={post.fin}/>]} />

                </div>
            </div>
        </Col>


    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 프로젝트 지원자 목록 </Title> 
            <List.Item id='like' style={{ justifyContent: 'center', float:'right' }}
                        actions={[<FinApply postId={postId} />]} />
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default CheckApply
