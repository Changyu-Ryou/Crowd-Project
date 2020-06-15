import React, { useState } from 'react';
import './UploadPage.css'
import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {BACK_URL} from '../../Link';

import {
    Typography,
    Button,
    Form,
    Input
} from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const PrivateOptions = [
    {
        value: 0,
        label: "비공개"
    }, {
        value: 1,
        label: "공개"
    }
]

const CategoryOptions = [
    {
        value: 0,
        label: "웹 어플리케이션"
    }, {
        value: 1,
        label: "안드로이드 어플리케이션"
    }, {
        value: 2,
        label: "IOS 어플리케이션"
    }, {
        value: 3,
        label: "MFC 프로젝트"
    }, {
        value: 4,
        label: "게임 개발"
    }, {
        value: 5,
        label: "기타"
    }
]

const LanguageOptions = [
    {
        value: 0,
        label: "C/C++"
    }, {
        value: 1,
        label: "JAVA"
    }, {
        value: 2,
        label: "C#"
    }, {
        value: 3,
        label: "Python"
    }, {
        value: 4,
        label: "Java Script"
    }, {
        value: 5,
        label: "없음"
    }
]

function UploadPage() {
    const user = useSelector(state => state.user);
    const [DocTitle, setDocTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [FilePath, setFilePath] = useState("")

    const [Category, setCategory] = useState(0)
    const [People, setPeople] = useState("")
    const [StartDay, setStartDay] = useState("")
    const [DayCount, setDayCount] = useState("")

    const onTitleChange = (e) => {
        setDocTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e)
        console.log(Description)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const handleChangePeople = (event) => {
        setPeople(event.currentTarget.value)
    }
    const handleChangeStartDay = (event) => {
        setStartDay(event.currentTarget.value)
    }
    const handleChangeDayCount = (event) => {
        setDayCount(event.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (DocTitle === "" || Description === "" ||
            Category === "" || FilePath === "" ||
            People === "" || StartDay === "" || DayCount == "" ||Private==="") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.userData._id,
            title: DocTitle,
            description: Description,
            privacy: Private,
            category: Category,
            filePath: FilePath,
            people: People,
            startday: StartDay,
            daycount: DayCount,
            joinPeople: 0,
            fin: false
        }

        if (DocTitle !== "") {
            if (Description !== "") {
                Axios
                    .post(/*localhost123*/'/api/post/uploadPost', variables)
                    .then(response => {
                        if (response.data.success) {
                            alert('게시물이 등록되었습니다.');
                            return window
                                .location
                                .replace('/')
                        } else {
                            alert('문서 업로드 실패')
                        }
                    })
            } else {
                alert('본문을 입력하세요')
            }
        } else {
            alert('제목을 입력하세요.')
        }

    }


    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log('file=',files)
        formData.append("file", files[0])

        Axios.post(/*localhost123*/'/api/post/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                } else {
                    alert('failed to save the video in server');
                    
                }
            })

    }

    return (
        <div style={{
            margin: '1rem auto'
        }}>
            <div
                style={{
                    textAlign: 'left',
                    marginBottom: '1rem'
                }}>

                <Form onSubmit={onSubmit}>
                   


                    <text id='category_them'>카테고리</text>
                    <select onChange={onCategoryChange} id='category_select'>
                        {
                            CategoryOptions.map(
                                (item, index) => (<option key={index} value={item.value}>{item.label}</option>)
                            )
                        }
                    </select>
                    <Button type="primary" size="large" onClick={onSubmit} id='button_align'>
                        등록
                    </Button>

                    <div className='Write'>
                        <div id='Title'>
                            <Input
                                onChange={onTitleChange}
                                value={DocTitle}
                                placeholder='제목'
                                id='title_txt' />
                        </div>

                        <ReactQuill id='.ql-editor'
                            //defaultValue={text}
                            onChange={(text, delta, source, editor) => {
                                if (source == 'user') {
                                    // place whatever function you want to execute when user types here:
                                    onDescriptionChange(editor.getHTML());
                                }
                            }} theme="snow" modules={{
                                toolbar: [
                                    [
                                        {
                                            'font': []
                                        }
                                    ],
                                    [
                                        {
                                            'size': ['small', 'normal', 'large', 'huge']
                                        }
                                    ],
                                    [
                                        'bold', 'italic', 'underline', 'strike'
                                    ],
                                    [
                                        {
                                            'align': []
                                        }
                                    ],
                                    [
                                        {
                                            'list': 'ordered'
                                        }, {
                                            'list': 'bullet'
                                        },
                                        'blockquote', {
                                            'direction': 'rtl'
                                        }
                                    ],
                                    [
                                        {
                                            'color': []
                                        }, {
                                            'background': []
                                        }, {
                                            'script': 'sub'
                                        }, {
                                            'script': 'super'
                                        }
                                    ],
                                    [
                                        'image', 'video', 'link'
                                    ]
                                ],
                                syntax: true
                            }} />

                    </div>

                    <br />
                    {/* <text>프로젝트 공개여부 </text>

                    <select onChange={onPrivateChange}>
                        {
                            PrivateOptions.map(
                                (item, index) => (<option key={index} value={item.value}>{item.label}</option>)
                            )
                        }
                    </select> */}
                    <br /><br />

                    <label><b>프로젝트 정원</b></label><br />
                <Input style={{ width: '30%' }}
                    type="number"
                    onChange={handleChangePeople}
                    value={People}
                    min="2"
                /> <span> 명</span>
                <br /><br />

                <div style={{ height: '50px' }}>

                    <div style={{ width: '50%', display: 'inline-block' }}>
                        <label><b>프로젝트 예상 시작일</b></label><br/>
                        <Input style={{ width:'90%' }}
                            type='date'
                            onChange={handleChangeStartDay}
                            value={StartDay}
                        />
                    </div>


                    <div style={{ width: '50%',  display: 'inline-block' }}>
                        <label><b>프로젝트 예상 진행 기간</b></label><br/>
                        <Input style={{ width:'35%'}}
                            type='number'
                            onChange={handleChangeDayCount}
                            value={DayCount}
                            min="1"
                        /> 일
                    </div>
                </div>
                <br/><br/><br/>

                    <h3>대표 이미지 선택</h3>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '100px', height: '100px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}

                            </div>
                        )}
                    </Dropzone>

                    {FilePath !== "" &&
                        <div >
                            <img style={{ marginLeft:'20px', width: '100px', height: 'auto', resize:"both", float:"left"}} src={`${BACK_URL}/${FilePath}`} alt="haha" />
                        </div>
                    }
                </div>

                    <br />
                    <br />

                    <br />
                    <br />


                </Form>
            </div>
        </div>
    )
}

export default UploadPage