import React, { useEffect, useState } from 'react'
import axios from 'axios';
function CheckApply(props) {

    const postId = props.postId
    


    return (
        <div style={{margin:"0px"}}>
            <a href={`/applyer/${postId}`} >
            <button 
            
            style={{
                backgroundColor: `#AAAAAA`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                
                지원자 확인하기
            </button>
            </a>
        </div>
    )
}

export default CheckApply

