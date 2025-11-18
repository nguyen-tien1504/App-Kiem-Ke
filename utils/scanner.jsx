import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const Scanner = ({ onDetected }) => {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    // khởi tạo reader
    codeReaderRef.current = new BrowserMultiFormatReader();

    // lấy danh sách camera (nếu có)
    (async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        setCameras(devices || []);
        if (devices && devices.length) {
          setDeviceId(devices[0].deviceId);
        }
      } catch (err) {
        console.error("Lỗi lấy camera:", err);
      }
    })();

    // cleanup khi unmount: reset sẽ dừng camera
    return () => {
      stopScanner();
      if (codeReaderRef.current) {
        try {
          codeReaderRef.current.reset();
        } catch (e) {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Nếu đang quét và đổi camera, thì dừng và khởi động lại
    if (isScanning) {
      stopScanner();
      setTimeout(() => {
        startScanner();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  //   const startScanner = async () => {
  //     if (isScanning) return; // Ngăn gọi lặp
  //     await stopScanner();
  //     if (!videoRef.current || !codeReaderRef.current) return;
  //     setIsScanning(true);

  //     try {
  //       await codeReaderRef.current.decodeFromVideoDevice(
  //         deviceId || undefined,
  //         videoRef.current,
  //         (result, error) => {
  //           if (result) {
  //             const text = result.getText();
  //             // gọi callback với dữ liệu quét được
  //             onDetected && onDetected(text);

  //             // nếu chỉ cần 1 lần quét: dừng scanner
  //             stopScanner();
  //           } else if (error && error?.name !== "NotFoundException") {
  //             // NotFoundException: frame không tìm thấy mã, bình thường
  //             console.warn("Decode error:", error);
  //           }
  //         },
  //         {
  //           video: {
  //             facingMode: "environment",
  //           },
  //           tryHarder: true,
  //         }
  //       );
  //     } catch (err) {
  //       console.error("Start scanner failed:", err);
  //       setIsScanning(false);
  //     }
  //   };

  const startScanner = async () => {
    await stopScanner(); // giải phóng stream cũ

    setTimeout(async () => {
      if (!videoRef.current) return;
      setIsScanning(true);

      try {
        await codeReaderRef.current.decodeFromVideoDevice(
          deviceId || undefined,
          videoRef.current,
          (result, err) => {
            if (result) {
              onDetected?.(result.getText());
              stopScanner();
            }
            if (err) {
              console.log(err);
            }
          },
          {
            video: {
              facingMode: "environment",
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
            tryHarder: true,
            focusMode: "continuous",
          }
        );
      } catch (err) {
        console.error("Start error:", err);
        setIsScanning(false);
      }
    }, 200); // ⏱ camera needs release time
  };

  const stopScanner = async () => {
    try {
      if (codeReaderRef.current) codeReaderRef.current.reset();
    } catch (e) {
      console.warn("Stop error:", e);
    }
    const video = videoRef.current;
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => track.stop()); // TẮT HẲN CAMERA
      video.srcObject = null;
    }

    setIsScanning(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
        <button
          className="btn btn-primary"
          onClick={startScanner}
          disabled={isScanning}>
          Bắt đầu quét
        </button>
        <button
          className="btn btn-secondary"
          onClick={stopScanner}
          disabled={!isScanning}>
          Dừng quét
        </button>

        {cameras.length > 0 && (
          <select
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            style={{ padding: "6px 8px" }}>
            {cameras.map((cam) => (
              <option
                key={cam.deviceId}
                value={cam.deviceId}>
                {cam.label || cam.deviceId}
              </option>
            ))}
          </select>
        )}
      </div>

      <div
        style={{
          width: 360,
          height: 240,
          background: "#000",
          borderRadius: 6,
          overflow: "hidden",
        }}>
        <video
          ref={videoRef}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
          playsInline // quan trọng cho iOS
        />
      </div>
    </div>
  );
};

export default Scanner;
