// Card.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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

const Card = ({ card }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const bgColor = categoryColors[card.Category] || "bg-white";

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="group group min-w-[10.8rem] px-2 cursor-pointer"
        onClick={toggleCard}
      >
        <div
          className={`shadow-md border border-gray-400 rounded-2xl p-4 ${bgColor}`}
        >
          <img
            src={`/images/card/${card.ID}.svg`}
            alt={card.Name}
            className="w-full h-auto group-hover:scale-110 duration-500	"
          />
          <h3 className="text-2xl font-bold mt-2 text-center">{card.Name}</h3>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleCard}
        >
          <div
            className={`flex items-center w-5/6 max-w-2xl p-10 rounded-2xl ${bgColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col-reverse md:flex-row w-full">
              <div className="flex flex-col md:w-7/12 px-5">
                <h3 className="text-5xl font-bold mb-2">{card.Name}</h3>
                <div className="border border-slate-300 mb-4"></div>
                <h4 className="text-2xl">{t("element.cardDescription")}</h4>
                <p className="text-lg mb-2">{card.Description}</p>
                <h4 className="text-2xl">{t("element.cardExample")}</h4>
                <p className="text-md italic">例如：{card.Example}</p>{" "}
              </div>
              <div className="mb-6 md:mb-0 md:w-5/12">
                <img
                  src={`/images/card/${card.ID}.svg`}
                  alt={card.Name}
                  className="w-full h-auto"
                />
              </div>
            </div>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
