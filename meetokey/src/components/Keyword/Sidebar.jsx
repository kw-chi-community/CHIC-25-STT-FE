// src/components/Keyword/Sidebar.jsx
import React from "react";
import "../../styles/MeetingKeywordPage.css";

const categoryData = {
  인물: ["학생회", "교수진", "외부 연사"],
  단체: ["동아리", "학과", "학교"],
  장소: ["강의실", "회의실", "행사장"]
};

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="keyword-sidebar">
      <h3>카테고리</h3>

      {/* ✅ 스크롤 가능한 영역 */}
      <div className="sidebar-scrollable">
        <div className="category-list">
          <label>
            <input
              type="radio"
              value="전체"
              checked={selectedCategory === "전체"}
              onChange={() => onSelectCategory("전체")}
            />
            전체
          </label>

          {Object.entries(categoryData).map(([group, categories]) => (
            <div key={group} className="category-group">
              <p className="group-title">{group}</p>
              {categories.map((cat) => (
                <label key={cat}>
                  <input
                    type="radio"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => onSelectCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ 스크롤 밖에 고정된 버튼 */}
      <button className="apply-button">적용하기</button>
    </div>
  );
};

export default Sidebar;
