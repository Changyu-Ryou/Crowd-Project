import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Subscriber(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom
    const postId = props.postId

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = ( ) => {

        let subscribeVariables = {
                userTo : userTo,
                userFrom : userFrom,
                postId : postId,
                join: 0
        }

        if(Subscribed) {
            //when we are already subscribed 
            axios.post('http://localhost:5000/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success){ 
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to unsubscribe')
                    }
                })

        } else {
            // when we are not subscribed yet
            
            axios.post('http://localhost:5000/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }


    useEffect(() => {

        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom, postId: postId }
        axios.post('http://localhost:5000/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        axios.post('http://localhost:5000/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })

    }, [])


    return (
        <div style={{margin:"0px"}}>
            <button 
            onClick={onSubscribe}
            style={{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {/* {SubscribeNumber}  */}
                {Subscribed ? '지원취소하기' : '참여 지원하기'}
            </button>
        </div>
    )
}

export default Subscriber

