import { CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import useProductsStates from "./useProductsPage";
import {
  StyledCard,
  StyledDiv,
  StyledToolbar,
  StyledToolbarTypography,
  StyledCreateButton,
} from "./styles";
import * as IconGallery from "@iconsGallery";
import * as ComponentLib from "@componentLib";
import { useProductsFixture } from "./fixtures";

const Products = (props: any) => {
  const ProductsStates = useProductsStates();
  const { t } = useTranslation();
  const {
    getProductPageDetails,
    totalProductRecords,
    productsList,
    onHandleProductsPaginationChange,
    onHandleRowsDpChange,
    onHandleCreateProductBtn,
    onHandleEditProduct,
    isLoading,
    getCRUD_Operation = {},
    productsColumns = [],
  } = ProductsStates;
  const { columns = [] } = useProductsFixture({ t });
  const { allow: isCRUD_allowed = false } = getCRUD_Operation as any;
  const productProps = {
    rowsPerPage: getProductPageDetails?.rowsPerPage,
    page: getProductPageDetails?.currentPage,
    totalDocs: totalProductRecords,
    list: productsList,
    onHandleChangePage: onHandleProductsPaginationChange,
    onHandleChangeRowsPerPage: onHandleRowsDpChange,
    onHandleCreateProductBtn,
    onHandleEdit: onHandleEditProduct,
    columns: productsColumns,
    isLoading: isLoading,
  };

  return (
    <>
      <StyledCard>
        <CardContent>
          <StyledDiv>
            <StyledToolbar>
              <StyledToolbarTypography variant="h5">
                {t("PRODUCT_PAGE_TITLE")}
              </StyledToolbarTypography>
              {/* <IconGallery.PrinterIcon /> */}
              <StyledCreateButton
                startIcon={<IconGallery.CreateAddIcon />}
                variant="contained"
                disabled={!isCRUD_allowed}
                onClick={() => onHandleCreateProductBtn()}
              >
                {t("PRODUCT_CREATE_BUTTON")}
              </StyledCreateButton>
            </StyledToolbar>
            <ComponentLib.Table {...productProps} />
          </StyledDiv>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default Products;
export { Products };
