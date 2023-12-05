import { Grid, Backdrop } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CartRightPage } from "./CartRightPage";
import { CartLeftPage } from "./CartLeftPage";
import { ChoosePaymentType } from "./ChoosePaymentType";
import { useCartStates } from "./useCartStates";
import {
  StyledCartMainGrid,
  StyledPayButton,
  StyledCartSubMainGrid,
  StyledCartRightPage,
  StyledCartLeftPage,
  StyledTimerBox,
} from "./styles";
import * as IconGallery from "@iconsGallery";
import * as ComponentLib from "@componentLib";
import * as Utils from "@utils";
import * as GlobalFixture from "@globalFixture";
import * as Constants from "@constants";


const Cart = () => {
  const { t } = useTranslation();
  const {
    cartTransactionData = {},
    setCartTransactionData = () => "",
    isCartHasUnknowProduct = false,
    setIsCartHasUnknowProduct = () => false,
    onHandleClickPay = () => "",
    runOpenCartTransactionSocketMQTT = () => "",
    runCloseCartTransactionSocketMQTT = () => "",
    doGetCartTransactionData = () => "",
    triggerCloseTransaction = () => "",
    triggerBarcodeDetected = () => "",
    doInitTimer = () => "",
    doResetTimer = () => "",
    timerSeconds = 0,
    setTimerSeconds = () => "",
    doTriggerInitTimer = () => "",
    myTriggerTimerInterval = null,
    isTimerStarted = false,
    doTriggerRemoveItemFromCart = () => "",
    doTriggerAddItemToCart = () => "",
    navigateTo = () => "",
    isBackdropLoading = false,
    setIsBackdropLoading = () => false,
    isCartSummaryLoading = false,
    setIsCartSummaryLoading = () => false,
    isSocketConnected = false,
    isPayClickLoading = false,
    paymentTimerMinutes = 0,
    paymentTimerSeconds = 30,
    globalAppStates = {},
    //cancelPaymentProcess = () => "",
    timerMinutes,
    isCancelPayLoading = false,
    productLoading,
    productLoadingTimer,
    doCancelHeartlandPayment = () => "",
    setisCancelPayLoading = () => false,
    doResetPaymentTimer = () => "",
    paymentInitTimerInterval = null,
    isCancelPaymentHidden,
    setIsCancelPaymentHidden,
    getPayLaterInfo,
    setPayLaterInfo,
    doCancelChoosePaymentType = () => "",
    doProceedChoosePaymentType = () => "",
    isPms,
    setIsPms,
    plErrorMessage,
    setPLErrorMessage,
    plProcessing,
    doUpdateTransactionStatus = () => "",
    doResetTriggerTimer = () => "",
    doHeartLandInitializeConnect = () => "",
    setIsPayClickLoadingLoading = () => "",
    setIsSocketConnected = () => "",
    doStartCancelPaymentIntent = () => "",
    cancelPaymentCBK = () => "",
  } = useCartStates();

  const { products: cartItems = [] } = cartTransactionData || {};
  const isReadyToPay =
    cartItems && cartItems.length > 0 && !isCartHasUnknowProduct;
  let cartScreenProps = {
    cartTransactionData,
    isCartHasUnknowProduct,
    isReadyToPay,
    onHandleClickPay,
    runOpenCartTransactionSocketMQTT,
    runCloseCartTransactionSocketMQTT,
    doGetCartTransactionData,
    setCartTransactionData,
    triggerCloseTransaction,
    triggerBarcodeDetected,
    doTriggerRemoveItemFromCart,
    doTriggerAddItemToCart,
    navigateTo,
    setIsBackdropLoading,
    isCartSummaryLoading,
    setIsCartSummaryLoading,
    isSocketConnected,
    isPayClickLoading,
    doCancelHeartlandPayment,
    doUpdateTransactionStatus,
    doResetTimer,
    doResetTriggerTimer,
    doTriggerInitTimer,

  };
  const { getPaymentType = "" } = globalAppStates as any;
  const { paymentGateway = "" } = Utils.getStorage() || {};
  const paymentTimerProps = {
    onUpdateBack: () => {
      if (paymentGateway === GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.STRIPE_GATEWAY) {
        setisCancelPayLoading(true);
        doStartCancelPaymentIntent({
          cbk: (responseProps: any) => {
            cancelPaymentCBK(responseProps);
          },
        });
      } else {
        if (paymentInitTimerInterval.current) {
          clearInterval(paymentInitTimerInterval.current);
        }
        setisCancelPayLoading(true);
        const { heartLandIpAddress = "" } = Utils?.getStorage() || {};
        doCancelHeartlandPayment({
          cbk: (responseProps: any) => {
            setIsPayClickLoadingLoading(false);
            setIsBackdropLoading(false);
            setisCancelPayLoading(false);
            runCloseCartTransactionSocketMQTT();
            doResetPaymentTimer();
            doResetTimer();
            doResetTriggerTimer();
            doUpdateTransactionStatus({
              status: false,
              cbk: (responseProps: any) => {
                const { status = "" } = responseProps || {};
                if (status === GlobalFixture.API_FIXTURE_CONTENTS.API_SUCCESS_STATUS) {
                  runOpenCartTransactionSocketMQTT(true);
                }
                else {
                  setIsSocketConnected(false);
                }
              },
            });
            doTriggerInitTimer({
              flowMessageFrom: "cancel heartland payment << cbk",
              isPayClickLoadingL: false,
            });
          }
        })
        doHeartLandInitializeConnect({
          ipAddress: heartLandIpAddress,
          port: Constants.HEART_LAND_CONNECT_PORT,
          cbk: (responseProps: any) => { }
        })
      }
    },
    timer: `${paymentTimerSeconds}`,
    paymentGateway: getPaymentType || paymentGateway,
    isCancelPayLoading,
    isCancelPaymentHidden,
    setIsCancelPaymentHidden,
  };
  const choosePaymentTypeProps = {
    data: cartTransactionData,
    getPayLaterInfo,
    setPayLaterInfo,
    plErrorMessage,
    setPLErrorMessage,
    plProcessing,
    onUpdate: (innPropsKit: any) => {
      const { name = "" } = innPropsKit || {};
      if (name === "proceed") {
        doProceedChoosePaymentType();
      } else {
        doCancelChoosePaymentType();
      }
    },
  };
  return (
    <>
      {isBackdropLoading && (
        <Backdrop
          sx={{
            color: "var(--white)",
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={isBackdropLoading}
        >
          {isPayClickLoading ? (
            <ComponentLib.HoldPay {...paymentTimerProps} />
          ) : (
            <IconGallery.CircleLoading />
          )}
        </Backdrop>
      )}

      {!isPms ? (
        <StyledCartMainGrid>
          <StyledCartSubMainGrid>
            <StyledCartRightPage>
              <CartRightPage {...cartScreenProps} />
            </StyledCartRightPage>
            <StyledCartLeftPage>
              <CartLeftPage {...cartScreenProps} />
            </StyledCartLeftPage>
          </StyledCartSubMainGrid>
        </StyledCartMainGrid>
      ) : (
        <ChoosePaymentType {...choosePaymentTypeProps} />
      )}
      <StyledTimerBox>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            position: "fixed",
            width: "300px",
            height: "300px",
            bottom: "calc(10% - 42px)",
            borderRadius: "300px",
            alignSelf: "center",
            left: "calc(40% - 50px)",
            backgroundColor:
              timerSeconds > 14
                ? "#C25088"
                : timerSeconds < 6
                  ? "#EB5E5E"
                  : "#EBA330",
            transition: "all 450ms ease",
            transform: `translateY(${isTimerStarted ? "300" : "600"}px)`,
            animation: isTimerStarted ? `arrowIcon2 750ms linear infinite` : ``,
          }}
        >
          <ComponentLib.Timer
            initMinutes={timerMinutes}
            initSeconds={timerSeconds}
          />
        </Grid>
        <>
          {!isPayClickLoading && !isPms ? (
            <>
              {" "}
              {isReadyToPay && (
                <Grid className="cls-dkph-payment-wrapper">
                  <StyledPayButton
                    variant="outlined"
                    onClick={onHandleClickPay}
                    endIcon={
                      <IconGallery.IArrowForwardIcon
                        className="cls-paybutton-button-icon"
                        style={{ color: "#ffffffd1" }}
                      />
                    }
                  >
                    {t("CART_LITERAL_PAY_BUTTON_TITLE")}
                  </StyledPayButton>
                </Grid>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      </StyledTimerBox>
    </>
  );
};

export default Cart;
export { Cart };
