/* eslint-disable react/prop-types */
const Row = ({ item, isSelected, onHandleClick, showDiff = false }) => {
  return (
    <>
      {showDiff ? (
        <div
          className={`row px-0 py-1 text-center rowProduct`}>
          <div className="col-2">{item["Mã SP"]}</div>
          <div className="col-5">{item["Tên SP"]}</div>
          <div className="col-2">{item["SL"]}</div>
          <div className="col-2">{item["Thực tế"]}</div>
          <div className="col-1">{item["Thực tế"] - item["SL"]}</div>
        </div>
      ) : (
        <div
          className={`row px-0 py-1 text-center rowProduct ${
            isSelected ? "bg-primary-subtle " : ""
          }`}
          onClick={onHandleClick}>
          <div className="col-2">{item["Mã SP"]}</div>
          <div className="col-6">{item["Tên SP"]}</div>
          <div className="col-2">{item["SL"]}</div>
          <div className="col-2">{item["Thực tế"]}</div>
        </div>
      )}
    </>
  );
};

export default Row;
