import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  name: string;
  label?: string;
  options: Option[];
};

const SelectField = ({ name, label, options }: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      {label && (
        <label className="block  font-medium text-black  mb-1">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required: `${label || name} is required` }}
        render={({ field }) => (
          <select
            {...field}
            className="w-full p-2 border bg-white rounded outline-0 border-gray-300"
          >
            <option value="">Select {label || name}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
