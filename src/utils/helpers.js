export function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous'; // This is required for cross-origin images
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}
