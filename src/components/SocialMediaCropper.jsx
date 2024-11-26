import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card/index';
import { Upload, Crop, Download, X } from 'lucide-react';
import Cropper from 'react-easy-crop';

const SocialMediaCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setCroppedImage(null);
        // Reset crop settings when new image is uploaded
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const createImage = (url) =>
  //   new Promise((resolve, reject) => {
  //     const image = new Image();
  //     image.addEventListener('load', () => resolve(image));
  //     image.addEventListener('error', (error) => reject(error));
  //     image.setAttribute('crossOrigin', 'anonymous');
  //     image.src = url;
  //   });


  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new window.Image(); // Rename this to avoid conflict
      img.addEventListener('load', () => resolve(img));  // Use img instead of Image
      img.addEventListener('error', (error) => reject(error));
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
    });
  
  const getRadianAngle = (degreeValue) => {
    return (degreeValue * Math.PI) / 180;
  };

  const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    // Calculate bounding box of the rotated image
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // Set canvas size to match the bounding box
    canvas.width = safeArea;
    canvas.height = safeArea;

    // Translate canvas context to center
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // Draw rotated image
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    // Extract the cropped image
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // Set canvas width to final desired crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Place the cropped image data in the canvas
    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', 1);
    });
  };

  const showCroppedImage = useCallback(async () => {
    try {
      if (!croppedAreaPixels || !imageSrc) return;
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error('Error creating crop:', e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const handleDownload = useCallback(() => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.download = 'cropped-image.jpg';
      link.href = croppedImage;
      link.click();
    }
  }, [croppedImage]);

  const aspectRatios = {
    '1:1': 1,
    '4:3': 4/3,
    '16:9': 16/9,
    '9:16': 9/16,
    '3:4': 3/4,
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crop className="w-6 h-6" />
          Social Media Image Cropper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!imageSrc ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(aspectRatios).map(([label, ratio]) => (
                  <button
                    key={label}
                    onClick={() => setAspect(ratio)}
                    className={`px-3 py-1 rounded ${
                      aspect === ratio
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setImageSrc(null);
                    setCroppedImage(null);
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
                    setRotation(0);
                  }}
                  className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  objectFit="contain"
                />
              </div>

              <div className="flex gap-4 items-center">
                <label className="flex-1">
                  <span className="text-sm text-gray-600">Zoom</span>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="flex-1">
                  <span className="text-sm text-gray-600">Rotation</span>
                  <input
                    type="range"
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="w-full"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={showCroppedImage}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                >
                  <Crop className="w-4 h-4" />
                  Crop Image
                </button>
                {croppedImage && (
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>

              {croppedImage && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <div className="relative max-w-md mx-auto">
                    <img
                      src={croppedImage}
                      alt="Cropped"
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaCropper;