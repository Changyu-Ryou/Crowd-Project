import React, { useEffect, useState } from 'react'
import axios from 'axios';
function FinApply(props) {
   
    const postId = props.postId

    const [Fin, setFin] = useState(0)
    const [inornot, setinornot] = useState(0)

    const onSubscribe = () => {

        let subscribeVariables = {
            postId: postId,
        }


        //setinornotUser(inornotUser);

        if (Fin == 1) {
           
          
            setFin(!Fin);
        } else {
            // when we are not subscribed yet
            axios.post('http://localhost:5000/api/post/makefin', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    //console.log("data2=",response.data);
                    
                    setFin(!Fin);
                    console.log("fin==",response.data.post);
                    //console.log(response.data.success)
                } else {
                    alert('Failed to subscribe')
                }
            })
            
          


        }

    }


    useEffect(() => {
        
        const inornotUserVariables = { postId: postId }     //in 인지 아닌지 판별
        axios.post('http://localhost:5000/api/post/finornot', inornotUserVariables)
            .then(response => {
                if (response.data.success) {
                    console.log("inornot==>",response.data.post.fin)
                    if(response.data.post.fin){
                        setFin(response.data.post.fin)
                    }else{
                        setFin(0)
                    }
                } else {
                    alert('Failed to get inornotUser')
                }
            })



    }, [])


    return (
        <div style={{ margin: "0px" }}>
            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Fin ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                {/* {SubscribeNumber}  */}
                {Fin ? '모집이 마감되었습니다' : '모집 마감하기'}
            </button>
        </div>
    )
}

export default FinApply

