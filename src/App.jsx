import './App.css';
import CoverPhotoCropper from './components/CoverPhotoCropper';
import DocumentScanner from './components/DocumentScanner';
import MemeGenerator from './components/MemeGenerator';
import ImageCropper from './components/ImageCropper';
// import ProfilePictureUpload from './components/ProfilePictureUpload';
import SocialMediaCropper from './components/SocialMediaCropper';
// import ThumbnailCrop from './components/ThumbnailCrop';

function App() {
  return (
    <div>
      <ImageCropper />
      {/* <ProfilePictureUpload />
      <ThumbnailCrop /> */}
      <SocialMediaCropper />
      <CoverPhotoCropper/>
      <DocumentScanner/>
      <MemeGenerator/>
    </div>
  );
}

export default App;
