import { Suspense, useState } from "react";
import { ListComponent } from "../components/list-component";
import { useGetProducts } from "../services/product-service";
import { ProductItemTemplate } from "../components/product-item-template";
import {
  AccountType,
  ProductResponse,
  UserResponse,
} from "../services/interface";
import { ButtonComponent } from "../components/button-component";
import { ProductForm } from "../forms/product-form";
import DialogComponent from "../components/dialog-component";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";
import { ErrorComponent } from "../components/error-component";
import { UserContextType, useUserHook } from "../context/user-context";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { isUserDataValid } from "../utils/isUserDataValid";
import {
  useCreateCartItem,
  useUpdateCartItem,
} from "../services/cart-item-service";
import { useNavigate } from "react-router";

export const ProductsPage = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productSelected, setProductSelected] = useState<
    ProductResponse | undefined
  >(undefined);

  const {
    loggedInUser: userData,
    setCartItems,
    cartItems,
  } = useUserHook() as UserContextType;

  if (!isUserDataValid(userData)) {
    return <UnAuthorizedLoginComponent />;
  }

  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncCreateCartItem } = useCreateCartItem();
  const { mutateAsync: mutateAsyncUpdateCartItem } = useUpdateCartItem();

  const userIdForRetrievingProducts =
    userData.accountType === AccountType.SELLER ? userData.id.toString() : "";
  const getProducts = useGetProducts(userIdForRetrievingProducts);
  if (getProducts.isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }

  if (getProducts.isError) {
    return <ErrorComponent errorMessage={`${getProducts.error?.message}`} />;
  }

  const handleSetVisible = () => {
    setIsDialogVisible(false);
  };

  const handleUpdateButtonClick = (productId: number) => {
    setIsEditMode(true);
    setIsDialogVisible(true);
    setProductSelected(
      getProducts?.data?.find((item: ProductResponse) => item.id === productId)
    );
  };

  const handleOpenDetailsPageClick = (productId: number) => {
    navigate(`/product-info/${productId}`);
  };

  const handleAddToCartClick = (productId: number) => {
    try {
      const alreadyExisting = cartItems.find(
        (item) => item.productId === productId
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
          text={error as string}
          title="Error while adding item to the cart"
        />
      );
      console.error(error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="product-list" id="product-list">
        {userData.accountType === AccountType.SELLER ? (
          <>
            <ButtonComponent
              buttonLabel="Create Product"
              disabled={false}
              icon="pi pi-external-link"
              onClick={() => setIsDialogVisible(true)}
              type="button"
            />
            <DialogComponent
              handleSetVisible={handleSetVisible}
              header={isEditMode ? "Update Product" : "Create Product"}
              isVisible={isDialogVisible}
            >
              <ProductForm product={isEditMode ? productSelected : undefined} />
            </DialogComponent>
          </>
        ) : null}

        <ListComponent
          data={getProducts.data}
          emptyMessage="No Products, Click on create product to start listing them"
          footer={<></>}
          header="List Of Products"
          itemTemplate={(item: ProductResponse) =>
            ProductItemTemplate(
              item,
              userData as UserResponse,
              handleUpdateButtonClick,
              handleAddToCartClick,
              handleOpenDetailsPageClick
            )
          }
        />
      </div>
    </Suspense>
  );
};
