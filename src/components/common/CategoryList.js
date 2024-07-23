// CategoryList.js
import React, { useState } from "react";
import CardList from "./CardList";


const categoryColors = {
  快樂: "bg-yellow-100",
  期待: "bg-green-100",
  安心: "bg-blue-100",
  不安: "bg-purple-100",
  驚訝: "bg-pink-100",
  低落: "bg-gray-100",
  討厭: "bg-red-100",
  生氣: "bg-orange-100",
  其他: "bg-indigo-100",
};

const CategoryList = ({ cards }) => {
  const [openCategories, setOpenCategories] = useState(
    Object.keys(categoryColors)
  );

  if (!cards) {
    return <p>載入中...</p>;
  }

  const cardArray = Array.isArray(cards) ? cards : Object.values(cards);
  if (cardArray.length === 0) {
    return <p>沒有情緒卡可顯示</p>;
  }

  const categories = [...new Set(cardArray.map((card) => card.category))];
  
  const toggleCategory = (category) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  
  return (
    <div className="flex flex-col space-y-4">
      {categories.map((category) => (
        <div key={category} className="flex">
          <button
            className={`border-gray-400 border-l shadow-lg shrink-0 w-10 h-52 p-2 rounded-l-full items-center  ${
              categoryColors[category] || "bg-white"
            } ${openCategories.includes(category) ? "font-bold" : ""}`}
            onClick={() => toggleCategory(category)}
          >
            <h2 className="text-xl text-gray-800">{category}</h2>
          </button>
          <div
            className={`border-r-4 flex-grow overflow-x-scroll transition-all duration-1000 ${
              openCategories.includes(category) ? "max-w-full" : "max-w-0"
            }`}
          >
            <CardList
              cards={cardArray.filter((card) => card.category === category)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
