import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";

type TPHFormProps<T extends FieldValues = FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
} & UseFormProps<T>;

const Form = <T extends FieldValues = FieldValues>({
  onSubmit,
  children,
  ...formConfig
}: TPHFormProps<T>) => {
  const methods = useForm<T>(formConfig);

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
