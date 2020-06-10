import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function AppliedProjectPage() {
  
    const [Post, setPost] = useState([])

    let variable = { userFrom : localStorage.getItem('userId')  }

    useEffect(() => {
        axios.post('http://localhost:5000/api/post/getAppliedPost', variable)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.posts)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }, [])

   
    const renderCards = Post.map((post, index) => {



        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/post/${post._id._id}`} >
                <img style={{ width: '100%' }} alt="image" src={`http://localhost:5000/${post.filePath}`} />
                
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={post.writer.image} />
                }
                title={post.title}
            />
            <span>{post.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {post.views}</span>
            - <span> {moment(post.createdAt).format("MMM Do YY")} </span>
        </Col>

    })
  
  
  
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2} > 지원한 프로젝트 </Title>
        <hr />

        <Row gutter={16}>
            {renderCards}
        </Row>
    </div>
    )
}

export default AppliedProjectPage
