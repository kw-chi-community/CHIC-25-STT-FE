import React from 'react';

const Footer = (props) => {
    return (
        <footer id="footerType" className={`footer__wrap ${props.element}`}>
            <h2 className="blind">푸터 영역</h2>
            <div className="footer__inner container">
                <div className="footer__right">
                MEETOKEY - 더 스마트한 회의를 위한 솔루션
                </div>
            </div>
        </footer>
    );
}

export default Footer;
