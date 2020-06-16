import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {BACK_URL} from '../../../Link';
const { Title } = Typography;
const { Meta } = Card;

function LandingNormalPage() {

    const [Posts, setPosts] = useState([])
    var image = 'https://static.wadiz.kr/main/media/img-fundingopen-pc@2x.3311937d.jpg';
    var mainImg = 'https://cdn.wadiz.kr/ft/images/green001/2020/0605/20200605142924749_2233.jpg/wadiz/optimize/';
    const CategoryVariable = {
        category: 5
    }

    useEffect(() => {
        axios.post(/*localhost123*/'/api/post/categotyGetPost',CategoryVariable)
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
                peo = peo * posts.joinPeople
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }
        var finOrNot = posts.fin;
        if (finOrNot == null) {
            finOrNot=false;
            console.log("null == finornot==" + finOrNot);
        }
        var sdate = posts.startday;
        var thistime = moment();
        var cdate = moment(posts.startday);//.add(posts.daycount, "days");
        console.log('cdate=' + cdate + 'sdate=' + sdate + 'thistime=' + thistime + ' 일 차이: ', moment.duration(cdate.diff(thistime)).asDays());
        console.log(posts.title + '시간 차이: ', moment.duration(cdate.diff(thistime)).asHours());
        var resultDate = moment.duration(cdate.diff(thistime)).asDays();
        
      
        if (resultDate <= 0 || finOrNot==true) {
            return
        }

        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '40px' }}>
            <a href={`/post/${posts._id}`} >
                <div style={{ position: 'relative', margin: '0px 10px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>

                    {finOrNot
                        ? <div style={{ width: '100%', height: '150px', background: 'darkgray' }}><img style={{ width: '100%', filter: 'brightness(30%)' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />
                            <p style={{ position: 'absolute', top: "50%", left: '50%', transform: 'translate(-50%,-50%)', fontSize: '22px', color: 'white', textAlign: 'center', fontWeight: '600' }}>마감된<br />프로젝트</p>
                        </div>
                        : <img style={{ width: '100%' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />}


                </div><br />

                <Meta
                    avatar={
                        <Avatar src={posts.writer.image} />
                    }
                    title={posts.title}
                />
                <span>{posts.writer.name} </span><br />

                {/* <span style={{ marginLeft: '3rem' }}> {posts.views} views</span> */}
                <span style={{ marginLeft: '3rem' }}> {moment(posts.createdAt).format("yyyy년 MM월 D일")} </span><br />

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
            if (posts.joinPeople) {
                peo = peo * posts.joinPeople
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }
       var finOrNot = posts.fin;
        if (finOrNot == null) {
            finOrNot=false;
            console.log("null == finornot==" + finOrNot);
        }
        var sdate = posts.startday;
        var thistime = moment();
        var cdate = moment(posts.startday);//.add(posts.daycount, "days");
        console.log('cdate=' + cdate + 'sdate=' + sdate + 'thistime=' + thistime + ' 일 차이: ', moment.duration(cdate.diff(thistime)).asDays());
        console.log(posts.title + '시간 차이: ', moment.duration(cdate.diff(thistime)).asHours());
        var resultDate = moment.duration(cdate.diff(thistime)).asDays();
        
        if (resultDate <= 0)
            finOrNot = true;   
        

         if (finOrNot==false) {
             return
         }

        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '40px' }}>
            <a href={`/post/${posts._id}`} >
                <div style={{ position: 'relative', margin: '0px 10px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>

                    {finOrNot
                        ? <div style={{ width: '100%', height: '150px', background: 'darkgray' }}><img style={{ width: '100%', filter: 'brightness(30%)' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />
                            <p style={{ position: 'absolute', top: "50%", left: '50%', transform: 'translate(-50%,-50%)', fontSize: '22px', color: 'white', textAlign: 'center', fontWeight: '600' }}>마감된<br />프로젝트</p>
                        </div>
                        : <img style={{ width: '100%' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />}


                </div><br />

                <Meta
                    avatar={
                        <Avatar src={posts.writer.image} />
                    }
                    title={posts.title}
                />
                <span>{posts.writer.name} </span><br />

                {/* <span style={{ marginLeft: '3rem' }}> {posts.views} views</span> */}
                <span style={{ marginLeft: '3rem' }}> {moment(posts.createdAt).format("yyyy년 MM월 D일")} </span><br />

                <div style={{ marginTop: '10px', marginLeft: '23px', width: '65%', height: '10px', display: 'inline-block', border: '1px solid gray', borderRadius: '10px 10px', overflow: 'hidden' }}>
                    <div className='bar' name='bar' id="bar" style={{ float: 'left', width: `${person}`, height: '10px', display: 'inline', border: '1px solid gray', borderRadius: '10px 10px', background: 'red' }}></div>
                </div>
                <span> {posts.joinPeople ? posts.joinPeople : `0`}/{posts.people ? (posts.people + `명`) : `∞명`}</span>
                <br />
            </a>

        </Col>

    })


    return (<div style={{ width: '100%', overflow: 'hidden' }}>
        <section id='mainsection' style={{ backgroundImage: `url(${image})`, padding: '60px 0px', textAlign: 'center', height: '280px' }}><a href="/upload">
            <h1 style={{ color: 'white', fontSize: '26px', margin: '0px' }}><b>개매칭</b>에서 프로젝트 오픈하기</h1>
            <p style={{ color: 'white', fontSize: '15px' }}>당신의 아이디어를 소개하고 개발팀을 꾸려보세요</p>
            <Button id="landingBtn" style={{ backgroundColor: '#00c4c4', color: 'white', height: '56px', fontSize: '21px', padding: '0 32px', border: '0px solid white', borderRadius: '5px 5px' }}>바로가기&nbsp;<i aria-hidden="true"></i></Button>
        </a>
        </section>
       
        <div id='renderZone' style={{ width: '85%', margin: '3rem auto' }}>

            <div style={{textAlign:'center', width:'100%'}}>
            <div style={{display:'inline-block', marginRight:'20px'}}><a href='/'><img src='https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/4b/bc/29/4bbc29f9-6e2e-568f-982d-d99f36107417/source/256x256bb.jpg' style={{border:'1px solid white', borderRadius:'50%', width:'54px',height:'54px'}}></img>
            <br/><p style={{textAlign:'center',color:'rgba(0,0,0,.84)'}}>전체보기</p></a></div>
            <div style={{display:'inline-block', marginRight:'20px'}}><a href='/web'><img src='https://t1.daumcdn.net/cfile/tistory/21568A4656865D4D17' style={{border:'1px solid white', borderRadius:'50%', width:'54px',height:'54px'}}></img>
            <br/><p style={{textAlign:'center',color:'rgba(0,0,0,.84)'}}>웹 App</p></a></div>
            <div style={{display:'inline-block', marginRight:'20px'}}><a href='/android'><img src='https://seeklogo.com/images/A/android-new-2019-logo-3CD3BC571C-seeklogo.com.png' style={{border:'1px solid white', borderRadius:'50%', width:'54px',height:'54px'}}></img>
            <br/><p style={{textAlign:'center',color:'rgba(0,0,0,.84)'}}>android</p></a></div>
            <div style={{display:'inline-block', marginRight:'20px'}}><a href='/ios'><img src='https://i.dlpng.com/static/png/6980727_preview.png' 
            style={{border:'1px solid white', borderRadius:'50%', width:'54px',height:'54px'}}></img>
            <br/><p style={{textAlign:'center',color:'rgba(0,0,0,.84)'}}>ios</p></a></div>
            <div style={{display:'inline-block', marginRight:'20px'}}><a href='/mfc'><img src='https://3.bp.blogspot.com/-aV62l1gf1ew/XEcLcXE1JlI/AAAAAAAAANw/mxQ7mTFe6mcHY2vWLcNfzmYRhPAX7wZAACLcBGAs/s1600/MFC.png' style={{border:'1px solid white', borderRadius:'50%', width:'54px',height:'54px'}}></img>
            <br/><p style={{textAlign:'center',color:'rgba(0,0,0,.84)'}}>MFC</p></a></div>
            <div style={{display:'inline-block', marginRight:'20px'}}><a href='/game'><img src='https://static.wadiz.kr/assets/reward-category/reward_banner_thumb/reward_banner_thumb_292.jpg' style={{border:'1px solid white', borderRadius:'50%', width:'54px',height:'54px'}}></img>
            <br/><p style={{textAlign:'center',color:'rgba(0,0,0,.84)'}}>Game</p></a></div>
            <div style={{display:'inline-block', marginRight:'20px'}}><a href='/normal'><img src='https://t1.daumcdn.net/cfile/tistory/244B894852A2F38428' style={{border:'1px solid white', borderRadius:'50%', width:'54px',height:'54px'}}></img>
            <br/><p style={{textAlign:'center',color:'rgba(0,0,0,.84)'}}>일반/기타</p></a></div>
            </div>
            

            <Title level={2} style={{marginTop:'2rem'}}> 일반/기타 프로젝트 </Title>
            <hr />
            

            <Title level={4} style={{marginTop:'2rem'}}> 진행중 </Title>
            <Row gutter={16}>{renderCards}</Row>
            <hr />
            
            <Title level={4} style={{marginTop:'2rem'}}> 마감 </Title>
            <Row gutter={16}>{renderCards2}</Row>
            <hr />

            <img id='landingImg' style={{filter:'brightness(100%)'}} src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/competition-imgs/2020-DM-FE-01/fe_dm-prgm-img_banner.png" ></img>
        </div>
        
    </div>
    )
}

export default LandingNormalPage
