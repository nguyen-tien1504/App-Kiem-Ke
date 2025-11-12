import { useEffect, useState } from "react";
import Row from "../components/row";

const ViewData = () => {
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSortType] = useState("maSP-asc");

  // --- staged (tạm) states for modal; only commit to main states on "Ap dung"
  const [stagedSearch, setStagedSearch] = useState(searchValue);
  const [stagedFilterType, setStagedFilterType] = useState(filterType);
  const [stagedSortType, setStagedSortType] = useState(sortType);

  useEffect(() => {
    const saved = localStorage.getItem("productList");
    if (saved) setList(JSON.parse(saved));
  }, []);

  const data = list.filter(
    (item) =>
      String(item["Mã SP"]).toLowerCase().includes(searchValue.toLowerCase()) ||
      String(item["Tên SP"]).toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredList = data.filter((item) => {
    const diff = item["Thực tế"] - item["SL"];
    if (filterType === "zero") return diff === 0;
    if (filterType === "positive") return diff > 0;
    if (filterType === "negative") return diff < 0;
    return true;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortType === "maSP-asc") return a["Mã SP"].localeCompare(b["Mã SP"]);
    if (sortType === "maSP-desc") return b["Mã SP"].localeCompare(a["Mã SP"]);
    return 0;
  });

  const applyFilters = () => {
    setSearchValue(stagedSearch);
    setFilterType(stagedFilterType);
    setSortType(stagedSortType);
  };
  return (
    <div
      className="p-2"
      style={{ fontSize: "14px" }}>
      <div className="row text-center">
        <div className="col-2">Mã SP</div>
        <div className="col-5">Tên SP</div>
        <div className="col-2">SL</div>
        <div className="col-2">Thực tế</div>
        <div className="col-1">Chênh lệch</div>
      </div>
      <div
        className="overflow-auto mt-2"
        style={{ height: "65vh" }}>
        {sortedList.map((item, index) => (
          <div
            key={index}
            className={`text-center ${
              item["Thực tế"] - item["SL"] === 0
                ? "bg-success bg-opacity-25"
                : "bg-warning-subtle"
            }`}>
            <Row
              item={item}
              showDiff
            />
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          Tim kiem nang cao
        </button>

        {/* Tim kiem nang cao modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog mx-2">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="exampleModalLabel">
                  Tim kiem nang cao
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>

              {/* Tim kiem nang cao */}
              <div className="modal-body">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="productSearching"
                    placeholder="Tim kiem san pham"
                    value={stagedSearch}
                    onChange={(e) => setStagedSearch(e.target.value)}
                  />
                  <label htmlFor="productSearching">Tim kiem san pham</label>
                </div>
                Lọc dữ liệu theo:
                <select
                  className="form-select form-select-sm mb-3"
                  value={stagedFilterType}
                  onChange={(e) => setStagedFilterType(e.target.value)}>
                  <option value="all">Tất cả</option>
                  <option value="zero">Chênh lệch = 0</option>
                  <option value="positive">Chênh lệch &gt; 0</option>
                  <option value="negative">Chênh lệch &lt; 0</option>
                </select>
                Sắp xếp theo:
                <select
                  className="form-select form-select-sm mb-3"
                  value={stagedSortType}
                  onChange={(e) => setStagedSortType(e.target.value)}>
                  <option value="maSP-asc">Mã SP A-Z</option>
                  <option value="maSP-desc">Mã SP Z-A</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Dong
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={applyFilters}>
                  Ap dung
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
