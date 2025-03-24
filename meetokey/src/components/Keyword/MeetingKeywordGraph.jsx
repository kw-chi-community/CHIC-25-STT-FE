import React from "react";
import "./Sidebar"; // ❗️필요하다면 이걸 써야 함, 현재는 사용 안 하면 삭제 가능
import "../../styles/MeetingKeywordPage.css"; // ✅ src/styles 기준으로 2단계 위로 올라가기

const MeetingKeywordGraph = ({ center, keywords }) => {
  return (
    <div className="keyword-graph">
      <h2>{center} 연관 키워드</h2>
      <ul>
        {keywords.map((kw, index) => (
          <li key={index} style={{ color: kw.color }}>
            {kw.word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingKeywordGraph;
