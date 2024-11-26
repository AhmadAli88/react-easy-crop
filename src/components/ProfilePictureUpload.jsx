import  { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const ProfilePictureUpload = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    console.log('Cropped Image:', croppedImage);
  };

  return (
    <div>
      {image ? (
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
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

export default ProfilePictureUpload;
