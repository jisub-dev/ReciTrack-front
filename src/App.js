import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);

      // backend의 API 주소
      // 백엔드에서 @RequestMapping("/api/receipts") + @PostMapping => POST /api/receipts
      const response = await axios.post(
          'http://localhost:8080/api/receipts',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      );

      // 서버에서 반환한 Receipt 객체를 받아서 OCR 결과를 표시
      setOcrResult(response.data.ocrText || 'No OCR result available');
    } catch (error) {
      console.error(error);
      alert('Error uploading file or processing OCR.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={{ margin: '40px' }}>
        <h1>Receipt OCR Demo</h1>

        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={loading}>Upload & OCR</button>
        </div>

        {loading && <p>Processing...</p>}

        {ocrResult && (
            <div style={{ marginTop: '20px' }}>
              <h3>OCR Result:</h3>
              <pre>{ocrResult}</pre>
            </div>
        )}
      </div>
  );
}

export default App;
