/* eslint-disable react/prop-types */
const Row = ({ item, isSelected, onHandleClick }) => {
  return (
    <div
      className={`row px-0 py-1 text-center rowProduct ${
        isSelected ? "bg-primary-subtle " : ""
      }`}
      onClick={onHandleClick}>
      <div className="col-2">{item.MaSp}</div>
      <div className="col-6">{item.TenSp}</div>
      <div className="col-2">{item.TonHeThong}</div>
      <div className="col-2">{item.TonThucTe}</div>
    </div>
  );
};

export default Row;
