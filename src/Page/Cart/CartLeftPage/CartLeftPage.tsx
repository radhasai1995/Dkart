import { CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Styles from "../styles";
import * as Render from "./renderProps";


const CartLeftPage = (props: any) => {
  const {
    cartTransactionData = {},
    runOpenCartTransactionSocketMQTT = () => "",
    runCloseCartTransactionSocketMQTT = () => "",
    doGetCartTransactionData = () => "",
    setCartTransactionData = () => "",
    triggerBarcodeDetected = () => "",
    doTriggerRemoveItemFromCart = () => "",
    isCartSummaryLoading = false,
    setIsCartSummaryLoading = () => false,
    isSocketConnected = false,
    isCartHasUnknowProduct = false,
    doUpdateTransactionStatus = () => "",
    doResetTimer = () => "",
    doResetTriggerTimer = () => "",
    doTriggerInitTimer = () => "",
    doTriggerAddItemToCart = () => ""
  } = props || {};
  const {
    products: cartItems = [],
    totalQuantity = 0,
    cartPrice = "",
    totalTax = "",
    cartTotalPrice = "",
  } = cartTransactionData || {};
  const { t } = useTranslation();
  const showActivityStatus = true;
  const cartSummaryListFooterProps = {
    t,
    totalQuantity,
    cartPrice,
    totalTax,
    cartTotalPrice
  };
  const cartSummaryHeaderProps = {
    t,
    showActivityStatus,
    isCartSummaryLoading,
    isSocketConnected,
    setIsCartSummaryLoading,
    runCloseCartTransactionSocketMQTT,
    runOpenCartTransactionSocketMQTT,
    doGetCartTransactionData,
    setCartTransactionData,
    cartTransactionData,
    doUpdateTransactionStatus,
    doResetTimer,
    doResetTriggerTimer,
    doTriggerInitTimer,
  };
  return (
    <>
      {Render.renderBarcodeReaderKit({ triggerBarcodeDetected })}
      <Styles.StyledCard style={{ padding: "0 !important", position: "relative", }}>
        {Render.renderBackdropLoader({ isCartHasUnknowProduct })}
        <CardContent >
          <Styles.StyledCartSummaryWrapper >
            {Render.renderCartSummaryHeader(cartSummaryHeaderProps)}
            <Styles.StyledCartSummaryListWrapper >
              {cartItems && cartItems.map((item: any, key: number) => {
                const {
                  quantity = 0,
                  subtotalofferPrice = "",
                } = item || {};
                const productProps = {
                  ...item,
                  doTriggerRemoveItemFromCart,
                  doTriggerAddItemToCart,
                  triggerBarcodeDetected
                };
                const showInvertedBorderRadiusKit = key > 0 && key < cartItems.length - 1 ? true : false;
                return (
                  <Styles.StyledCartSummaryListItemWrapper key={key}>
                    <Styles.StyledCartSummaryListItem>
                      {Render.renderProductDetailKit(productProps)}
                      {Render.renderProductQtyKit({ quantity })}
                      {Render.renderProductPriceKit({ subtotalofferPrice })}
                    </Styles.StyledCartSummaryListItem>
                  </Styles.StyledCartSummaryListItemWrapper>
                );
              })}
              {cartItems && cartItems.length === 0 && (
                <>
                  {Render.renderEmptyListKit({})}
                </>
              )}
            </Styles.StyledCartSummaryListWrapper>
            {Render.renderCartSummaryListFooter(cartSummaryListFooterProps)}
          </Styles.StyledCartSummaryWrapper>

        </CardContent>
      </Styles.StyledCard>
    </>
  );
};

export default CartLeftPage;
export { CartLeftPage };
