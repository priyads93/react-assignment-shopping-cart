import { ImageComponent } from "./image-component";
import { AccountType, CategoryType } from "../services/interface";
import { Panel } from "primereact/panel";
import { RatingComponent } from "./rating-component";
import { InputNumber } from "primereact/inputnumber";
import { ButtonComponent } from "./button-component";
import { TagComponent } from "./tag-component";

type ListItemTemplateProps = {
  imageUrl: string;
  description: string;
  name: string;
  rating?: number;
  categoryType: CategoryType;
  price: number;
  quantity?: number;
  handleModifyQuantity?: (productId: number, value: number) => void;
  handleUpdateButtonClick?: (productId: number) => void;
  handleAddToCartButtonClick?: (productId: number) => void;
  handleOpenDetailsPage?: () => void;
  id: number;
  accountType?: AccountType;
  severityData?: {
    inventoryStatus: string;
    severity: "success" | "warning" | "danger" | null;
  };
};

const ListItemComponent = ({
  imageUrl,
  description,
  name,
  rating,
  categoryType,
  price,
  quantity,
  id,
  accountType,
  severityData,
  handleModifyQuantity,
  handleUpdateButtonClick,
  handleAddToCartButtonClick,
  handleOpenDetailsPage,
}: ListItemTemplateProps) => {
  return (
    <div className="list-item">
      <div className="list-item-image" id="list-item-image" onClick={handleOpenDetailsPage}>
        <ImageComponent height="60" loading="lazy" src={imageUrl} width="60" />
      </div>
      <div className="list-item-details">
        <h3 style={{ margin: "0" }}>{name}</h3>
        <Panel>{description}</Panel>
        <RatingComponent rating={rating} />
        <span className="list-item-category">
          <i className="pi pi-tag product-category-icon" />
          <span>{categoryType}</span>
        </span>
      </div>
      <div className="list-item-button">
        <span>₹{price}</span>
        {quantity && handleModifyQuantity && (
          <InputNumber
            buttonLayout="vertical"
            decrementButtonIcon="pi pi-minus"
            incrementButtonIcon="pi pi-plus"
            onValueChange={(e) => handleModifyQuantity(id, e.value ?? quantity)}
            showButtons
            style={{ width: "2rem", alignContent: "center" }}
            value={quantity}
          />
        )}
        {accountType === AccountType.SELLER ? (
          <ButtonComponent
            buttonLabel="Update Item"
            disabled={false}
            id={`${id}`}
            onClick={handleUpdateButtonClick}
            type="submit"
          />
        ) : null}
        {accountType === AccountType.BUYER ? (
          <ButtonComponent
            buttonLabel="Add to Cart"
            disabled={quantity === 0}
            icon="pi pi-shopping-cart"
            id={`${id}`}
            onClick={handleAddToCartButtonClick}
            type="submit"
          />
        ) : null}
        {severityData && <TagComponent data={severityData} />}
      </div>
    </div>
  );
};

export default ListItemComponent;
