import React from 'react'
import '../../styles/Landing.css';  
import '../../styles/reset.css';  

const Header = ( props ) => {
    return (
        <header id="headerType" className={`header__wrap ${props.element}`}>
            <div className="header__inner">
                <div className="header__logo">
                    <a href="/">MEET OKEY</a>
                </div>
                <nav className="header__menu" style={{ marginLeft: "-830px" }}>
                <ul>
                 <li><a href="/">회의 시작</a></li>
                    <li><a href="/">회의록 보기</a></li>
             </ul>
        </nav>

                <div className="header__member">
                    <a href="/">로그인</a>
                </div>
            </div>
        </header>
    )
}



export default Header