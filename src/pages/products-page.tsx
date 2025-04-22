import { Suspense, useCallback, useState } from "react";
import { ListComponent } from "../components/list-component";
import { useGetProducts } from "../services/product-service";
import { ProductItemTemplate } from "../components/product-item-template";
import { AccountType, Product, UserResponse } from "../services/interface";
import { ButtonComponent } from "../components/button-component";
import { CreateProductForm } from "../forms/create-product-form";
import DialogComponent from "../components/dialog-component";
import { UserContextType, useUserHook } from "../context/user-context";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";

export const ProductsPage = () => {
  const [visible, setVisible] = useState(false);

  const handleSetVisible = useCallback(() => {
    setVisible(false);
  }, []);
  const userData = useUserHook() as UserContextType;
  if (!userData?.loggedInUser || !userData.loggedInUser.userId) {
    return <UnAuthorizedLoginComponent />;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div id="product-list" className="product-list">
        {userData.loggedInUser.accountType === AccountType.seller && (
          <>
            <ButtonComponent
              type="button"
              buttonLabel="Create Product"
              icon="pi pi-external-link"
              disabled={false}
              onClick={() => setVisible(true)}
            />
            <DialogComponent
              header="Create Product"
              visible={visible}
              handleSetVisible={handleSetVisible}
            >
              <CreateProductForm />
            </DialogComponent>
          </>
        )}
        <ListComponent
          itemTemplate={(item: Product) =>
            ProductItemTemplate(item, userData.loggedInUser as UserResponse)
          }
          listQuery={useGetProducts(
            userData.loggedInUser.accountType === AccountType.seller
              ? userData.loggedInUser.userId.toString()
              : ""
          )}
          emptyMessage="No Products, Click on create product to start listing them"
          header="List Of Products"
          footer={
            <ButtonComponent
              type="button"
              buttonLabel="Load"
              icon="pi pi-plus"
              disabled={false}
            ></ButtonComponent>
          }
        />
      </div>
    </Suspense>
  );
};
