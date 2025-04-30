import { Suspense, useState } from "react";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";
import { UserContextType, useUserHook } from "../context/user-context";
import { isUserDataValid } from "../utils/isUserDataValid";
import { ErrorComponent } from "../components/error-component";
import { useParams } from "react-router";
import {
  AccountType,
  ProductResponse,
  Specifications,
} from "../services/interface";
import { ButtonComponent } from "../components/button-component";
import { useGetProduct } from "../services/product-service";
import { ImageComponent } from "../components/image-component";
import { RatingComponent } from "../components/rating-component";
import { Divider } from "primereact/divider";
import { DataTableValueArray } from "primereact/datatable";
import { DataTableComponent } from "../components/data-table-component";
import DialogComponent from "../components/dialog-component";
import { ProductForm } from "../forms/product-form";
import {
  useCreateCartItem,
  useUpdateCartItem,
} from "../services/cart-item-service";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { getErrorMessage } from "../utils/getErrorMessage";

export const ProductInfoPage = () => {
  const { id: productId } = useParams<{ id: string }>();

  if (!productId) {
    return <ErrorComponent errorMessage="Some issue please check out later" />;
  }

  const {
    loggedInUser: userData,
    setCartItems,
    cartItems,
  } = useUserHook() as UserContextType;

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productSelected, setProductSelected] = useState<
    ProductResponse | undefined
  >(undefined);

  if (!isUserDataValid(userData)) {
    return <UnAuthorizedLoginComponent />;
  }

  const { mutateAsync: mutateAsyncCreateCartItem } = useCreateCartItem();
  const { mutateAsync: mutateAsyncUpdateCartItem } = useUpdateCartItem();

  const {
    data: productDetails,
    isLoading,
    isError,
    error,
  } = useGetProduct<ProductResponse>(`${productId}`);

  if (isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }

  if (isError) {
    return <ErrorComponent errorMessage={`${error?.message}`} />;
  }
  if (!productDetails) {
    return <ErrorComponent errorMessage="Please refresh page" />;
  }

  const productSpecifications: DataTableValueArray = Object.entries(
    productDetails?.specifications ?? {}
  ).map(([name, value]) => ({ name, value }));

  const handleSetVisible = () => {
    setIsDialogVisible(false);
  };

  const handleUpdateProduct = () => {
    setIsEditMode(true);
    setIsDialogVisible(true);
    setProductSelected(productDetails);
  };

  const handleAddToCartClick = (productId: number) => {
    try {
      const alreadyExisting = cartItems.find(
        (item) => item.productId.toString() === productId.toString()
      );
      if (alreadyExisting) {
        mutateAsyncUpdateCartItem(
          {
            id: `${alreadyExisting.id}`,
            quantity: alreadyExisting.quantity + 1,
          },
          {
            onSuccess: (responseData) => {
              setCartItems(
                cartItems.map((cartItem) => {
                  if (cartItem.productId === productId) {
                    return {
                      ...cartItem,
                      quantity: alreadyExisting.quantity + 1,
                    };
                  }
                  return cartItem;
                })
              );
              toast(
                <ToastComponent title="Added Items To The Cart. Please proceed to cart page for checkout" />
              );
            },
            onError: (error) => {
              throw error;
            },
          }
        );
      } else {
        mutateAsyncCreateCartItem(
          { productId: productId, quantity: 1, userId: userData.id },
          {
            onSuccess: (responseData) => {
              setCartItems([
                ...cartItems,
                {
                  id: responseData.id,
                  productId: productId,
                  quantity: 1,
                  userId: userData.id,
                },
              ]);
              toast(
                <ToastComponent title="Added Items To The Cart. Please proceed to cart page for checkout" />
              );
            },
            onError: (error) => {
              throw error;
            },
          }
        );
      }

    } catch (error) {
      toast(
        <ToastComponent
          text={getErrorMessage(error)}
          title="Error while adding item to the cart"
        />
      );
      console.error(error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DialogComponent
        handleSetVisible={handleSetVisible}
        header={isEditMode ? "Update Product" : "Create Product"}
        isVisible={isDialogVisible}
      >
        <ProductForm product={isEditMode ? productSelected : undefined} />
      </DialogComponent>
      <div className="product-info">
        <div className="product-info-image">
          <ImageComponent
            height="250rem"
            width="250rem"
            loading="lazy"
            src={productDetails?.imageUrl}
          />
        </div>
        <div className="product-info-details">
          <h1>{productDetails.name}</h1>
          <RatingComponent rating={productDetails.rating} />
          <Divider />
          <h3>{productDetails.price}</h3>

          {productSpecifications && productSpecifications.length > 0 && (
            <DataTableComponent
              data={productSpecifications}
              columns={[
                { field: "name", header: "Name", key: "name" },
                { field: "value", header: "Value", key: "value" },
              ]}
            />
          )}
          {userData.accountType === AccountType.SELLER &&
            productDetails.userId === userData.id && (
              <ButtonComponent
                buttonLabel="Update Product Details"
                disabled={false}
                type="submit"
                icon="pi-user-edit"
                onClick={handleUpdateProduct}
              />
            )}
          {userData.accountType === AccountType.BUYER && (
            <ButtonComponent
              buttonLabel="Add to cart"
              disabled={productDetails.quantity <= 0}
              type="submit"
              icon="pi-user-edit"
              onClick={() => handleAddToCartClick(productDetails.id)}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
};
