import { FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextComponent } from "../components/input-text-component";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { ButtonComponent } from "../components/button-component";
import { useQueryClient } from "@tanstack/react-query";
import {
  Address,
  Order,
  OrderResponse,
  OrderStatus,
  PaymentMode,
} from "../services/interface";
import { Card } from "primereact/card";
import { useUpdateOrder } from "../services/order-service";
import { InputTextAreaComponent } from "../components/input-text-area-component";
import { InputSelectComponent } from "../components/input-select-component";
import { InputNumberComponent } from "../components/input-number-component";
import { PhoneNumberComponent } from "../components/phone-number-component";
import { QUERY_KEYS, QUERY_KEYS_BASED_ON_ID } from "../utils/queryKeys";

export const orderSchema = yup.object({
  address: yup.object({
    fullName: yup.string().required("Your full name is required"),
    phoneNumber: yup.string().required("Your phone number is required"),
    addressLine1: yup.string().required("Your address line 1 is required"),
    addressLine2: yup.string().optional(),
    city: yup.string().required("Your city is required"),
    stateOrProvince: yup.string().required("Your state/province is required"),
    postalCode: yup.string().required("Your postal code is required"),
    country: yup.string().required("Your country is required"),
  }),
  description: yup.string().required("Description is required"),
  paymentMode: yup
    .string()
    .required("Payment mode is mandatory")
    .oneOf(
      [...Object.values(PaymentMode)],
      `Payment Mode should be one of ${Object.values(PaymentMode)}`
    ),
  orderStatus: yup
    .string()
    .required("Order status is mandatory")
    .oneOf(
      [...Object.values(OrderStatus)],
      `Order status should be one of ${Object.values(OrderStatus)}`
    ),
  totalCost: yup.number().required("Total cost in mandatory"),
});

export type CheckOutFormValues = Pick<Order, "description" | "totalCost"> & {
  address: Address;
  orderStatus: string;
  paymentMode: string;
};

type CheckOutFormProps = OrderResponse & { disabled: boolean };

/**
 *
 * This component renders a login form with fields for email and password.
 * It uses react-hook-form for form handling and validation with Yup.
 * The form includes error handling and displays a toast notification for errors.
 */
export const CheckOutForm = ({
  id,
  address,
  description,
  orderStatus,
  paymentMode,
  totalCost,
  disabled,
}: CheckOutFormProps) => {
  const form = useForm({
    defaultValues: {
      address: address ?? {
        fullName: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateOrProvince: "",
        postalCode: "",
        country: "",
      },
      description: description,
      orderStatus: orderStatus,
      paymentMode: paymentMode,
      totalCost: totalCost,
    },
    mode: "onSubmit",
    disabled,
    resolver: yupResolver(orderSchema),
  });

  const { register, handleSubmit, control, formState } = form;
  const { errors, isDirty, isSubmitting } = formState;
  const { mutateAsync } = useUpdateOrder(`${id}`);
  const queryClient = useQueryClient();

  const onSubmit = async (data: CheckOutFormValues) => {
    mutateAsync(
      {
        ...data,
        orderStatus: data.orderStatus as OrderStatus,
        paymentMode: data.paymentMode as PaymentMode,
      },
      {
        onSuccess: (response: OrderResponse) => {
          if (response) {
            toast(
              <ToastComponent title="Order details updated successfully" />
            );
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS_BASED_ON_ID(QUERY_KEYS.ORDER, `${id}`)],
            });
          } else {
            throw new Error("Order details failed to update");
          }
        },
        onError: (error: Error) => {
          throw error;
        },
      }
    ).catch((error: Error) => {
      console.log("Error", error);
      toast(
        <ToastComponent
          text="Please check your order details and try again"
          title="Order Update Failed"
        />
      );
    });
  };

  // Handle Forms Errors If InValid
  const onError = (errors: FieldErrors<CheckOutFormValues>) => {
    console.log("Error", errors);
    toast(<ToastComponent title="Please fix the errors in form" />);
  };

  return (
    <Card footer={<></>} title="Check Out Details">
      <form
        className="form"
        id="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <InputTextComponent
          errors={errors}
          fieldName="address.fullName"
          register={register}
          type="text"
        />
        <PhoneNumberComponent
          errors={errors}
          fieldName="address.phoneNumber"
          control={control}
        />
        <InputTextComponent
          errors={errors}
          fieldName="address.addressLine1"
          register={register}
          type="text"
        />
        <InputTextComponent
          errors={errors}
          fieldName="address.addressLine2"
          register={register}
          type="text"
        />

        <div  className="form-inputs-group">
          <InputTextComponent
            errors={errors}
            fieldName="address.city"
            register={register}
            type="text"
          />
          <InputTextComponent
            errors={errors}
            fieldName="address.postalCode"
            register={register}
            type="text"
          />
        </div>
        <div className="form-inputs-group">
          <InputTextComponent
            errors={errors}
            fieldName="address.stateOrProvince"
            register={register}
            type="text"
          />
          <InputTextComponent
            errors={errors}
            fieldName="address.country"
            register={register}
            type="text"
          />
        </div>
        <InputTextAreaComponent
          errors={errors}
          fieldName="description"
          register={register}
        />
        <InputSelectComponent
          errors={errors}
          fieldName="paymentMode"
          options={Object.values(PaymentMode)}
          control={control}
        />
        <InputTextComponent
          errors={errors}
          fieldName="orderStatus"
          register={register}
          type="text"
          disabled={true}
        />
        <InputNumberComponent
          errors={errors}
          fieldName="totalCost"
          control={control}
          disabled={true}
        />
        {disabled ? (
          <></>
        ) : (
          <ButtonComponent
            buttonLabel="Update Order Details"
            disabled={!isDirty || isSubmitting}
            type="submit"
          />
        )}
      </form>
    </Card>
  );
};
