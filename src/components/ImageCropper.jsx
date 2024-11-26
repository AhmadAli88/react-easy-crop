import  { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage'; // Utility function for cropping

const ImageCropper = () => {
  const [imageSrc, setImageSrc] = useState(null); // Image to crop
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (error) {
      console.error('Error cropping the image:', error);
    }
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>React Easy Crop Example</h1>

      {!imageSrc ? (
        <div>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {imageSrc && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={showCroppedImage}>Crop Image</button>
          <button onClick={() => setImageSrc(null)} style={{background: 'lightblue', borderRadius: '10px', padding: '7px 20px', marginLeft: '20px'}}>Reset</button>
        </div>
      )}

      {croppedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Cropped Image:</h3>
          <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
