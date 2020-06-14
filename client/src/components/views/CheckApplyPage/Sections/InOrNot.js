import React, { useEffect, useState } from 'react'
import axios from 'axios';
function InOrNot(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom
    const postId = props.postId

    const [inornotUser, setinornotUser] = useState(0)
    const [inornot, setinornot] = useState(0)

    const onSubscribe = () => {

        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom,
            postId: postId,
        }


        //setinornotUser(inornotUser);

        if (inornotUser == 1) {
            //when we are already subscribed 
            // axios.post('http://localhost:5000/api/subscribe/unSubscribe', subscribeVariables)
            //     .then(response => {
            //         if(response.data.success){ 
            //             setSubscribeNumber(SubscribeNumber - 1)
            //             setSubscribed(!Subscribed)
            //         } else {
            //             alert('Failed to unsubscribe')
            //         }
            //     })
            axios.post('http://localhost:5000/api/subscribe/out', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    console.log("data=",response.data);
                    setinornotUser(!inornotUser)
                    //console.log(response.data.success)
                } else {
                    alert('Failed to subscribe')
                }
            })
            axios.post('http://localhost:5000/api/post/outProject', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    console.log("data=3",response.data);
                    //setinornotUser(inornotUser);

                    //console.log(response.data.success)
                } else {
                    alert('Failed to subscribe')
                }
            })

        } else {
            // when we are not subscribed yet
            axios.post('http://localhost:5000/api/subscribe/in', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    //console.log("data2=",response.data);
                    
                    setinornotUser(!inornotUser);
                    console.log(inornotUser);
                    //console.log(response.data.success)
                } else {
                    alert('Failed to subscribe')
                }
            })
            
            axios.post('http://localhost:5000/api/post/inProject', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    console.log("data=3",response.data);
                    //setinornotUser(inornotUser);

                    //console.log(response.data.success)
                } else {
                    alert('Failed to subscribe')
                }
            })



        }

    }


    useEffect(() => {
        console.log(userTo+" "+userFrom+" " + postId)
        const inornotUserVariables = { userTo: userTo, userFrom: userFrom, postId: postId }     //in 인지 아닌지 판별
        axios.post('http://localhost:5000/api/subscribe/inornot', inornotUserVariables)
            .then(response => {
                if (response.data.success) {
                    console.log("inornot==>",response.data.inornot[0].join)
                    if(response.data.inornot[0].join){
                        setinornotUser(response.data.inornot[0].join)
                    }else{
                        setinornotUser(0)
                    }
                    
                    
                    
                    

                } else {
                    alert('Failed to get inornotUser')
                }
            })


        // axios.post('http://localhost:5000/api/subscribe/subscribed', subscribeNumberVariables)
        //     .then(response => {
        //         if (response.data.success) {
        //             setSubscribed(response.data.subcribed)
        //         } else {
        //             alert('Failed to get Subscribed Information')
        //         }
        //     })

    }, [])


    return (
        <div style={{ margin: "0px" }}>
            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${inornotUser ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                {/* {SubscribeNumber}  */}
                {(inornotUser == 1) ? '선택취소하기' : '선택하기'}
            </button>
        </div>
    )
}

export default InOrNot

