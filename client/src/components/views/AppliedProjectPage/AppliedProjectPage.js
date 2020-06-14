import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function AppliedProjectPage() {

    const [Post, setPost] = useState([])

    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        axios.post('http://localhost:5000/api/post/getAppliedPost', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.subscribers)
                    setPost(response.data.subscribers)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }, [])




    const renderCards = Post.map((post, index) => {
        var finOrNot = post.fin;
       
        //console.log(Post);
        function getPercent() {
            var peo = 100 / Post.people;
            if (Post.joinPeople) {
                peo = peo * Post.joinPeople
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }
        var person = getPercent();

        return <Col lg={6} md={8} xs={24} style={{marginBottom:'50px'}}>
            <a href={`/post/${post._id._id}`}  >
                <div style={{ position: 'relative', margin: '0px 10px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>

                    {finOrNot
                        ? <div style={{ width: '100%', height: '150px', background: 'darkgray' }}><img style={{ width: '100%', filter: 'brightness(30%)' }} alt="thumbnail" src={`http://localhost:5000/${post.filePath}`} />
                            <p style={{ position: 'absolute', top: "50%", left: '50%', transform: 'translate(-50%,-50%)', fontSize: '22px', color: 'white', textAlign: 'center', fontWeight: '600' }}>마감된<br />프로젝트</p>
                        </div>
                        : <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${post.filePath}`} />}


                 </div><br />
                <Meta
                    avatar={
                        <Avatar src={post.writer.image} />
                    }
                    title={post.title}
                />
                <span>{post.writer.name} </span><br />

                <span style={{ marginLeft: '3rem' }}> {post.views} views</span>
            - <span> {moment(post.createdAt).format("MMM Do YY")} </span><br />

                <div style={{ marginTop: '10px', marginLeft: '23px', width: '65%', height: '10px', display: 'inline-block', border: '1px solid gray', borderRadius: '10px 10px', overflow: 'hidden' }}>
                    <div className='bar' name='bar' id="bar" style={{ float: 'left', width: `${person}`, height: '10px', display: 'inline', border: '1px solid gray', borderRadius: '10px 10px', background: 'red' }}></div>
                </div> 
                <span> {post.joinPeople ? post.joinPeople : `0`}/{post.people ? (post.people + `명`) : `∞명`}</span>
                <br />
                
            </a>
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
