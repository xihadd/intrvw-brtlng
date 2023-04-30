import React from "react";
import Image from "next/image";

type ProductGalleryProps = {
    media: Media[]
}

type Media = {
    type: string;
    url: string;
}

const ProductGallery = ({ media } : ProductGalleryProps) => {
    return (
        <>
        <h4 className="uppercase text-xl font-medium mb-2">Gallery</h4>
        <div className="flex flex-row flex-wrap">
          {media.map((img:Media) =>
            (img.type === "IMAGE" ? (
              <Image
                key={img.url}
                src={img.url}
                alt={''}
                width={500}
                height={500}
                className="w-1/2 sm:w-1/4 mx-auto p-1"
              />
            ) : undefined
          ))}
        </div>
        </>
    )
}
export default ProductGallery;