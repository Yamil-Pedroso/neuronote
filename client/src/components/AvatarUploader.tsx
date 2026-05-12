import { useRef, useState } from "react";
import { useAuth } from "../lib/hooks/useAuth";

export function AvatarUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { user, updateAvatar } = useAuth();

  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (file: File) => {
    setPreview(URL.createObjectURL(file));

    try {
      setIsUploading(true);
      await updateAvatar(file);
    } finally {
      setIsUploading(false);
    }
  };

  const imageSrc = preview || user?.avatar_url || null;

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (file) {
          handleFile(file);
        }
      }}
      className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-6 border-[#6FA98B] bg-zinc-900 text-sm text-zinc-400"
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Avatar preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <span>Upload avatar</span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleFile(file);
          }
        }}
      />

      {isUploading && (
        <span className="absolute rounded bg-black/70 px-2 py-1 text-xs text-white">
          Uploading...
        </span>
      )}
    </div>
  );
}
