'use client';

import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress'; // Assuming you have a Progress component from shadcn/ui
import { cn } from '@/lib/utils'; // For conditional class handling (if using shadcn/ui)
import { useUploadImage } from '@/hooks/use-upload-image';

export function ImageUpload() {
  const { image, uploading, progress, uploadImage } = useUploadImage();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  return (
    <>
      {/* Media Button */}
      <label className="relative cursor-pointer">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/*"
        />
        <Button
          className={cn(
            'text-[#1565D8] gap-[10px] p-0 cursor-pointer',
            uploading && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ImageIcon height={26} />
          <p className="text-[#1565D8] font-medium">Media</p>
        </Button>
      </label>
      {/* Image Upload Preview */}
      {image && (
        <div className="relative mt-4 w-40 h-40">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Progress value={progress} className="w-3/4" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
