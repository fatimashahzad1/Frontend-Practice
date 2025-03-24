import { Button } from "@/components/ui/button";
import { FORM_FIELD_NAMES } from "@/constants/form-fields";
import { useUploadImage } from "@/hooks/use-upload-image";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const ProfilePicture = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const { image, uploading, progress, uploadImage, removeImage, setImage } =
    useUploadImage();

  const formPictureUrl = useWatch({ name: FORM_FIELD_NAMES.PICTURE_URL });

  useEffect(() => {
    console.log({ formPictureUrl, image });
    if (formPictureUrl && !image) {
      setImage(formPictureUrl);
    }
    if (image) {
      setValue(FORM_FIELD_NAMES.PICTURE_URL, image, { shouldDirty: true });
    }
  }, [formPictureUrl, setValue, setImage, image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-14 max-md:mb-7">
      {/* Image Preview */}
      <div className="w-[150px] h-[150px] rounded-[30px] overflow-hidden border">
        {image ? (
          <Image
            src={image}
            alt="Profile"
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {uploading && (
        <p className="text-blue-500 text-sm">Uploading... {progress}%</p>
      )}

      {/* Error Message */}
      {errors[FORM_FIELD_NAMES.PICTURE_URL] && (
        <p className="text-red-500 text-sm">
          {errors[FORM_FIELD_NAMES.PICTURE_URL]?.message as string}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Button
          variant="outline"
          type="button"
          className="h-[49px] w-[178px] bg-[#1565D8] text-white"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Change Picture"}
        </Button>
        <Button
          className="h-[49px] w-[178px]"
          variant="outline"
          type="button"
          onClick={() => {
            removeImage();
            setValue(FORM_FIELD_NAMES.PICTURE_URL, "");
          }}
          disabled={!image || uploading}
        >
          Delete Picture
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicture;
