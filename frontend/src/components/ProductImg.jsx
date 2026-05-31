import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const imageList = Array.isArray(images) ? images : [];
  const [mainImg, setMainImg] = useState(imageList[0]?.url || "");

  if (!imageList.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">

      {/* THUMBNAILS */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
        {imageList.map((img, index) => (
          <img
            key={index}
            onClick={() => setMainImg(img.url)}
            src={img.url}
            className="h-14 w-14 min-w-[3.5rem] rounded-lg border object-cover cursor-pointer hover:opacity-80 sm:h-16 sm:w-16 sm:min-w-[4rem]"
          />
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-lg bg-gray-50 shadow-sm">
        <Zoom>
          <img
            src={mainImg}
            className="h-full w-full object-contain rounded-xl bg-white"
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ProductImg;