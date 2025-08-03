import { Controller, useFormContext } from "react-hook-form";

type TInputFieldProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
};

const Input = ({ name, label, type = "text", placeholder }: TInputFieldProps)  => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      {label && <label className="block font-medium mb-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={{ required: `${label || name} is required` }}
        render={({ field }) => (
          <input
            type={type}
            {...field}
            placeholder={placeholder}
            className="w-full p-2 border rounded bg-white border-gray-300 outline-0 px-3 text-gray-600"
          />
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
