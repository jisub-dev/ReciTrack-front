import React, { useState } from 'react';
import axios from 'axios';

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

      // 백엔드로 업로드
      const response = await axios.post('http://localhost:8080/api/receipts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setOcrResult(response.data.ocrText || 'No OCR result');
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
