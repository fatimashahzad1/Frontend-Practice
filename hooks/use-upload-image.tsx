import { useState, useCallback, useMemo } from 'react';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export function useUploadImage() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const uploadImage = useCallback(async (file: File) => {
    if (!file) {
      return;
    }

    const uniqueUploadId = `uqid-${Date.now()}`;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let currentChunk = 0;

    setUploading(true);
    setProgress(0);

    const uploadChunk = (start: number, end: number) => {
      const formData = new FormData();
      formData.append('file', file.slice(start, end));
      formData.append('cloud_name', CLOUD_NAME!);
      formData.append('upload_preset', UPLOAD_PRESET!);

      const contentRange = `bytes ${start}-${end - 1}/${file.size}`;
      const xhr = new XMLHttpRequest();

      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
      );

      // Set headers
      xhr.setRequestHeader('X-Unique-Upload-Id', uniqueUploadId);
      xhr.setRequestHeader('Content-Range', contentRange);

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        console.log('chunk size in progress==', CHUNK_SIZE);
        if (event.lengthComputable) {
          const chunkProgress = Math.round(
            ((currentChunk * CHUNK_SIZE + event.loaded) / file.size) * 100
          );
          setProgress(chunkProgress);
          console.log('Upload Progress:', chunkProgress, '%');
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          currentChunk++;
          console.log('complete');
          setProgress(Math.round((currentChunk / totalChunks) * 100));

          if (currentChunk < totalChunks) {
            const nextStart = currentChunk * CHUNK_SIZE;
            const nextEnd = Math.min(nextStart + CHUNK_SIZE, file.size);
            uploadChunk(nextStart, nextEnd);
          } else {
            setUploadComplete(true);
            setUploading(false);

            const response = JSON.parse(xhr.responseText);
            setImage(response.secure_url);
            console.info('File upload complete.');
          }
        } else {
          console.error('Upload failed:', xhr.responseText);
          setUploading(false);
        }
      };

      xhr.onerror = (e) => {
        console.error('Error uploading chunk:', e);
        setUploading(false);
      };

      xhr.send(formData);
    };

    // Start the first chunk upload
    uploadChunk(0, Math.min(CHUNK_SIZE, file.size));
  }, []);

  const removeImage = useCallback(() => {
    setImage(null);
    setUploading(false);
    setProgress(0);
    setUploadComplete(false);
  }, []);

  return useMemo(
    () => ({
      image,
      uploading,
      progress,
      uploadComplete,
      uploadImage,
      removeImage,
    }),
    [image, uploading, progress, uploadComplete, uploadImage, removeImage]
  );
}
