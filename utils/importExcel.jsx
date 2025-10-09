import { useRef } from "react";
import { read, utils, writeFile } from "xlsx";
import PropTypes from "prop-types";

const ImportExcel = ({ list, setList }) => {
  const inputFileRef = useRef();
  const handleImport = (e) => {
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
              return {
                ...item,
                TonThucTe: item.TonThucTe ? item.TonThucTe : 0,
              };
            })
          );
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const dataExport = list.map((item) => {
      return {
        ...item,
        ChenhLech: item.TonThucTe - item.TonHeThong,
      };
    });
    const headings = [["MaSp", "TenSp", "TonHeThong", "TonThucTe", "ChenhLech"]];
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
        Nhap excel
      </button>
      <button
        className="btn btn-primary"
        onClick={handleExport}>
        Xuat excel
      </button>
    </div>
  );
};
ImportExcel.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
};
export default ImportExcel;
