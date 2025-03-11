import React from 'react'

const Slider = ( props ) => {
    return (
        <section id="sliderType" className={`slider__wrap ${props.element}`}>
            <h2 className="blind">슬라이드 유형</h2>
            <div className="slider__inner">
                <div className="slider">
                    <div className="slider__img">
                        <div className="desc">
                            <h3>MEET OKEY</h3>
                            <p>
                            <br />
                            
                            똑똑한 회의, 핵심만 딱! 
                            <br /> 
                            음성을 자동으로 정리해 아이디어를 키워드별로 시각화하는 스마트 회의 솔루션! 
                            </p>
                            <div className="btn">
                                <a href="/">로그인</a>
                                <a href="/" className="black">회원가입</a>
                            </div>
                        </div>
                    </div>
                    <div className="slider__arrow">
                        <a href="/" className="left"><span className="ir">이전 이미지</span></a>
                        <a href="/" className="right"><span className="ir">다음 이미지</span></a>
                    </div>
                    <div className="slider__dot">
                        <a href="/" className="dot active"><span className="ir">1</span></a>
                        <a href="/" className="dot"><span className="ir">2</span></a>
                        <a href="/" className="dot"><span className="ir">3</span></a>
                        <a href="/" className="play"><span className="ir">플레이</span></a>
                        <a href="/" className="stop"><span className="ir">정지</span></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Slider