import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingMFCPage() {

    const [Posts, setPosts] = useState([])

    const CategoryVariable = {
        category: 3
    }

    useEffect(() => {
        axios.post('http://localhost:5000/api/post/categotyGetPost',CategoryVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.posts)
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to get Posts')
                }
            })
    }, [])


    const renderCards = Posts.map((posts, index) => {

        // var minutes = Math.floor(post.duration / 60);
        // var seconds = Math.floor(post.duration - minutes * 60);
        var person = getPercent();

        function getPercent() {
            var peo = 100 / posts.people;
            if (posts.in) {
                peo = peo * posts.in
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }
        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '30px' }}>
            <div style={{ position: 'relative', margin: '0px 15px', height: '150px', overflow:'hidden', border:'1px solid rgba(0,0,0,.2)', borderRadius:'10px 10px'}}>
                <a href={`/post/${posts._id}`} >
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${posts.filePath}`} />
                    
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={posts.writer.image} />
                }
                title={posts.title}
            />
            <span>{posts.writer.name} </span><br />

            <span style={{ marginLeft: '3rem' }}> {posts.views} views</span>
            - <span> {moment(posts.createdAt).format("MMM Do YY")} </span><br />

            <div style={{ marginTop: '10px', marginLeft: '23px', width: '65%', height: '10px', display: 'inline-block', border: '1px solid gray', borderRadius: '10px 10px', overflow: 'hidden' }}>
                <div className='bar' name='bar' id="bar" style={{ float: 'left', width: `${person}`, height: '10px', display: 'inline', border: '1px solid gray', borderRadius: '10px 10px', background: 'red' }}></div>
            </div>
            <span> {posts.in ? posts.in : `0`}/{posts.people ? (posts.people + `명`) : `∞명`}</span>
            <br />

        </Col>

    })


    return (<div style={{width:'100%', overflow:'hidden'}}>
        <img id='landingImg' src="https://cdn.wadiz.kr/ft/images/green001/2020/0605/20200605142924749_2233.jpg/wadiz/optimize/" ></img>
        <div id='renderZone'style={{ width: '85%', margin: '3rem auto' }}>

            <a href='/'><button>전체보기</button></a>
            <a href='/web'><button>웹 App</button></a>
            <a href='/android'><button>Android</button></a>
            <a href='/ios'><button>ios</button></a>
            <a href='/mfc'><button>MFC</button></a>
            <a href='/game'><button>Game</button></a>
            <a href='/normal'><button>일반/기타</button></a>

            <Title level={2} style={{marginTop:'2rem'}}> MFC 프로젝트 </Title>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
        </div>
    )
}

export default LandingMFCPage
