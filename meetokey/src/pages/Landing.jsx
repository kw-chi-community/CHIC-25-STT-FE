import React from 'react';

// ✅ CSS 파일 올바른 경로
import '../styles/reset.css'; 

// ✅ 컴포넌트 올바른 경로
import Header from '../components/landingComponents/Header';
import Main from '../components/landingComponents/Main';
import Footer from '../components/landingComponents/Footer';
import Slider from '../components/landingComponents/Slider';
import Image from '../components/landingComponents/Image';
import Card from '../components/landingComponents/Card';

const Landing = () => {
    return (
        <>
            <Header element="nexon" />
            <Main>
                <Slider element="nexon" />
                <Image element="section nexon" title="당신만을 위한 회의록" />
                <Card element="section nexon" title="MEET OKEY의 핵심기능" />
            </Main>
            <Footer element="nexon section gray" />
        </>
    );
};

export default Landing;
