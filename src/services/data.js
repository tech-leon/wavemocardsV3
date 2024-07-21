import React from 'react';
import Connect from "./connect";
import CardList from "../components/common/CardList";

const Data = () => {
  const API_URL = `${process.env.REACT_APP_GET_EMOTION_CARDS}?lang=zh-TW`;
  return (
    <Connect URL={API_URL}>
      {(data) => <CardList card={data} />}
    </Connect>
  );
};

export default Data;