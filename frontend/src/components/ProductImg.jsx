import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const imageList = Array.isArray(images) ? images : [];
  const [mainImg, setMainImg] = useState(imageList[0]?.url || "");

  if (!imageList.length) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <div className="flex gap-5 w-max">
      <div className="gap-5 flex flex-col">
        {imageList.map((img, index) => (
          <img
            key={index}
            onClick={() => setMainImg(img.url)}
            src={img.url}
            alt={`Product Image ${index + 1}`}
            className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-gray-300"
          />
        ))}
      </div>
      <div className="w-96 h-96">
        <Zoom>
          <img
            src={mainImg}
            alt="Main Product"
            className="w-full h-full object-cover rounded-lg"
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ProductImg;
