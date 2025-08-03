import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TFileInputProps = {
  name: string;
  label?: string;
  rules?: object;
};

const FileInput = ({ name, label, rules }: TFileInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="mb-4">
      {label && <label className="block font-medium mb-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <div
              onClick={() =>
                document.getElementById(`${name}-file-input`)?.click()
              }
              className="cursor-pointer w-full p-2 border rounded bg-white border-gray-300 outline-0 px-3 text-gray-600 flex justify-center items-center"
              style={{ minHeight: "48px" }} // optional, to keep input height similar
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-32 object-cover"
                />
              ) : (
                <span className="flex items-center gap-5"> <UploadCloud/> Click to select image</span>
              )}
            </div>

            <input
              id={`${name}-file-input`}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  field.onChange(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </>
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name]?.message as string) || `${label || name} is required`}
        </p>
      )}
    </div>
  );
};

export default FileInput;
