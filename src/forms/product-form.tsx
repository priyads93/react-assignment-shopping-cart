import { FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextComponent } from "../components/input-text-component";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { ButtonComponent } from "../components/button-component";
import { useQueryClient } from "@tanstack/react-query";
import {
  Product,
  ProductCategory,
  ProductResponse,
} from "../services/interface";
import { Card } from "primereact/card";
import { UserContextType, useUserHook } from "../context/user-context";
import { InputNumberComponent } from "../components/input-number-component";
import { InputSelectComponent } from "../components/input-select-component";
import { InputTextAreaComponent } from "../components/input-text-area-component";
import {
  useCreateProduct,
  useUpdateProduct,
} from "../services/product-service";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";

const transformDataForMutation = (
  userId: number,
  data: ProductFormValues,
  dirtyFields: Partial<
    Readonly<{
      categoryType?: boolean | undefined;
      description?: boolean | undefined;
      imageUrl?: boolean | undefined;
      name?: boolean | undefined;
      price?: boolean | undefined;
      quantity?: boolean | undefined;
      rating?: boolean | undefined;
    }>
  >,
  product?: ProductResponse
) => {
  let transformedData: Product | Partial<Product> = {};
  if (product) {
    if (dirtyFields.categoryType && data.categoryType) {
      transformedData.categoryType = data.categoryType as ProductCategory;
    }
    if (dirtyFields.description && data.description) {
      transformedData.description = data.description;
    }
    if (dirtyFields.imageUrl && data.imageUrl) {
      transformedData.imageUrl = data.imageUrl;
    }
    if (dirtyFields.price && data.price) {
      transformedData.price = data.price;
    }
    if (dirtyFields.name && data.name) {
      transformedData.name = data.name;
    }
    if (dirtyFields.price && data.price) {
      transformedData.price = data.price;
    }
    if (dirtyFields.quantity && data.quantity) {
      transformedData.quantity = data.quantity;
    }
    if (dirtyFields.rating && data.rating) {
      transformedData.rating = data.rating;
    }
  } else {
    transformedData = {
      ...data,
      userUserId: userId,
      categoryType: data.categoryType as ProductCategory,
    };
  }
  return transformedData;
};

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
 * @typedef ProductFormValues
 */
export type ProductFormValues = Omit<Product, "userUserId" | "categoryType"> & {
  categoryType: string;
};

export type ProductFormProps = {
  product?: ProductResponse;
};

export const ProductForm = ({ product }: ProductFormProps) => {
  const form = useForm({
    defaultValues: product
      ? {
          categoryType: product.categoryType,
          description: product.description,
          imageUrl: product.imageUrl,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          rating: product.rating ?? 0,
        }
      : {
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
  const userId = userData?.loggedInUser?.userId;
  if (!userId) {
    return <UnAuthorizedLoginComponent />;
  }

  const { register, handleSubmit, formState, control } = form;
  const { errors, isDirty, isSubmitting, dirtyFields } = formState;
  // if product is present then we are editing the product details
  // else we are creating a new product
  const { mutateAsync } = product
    ? useUpdateProduct(`${product.productId}`)
    : useCreateProduct();
  const queryClient = useQueryClient();

  const onSubmit = async (data: ProductFormValues) => {
    const transformedData: Product | Partial<Product> =
      transformDataForMutation(userId, data, dirtyFields, product);

    mutateAsync(transformedData as Product, {
      onSuccess: (response: Product) => {
        const toastTitle = `Product ${product ? "Updated" : "Created"} Successfully`;
        if (response) {
          queryClient.invalidateQueries({ queryKey: ["getProducts"] });
          toast(<ToastComponent title={toastTitle} />);
        } else {
          throw new Error(
            `Product ${product ? "updation" : "creation"} failed`
          );
        }
      },
      onError: (error: Error) => {
        throw new Error(JSON.stringify(error));
      },
    }).catch((error: Error) => {
      console.log("Error", error);
      const toastTitle = `Product ${product ? "updation" : "creation"} failed`;
      toast(
        <ToastComponent
          text="Please check your details and try again"
          title={toastTitle}
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
        className="form"
        id="form"
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
          errors={errors}
          fieldName="categoryType"
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
          errors={errors}
          fieldName="quantity"
        />
        <InputNumberComponent
          control={control}
          currencyCode="INR"
          errors={errors}
          fieldName="price"
          mode="currency"
        />
        <InputNumberComponent
          control={control}
          errors={errors}
          fieldName="rating"
        />
        <InputTextAreaComponent
          errors={errors}
          fieldName="description"
          register={register}
        />
        <ButtonComponent
          buttonLabel={product ? "Update Product" : "Create Product"}
          disabled={!isDirty || isSubmitting}
          type="submit"
        />
      </form>
    </Card>
  );
};
