import React, { useState } from 'react';
// Uncomment one of the following import options:
import AWS from 'aws-sdk'; // Import entire SDK (optional)
// import AWS from 'aws-sdk/global'; // Import global AWS namespace (recommended)
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client

import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false)

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
    // Add more supported types as needed
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Invalid file type. Only images and PDFs are allowed.');
    }
  };

  const uploadFile = async () => {
    setUploading(true)
    const S3_BUCKET = "kodigit-file-upload"; // Replace with your bucket name
    const REGION = "us-east-1"; // Replace with your region

    AWS.config.update({
      accessKeyId: "AKIA6MVL2M3HF7TJ34MH",
      secretAccessKey: "3iqxFTVNy9gFD3JVOJkV5aiUEgSckqA5V5msa6s0",
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const upload = await s3.putObject(params).promise();
      console.log(upload);
      setUploading(false)
      alert("File uploaded successfully.");

    } catch (error) {
      console.error(error);
      setUploading(false)
      alert("Error uploading file: " + error.message); // Inform user about the error
    }
  };

  return (
    <>
      <div className="">
        <input type="file" required onChange={handleFileChange} />
        <button onClick={uploadFile}>{uploading ? 'Uploading...' : 'Upload File'}</button>
      </div>
    </>
  );
}

export default App;



