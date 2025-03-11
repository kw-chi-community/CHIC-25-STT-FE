import React from 'react'

import cardBg01 from '../../assets/imgs/card_bg01.jpg';
import cardBg02 from '../../assets/imgs/card_bg02.jpg';
import cardBg03 from '../../assets/imgs/card_bg03.jpg';


const cardInfo = [
    {
        img: cardBg01,
        title: "회의 자동 기록 & 정리",
        desc: "회의 내용을 실시간으로 텍스트로 변환하여 자동 저장합니다. 따로 필기할 필요 없이 중요한 논의 내용을 기록하세요."
    },
    {
        img: cardBg02,
        title: "주제별 회의록 & 검색",
        desc: "회의 내용을 주제별로 정리하여 원하는 정보를 빠르게 찾을 수 있어요. 필요할 때마다 쉽게 회의록을 불러오세요."
    },
    {
        img: cardBg03,
        title: "회의 시각화 & 아이디어 정리",
        desc: "음성으로 나온 아이디어를 자동으로 분석하고 키워드별로 정리하여 한눈에 보기 쉽게 시각화합니다."
    }
]

const Card = ( props ) => {
    return (
        <section id="cardType" className={`card__wrap ${props.element}`}>
            <h2>{props.title}</h2>
            <p>
            MEETOKEY와 함께 스마트한 회의를 시작하세요!<br />
            </p>
            <div className="card__inner container">
                {cardInfo.map((card, key) => (
                    <article className="card" key={key}>
                        <figure className="card__header">
                            <img src={card.img} alt={card.title} />
                        </figure>
                        <div className="card__body">
                            <h3 className="tit">{card.title}</h3>
                            <p className="desc">{card.desc}</p>
                           
                        </div>
                    </article>
                ))}
                
            </div>
        </section>
    )
}

export default Card