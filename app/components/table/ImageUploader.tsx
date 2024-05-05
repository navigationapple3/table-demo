import React, { useState } from 'react';
import { supabase } from '../../db/supabase';
import { ProductInfo } from './types';
import { notification, Spin } from 'antd';
import { v4 } from 'uuid';
import { updateProductImage } from './service';

interface ImageUploaderProps extends React.HTMLAttributes<HTMLElement> {
  record: ProductInfo;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const { record } = props;

  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File) => {
    const filename = `${v4()}.${file.name.split('.').pop().toLowerCase()}`;

    setLoading(true);

    await supabase.storage.from("image_bucket").upload(`image/${filename}`, file);

    const location = `https://cchthoixdoriljajcpje.supabase.co/storage/v1/object/public/image_bucket/image/${filename}`;

    return location;
  };

  const handleImageClick = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
  
    fileInput.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const maxSize = 2 * 1024 * 1024;
        if (file.size >= maxSize) {
          notification.error({
            message: "File size exceeds the 2MB limit"
          })
          return;
        }


        const imageUrl = await uploadImage(file);

        if (imageUrl) {
          await updateProductImage(record.id, imageUrl);

          setLink(imageUrl);
          setLoading(false);
        }
      }
    });
    fileInput.click();
  };

  return record && record.id ? (
    <div onClick={handleImageClick}>
      <Spin spinning={loading}>
        <img src={link || record.imgUrl} alt="" />
      </Spin>
    </div>
  ) : <label htmlFor="file-upload">Click to upload image (2MB)</label>;
};

export default ImageUploader;
