import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingGamePage() {

    const [Posts, setPosts] = useState([])
    var image = 'https://static.wadiz.kr/main/media/img-fundingopen-pc@2x.3311937d.jpg';
    var mainImg = 'https://cdn.wadiz.kr/ft/images/green001/2020/0605/20200605142924749_2233.jpg/wadiz/optimize/';
    const CategoryVariable = {
        category: 4
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
            if (posts.joinPeople) {
                peo = peo * posts.joinPeople}
            if (posts.in) {
                peo = peo * posts.in
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }
        var finOrNot = posts.fin;
        var sdate = posts.startday;
        var thistime = moment();
        var cdate = moment(posts.startday).add(posts.daycount, "days");
        console.log('일 차이: ', moment.duration(cdate.diff(thistime)).asDays());
        console.log('시간 차이: ', moment.duration(cdate.diff(thistime)).asHours());
        var resultDate = moment.duration(cdate.diff(thistime)).asDays();
        posts.resultDate=resultDate
        if(resultDate>0){
            return
        }
        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '40px' }}>
            <a href={`/post/${posts._id}`} >
            <div style={{ position: 'relative', margin: '0px 10px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>
                
                   { finOrNot
                    ?<div style={{ width: '100%',height: '150px',background:'darkgray'}}><img style={{ width: '100%',filter:'brightness(30%)' }} alt="thumbnail" src={`http://localhost:5000/${posts.filePath}`} />
                    <p style={{position:'absolute', top:"50%",left:'50%',transform:'translate(-50%,-50%)',fontSize:'22px',color:'white',textAlign:'center',fontWeight:'600'}}>마감된<br/>프로젝트</p>
                    </div>
                    :<img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${posts.filePath}`} />}

                   
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
            <span> {posts.joinPeople ? posts.joinPeople : `0`}/{posts.people ? (posts.people + `명`) : `∞명`}</span>
            <br />
            </a>

        </Col>

    })
    const renderCards2 = Posts.map((posts, index) => {

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
        var finOrNot = posts.fin;
        var sdate = posts.startday;
        var thistime = moment();
        var cdate = moment(posts.startday).add(posts.daycount, "days");
        console.log('일 차이: ', moment.duration(cdate.diff(thistime)).asDays());
        console.log('시간 차이: ', moment.duration(cdate.diff(thistime)).asHours());
        var resultDate = moment.duration(cdate.diff(thistime)).asDays();
        
        if(resultDate<=0){
            return
        }
        
        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '40px' }}>
            <a href={`/post/${posts._id}`} >
            <div style={{ position: 'relative', margin: '0px 10px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>
                
                   { finOrNot
                    ?<div style={{ width: '100%',height: '150px',background:'darkgray'}}><img style={{ width: '100%',filter:'brightness(30%)' }} alt="thumbnail" src={`http://localhost:5000/${posts.filePath}`} />
                    <p style={{position:'absolute', top:"50%",left:'50%',transform:'translate(-50%,-50%)',fontSize:'22px',color:'white',textAlign:'center',fontWeight:'600'}}>마감된<br/>프로젝트</p>
                    </div>
                    :<img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${posts.filePath}`} />}

                   
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
            <span> {posts.joinPeople ? posts.joinPeople : `0`}/{posts.people ? (posts.people + `명`) : `∞명`}</span>
            <br />
            </a>

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

            <Title level={2} style={{marginTop:'2rem'}}> Game 프로젝트 </Title>
            <hr />
            

            <Title level={4} style={{marginTop:'2rem'}}> 진행중 </Title>
            <Row gutter={16}>{renderCards}</Row>
            <hr />
            
            <Title level={4} style={{marginTop:'2rem'}}> 마감 </Title>
            <Row gutter={16}>{renderCards2}</Row>
            <hr />
        </div>
        <section style={{backgroundImage: `url(${image})`, padding:'60px 0px', textAlign:'center', height:'280px'}}><a href="/upload">
            <h1 style={{color:'white', fontSize:'32px', margin:'0px'}}>소개매칭에서 프로젝트 오픈하기</h1>
            <p style={{color:'white', fontSize:'15px'}}>당신의 아이디어를 소개하고 개발팀을 꾸려보세요</p>
            <Button style={{backgroundColor:'#00c4c4', color:'white',height:'56px', fontSize:'21px',padding:'0 32px', border:'0px solid white', borderRadius:'5px 5px'}}>바로가기&nbsp;<i aria-hidden="true"></i></Button>
        </a>
        </section>
        </div>
    )
}

export default LandingGamePage
