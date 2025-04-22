import { FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextComponent } from "../components/input-text-component";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { ButtonComponent } from "../components/button-component";
import { useQueryClient } from "@tanstack/react-query";
import { Product, ProductCategory } from "../services/interface";
import { Card } from "primereact/card";
import { UserContextType, useUserHook } from "../context/user-context";
import { InputNumberComponent } from "../components/input-number-component";
import { InputSelectComponent } from "../components/input-select-component";
import { InputTextAreaComponent } from "../components/input-text-area-component";
import { useCreateProduct } from "../services/product-service";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";

const schema = yup.object({
  name: yup.string().required("You must enter product name"),
  description: yup.string().required("You must enter product description"),
  price: yup
    .number()
    .required("You must enter product price")
    .positive("Entered value shouldn't be less than 0"),
  quantity: yup
    .number()
    .required("You must enter the available product quantity")
    .integer()
    .positive("Entered value shouldn't be less than 0"),
  categoryType: yup
    .string()
    .required("You must select category type")
    .oneOf(["", ...Object.values(ProductCategory)], "Invalid Category Type"),
  imageUrl: yup.string().required("You must enter an image url"),
  rating: yup.number().required("Product Rating Is Required"),
});

/**
 * Represents the values for the registration form.
 *
 * @typedef CreateProductFormValues
 */
export type CreateProductFormValues = Omit<
  Product,
  "userId" | "categoryType"
> & { categoryType: string };

export const CreateProductForm = () => {
  const form = useForm({
    defaultValues: {
      categoryType: "",
      description: "",
      imageUrl: "",
      name: "",
      price: 0,
      quantity: 0,
      rating: 0,
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const userData = useUserHook() as UserContextType;

  const { register, handleSubmit, formState, control } = form;
  const { errors, isDirty, isSubmitting } = formState;
  const { mutateAsync } = useCreateProduct();
  const queryClient = useQueryClient();
  if (!userData?.loggedInUser?.userId) {
    return <UnAuthorizedLoginComponent />;
  }

  const onSubmit = async (data: CreateProductFormValues) => {
    const transformedData: Product = {
      ...data,
      userId: userData?.loggedInUser?.userId as number,
      categoryType: data.categoryType as ProductCategory,
    };
    mutateAsync(transformedData, {
      onSuccess: (response: Product) => {
        if (response) {
          queryClient.invalidateQueries({ queryKey: ["getProducts"] });
          toast(<ToastComponent title="Product Created Successfully" />);
        } else {
          throw new Error("Product creation failed");
        }
      },
      onError: (error: Error) => {
        throw new Error(JSON.stringify(error));
      },
    }).catch((error: Error) => {
      console.log("Error", error);
      toast(
        <ToastComponent
          text="Please check your details and try again"
          title="Product creation failed"
        />
      );
    });
  };
  // Handle Forms Errors If InValid
  const onError = (errors: FieldErrors<Product>) => {
    console.log("Error", errors);
    toast(<ToastComponent title="Please fix the errors in form" />);
  };

  return (
    <Card>
      <form
        id="form"
        className="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <InputTextComponent
          errors={errors}
          fieldName="name"
          register={register}
          type="text"
        />
        <InputSelectComponent
          control={control}
          fieldName="categoryType"
          errors={errors}
          options={Object.values(ProductCategory)}
        />
        <InputTextComponent
          errors={errors}
          fieldName="imageUrl"
          register={register}
          type="text"
        />
        <InputNumberComponent
          control={control}
          fieldName="quantity"
          errors={errors}
        />
        <InputNumberComponent
          control={control}
          fieldName="price"
          mode="currency"
          currencyCode="INR"
          errors={errors}
        />
        <InputNumberComponent
          control={control}
          fieldName="rating"
          errors={errors}
        />
        <InputTextAreaComponent
          errors={errors}
          fieldName="description"
          register={register}
        />
        <ButtonComponent
          buttonLabel="Create Product"
          disabled={!isDirty || isSubmitting}
          type="submit"
        />
      </form>
    </Card>
  );
};
