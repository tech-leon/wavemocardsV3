const CardList = ({ card }) => {
  if (!card) {
    return <p>載入中...</p>;
  }

  const cardArray = Array.isArray(card) ? card : Object.values(card);

  if (cardArray.length === 0) {
    return <p>沒有情緒卡可顯示</p>;
  }

  return (
    <>
      {cardArray.map((item) => (
        <div key={item.ID}>
          <div
            className="flex flex-col items-center border border-gray-400 rounded-2xl w-60"
          >
            <img src={`/images/card/${item.ID}.svg`} alt={item.Name}></img>
            <h3>{item.Name}</h3>
            <p>{item.ID}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardList;
