import React from 'react'

const isLogin = () => {
    if(!localStorage.getItem('idx')){
        alert("로그인이 필요한 페이지 입니다.")
        window.location.replace('/')
    }
}

export default isLogin