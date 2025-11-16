/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { read, utils, writeFile } from "xlsx";
import PropTypes from "prop-types";

const ImportExcel = ({ list, setList }) => {
  const inputFileRef = useRef();
  const handleImport = (e) => {
    localStorage.removeItem("productList");
    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setList(
            rows.map((item) => {
              const { ["Mã CH"]: _, ["Quy cách"]: __, ["Đơn vị"]: ___, ...rest } = item;
              return {
                ...rest,
                ["Thực tế"]: item["Thực tế"] ? item["Thực tế"] : 0,
              };
            })
          );

          localStorage.setItem("productList", JSON.stringify(list));
        }
      };
      reader.readAsArrayBuffer(file);
    } else return;
    
    // reset du lieu input file de lan sau chon cung file van load duoc
    e.target.value = null;
  };

  const handleExport = () => {
    const headings = [["Mã SP", "Tên SP", "Phân loại SP", "SL", "Thực tế", "Chênh lệch"]];
    const dataExport = list.map((item) => {
      const reordered = Object.fromEntries(headings[0].map((key) => [key, item[key]]));
      return {
        ...reordered,
        ["Chênh lệch"]: item["Thực tế"] - item["SL"],
      };
    });
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, dataExport, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "BaoCaoKiemKe.xlsx");
  };
  return (
    <div className="d-flex justify-content-between gap-3">
      <input
        type="file"
        name="file"
        style={{ color: "transparent" }}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleImport}
        hidden
        ref={inputFileRef}
      />
      <button
        className="btn btn-primary"
        onClick={() => inputFileRef.current.click()}>
        Nhập excel
      </button>
      <button
        className="btn btn-primary"
        onClick={handleExport}>
        Xuất excel
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          setList([]);
          localStorage.removeItem("productList");
        }}>
        Xóa dữ liệu
      </button>
    </div>
  );
};
ImportExcel.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
};
export default ImportExcel;
