import  { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const CoverPhotoCropper = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = async (_, croppedAreaPixels) => {
    const croppedCover = await getCroppedImg(image, croppedAreaPixels);
    console.log('Cropped Cover Photo:', croppedCover);
  };

  return (
    <div>
      {image ? (
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9} // Aspect ratio for cover photos
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        />
      )}
    </div>
  );
};

export default CoverPhotoCropper;
