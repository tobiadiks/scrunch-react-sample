import React, { useState } from 'react';
import compressImageClient  from 'scrunchjs';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [initialQuality, setInitialQuality] = useState(70);
  const [minQuality, setMinQuality] = useState(10);
  const [maxFileSize, setMaxFileSize] = useState(200);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
   
    if (!image) return;

    const compressedBuffer = await compressImageClient({
      input: image,
      maxWidth,
      initialQuality,
      minQuality,
      maxFileSize: maxFileSize * 1024
    });

    const compressedImage = new Image();
    compressedImage.src = URL.createObjectURL(compressedBuffer);
    setCompressedImage(compressedImage.src);
    console.log(compressedImage.src)
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <div>
        <label>Max Width: <input type="number" value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} /></label>
        <label>Initial Quality: <input type="number" value={initialQuality} onChange={(e) => setInitialQuality(Number(e.target.value))} /></label>
        <label>Min Quality: <input type="number" value={minQuality} onChange={(e) => setMinQuality(Number(e.target.value))} /></label>
        <label>Max File Size (KB): <input type="number" value={maxFileSize} onChange={(e) => setMaxFileSize(Number(e.target.value))} /></label>
      </div>
      <button onClick={handleUpload}>Upload and Compress</button>
      {compressedImage && <img src={compressedImage} alt="Compressed" />}
    </div>
  );
};

export default ImageUploader;
