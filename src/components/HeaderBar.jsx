import React from 'react'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export default function HeaderBar () {
    const navigate = useNavigate()

    return (
        <header>
            <div id="header-left">
                <img src={Logo} id="logo-img" alt="logo"></img>
            </div>
            <div id="header-right">
                <div className="header-items" id="header-home" onClick={() => navigate('/')}>
                    <span className="long-header-items">Home</span>
                    <span className="short-header-items">H</span>
                </div><hr />
                <div className="header-items" id="header-blanko" onClick={() => navigate('/blanko')}>
                    <span className="long-header-items">Blanko</span>
                    <span className="short-header-items">B</span>
                </div><hr />
                <div className="header-items" id="header-slido" onClick={() => navigate('/slido')}>
                    <span className="long-header-items">Slido</span>
                    <span className="short-header-items">S</span>
                </div><hr />
                <div className="header-items" id="header-tetro" onClick={() => navigate('/tetro')}>
                    <span className="long-header-items">Tetro</span>
                    <span className="short-header-items">T</span>
                </div>
            </div>
        </header>
    )
}