import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "rsuite";

function mimeToExtension(mime) {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    // Add more MIME types and their corresponding extensions if needed
    default:
      return "";
  }
}

const Cropper = ({ imageToCrop, croppedImage }) => {
  const imageRef = useRef();
  const [crop, setCrop] = useState({});

  const cropImageNow = () => {
    const image = imageRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    function base64ToFile(base64String, defaultFilename = "image") {
      const arr = base64String.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const extension = mimeToExtension(mime);
      const filename = defaultFilename + (extension ? `.${extension}` : "");

      return new File([u8arr], filename, { type: mime });
    }

    const newFile = base64ToFile(base64Image);
    croppedImage(newFile);
  };

  return (
    <>
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
        <img src={imageToCrop} alt="" ref={imageRef} />
      </ReactCrop>
      <Button appearance="primary" color="green" onClick={cropImageNow}>
        Save
      </Button>
    </>
  );
};

export default Cropper;