import React from 'react'
import { Link } from 'react-router-dom';

const Image = ( props ) => {
    return (
        <section id="imageType" className={`imageType__wrap ${props.element}`}>
            <h2>{props.title}</h2>
            <p>AI가 회의를 정리하고, 다음 회의 주제 추천까지!</p>
            <div className="image__inner container">
                <article className="image img1">
                    <h3 className="image__title">날짜별 회의 확인하기</h3>
                    <p className="image__desc">
                        지난 회의 내용을 한눈에 확인하고, <br />
                        중요한 논의 사항을 빠르게 찾아보세요.
                    </p>
                    {/* ✅ Link로 교체 */}
                    <Link className="image__btn" to="/date">날짜별로 보기</Link>
                </article>

                <article className="image img2">
                    <h3 className="image__title">주제별 회의록 확인하기</h3>
                    <p className="image__desc">
                        회의 내용을 주제별로 정리하여 빠르게 찾아볼 수 있습니다. <br />
                        원하는 주제를 선택하고 회의록을 확인하세요.
                    </p>
                    <a className="image__btn yellow" href="/">주제별로 보기</a>
                </article>
            </div>
        </section>
    )
}

export default Image
