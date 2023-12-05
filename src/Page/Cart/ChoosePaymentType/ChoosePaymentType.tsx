import { Typography, Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  renderPaymentTypeHeader,
  renderImmediatePayBodyContent,
  renderLaterPayBodyContent,
} from "./renderProps";
import * as Styles from "./styles";
import _ from "lodash";
import { useEffect } from "react";
const ChoosePaymentType = (props: any) => {
  const {
    getChosenPaymentType = {},
    setChosenPaymentType = () => {},
    onHandleClickChoosePaymentType = () => "",
    getPayLaterInfo = [],
    setPayLaterInfo = () => "",
    onUpdate = () => "",
    data = {},
    plErrorMessage,
    setPLErrorMessage,
    plProcessing,
  } = props;

  const { t } = useTranslation();

  const { cartTotalPrice = "0", totalQuantity = "0" } = data || {};

  const isButtonDisableKit = getPayLaterInfo.filter((itm: any) => itm.selected);
  const [_isButtonDisable = {}] = isButtonDisableKit || [];
  const { name = "" } = _isButtonDisable || {};

  useEffect(() => {
    setPLErrorMessage('');
  },[]);

  let isButtonDisable = false;
  if (name === "payLater") {
    const { form = {} } = _isButtonDisable;
    const { lastName = "", roomNo = "" } = form;
    let getValue = [lastName, roomNo];

    if (lastName.length > 0 && roomNo.length > 0) {
      isButtonDisable = false;
    } else {
      isButtonDisable = true;
    }
  } else {
    isButtonDisable = false;
  }
  return (
    <Styles.StyledChoosePaymentMainWrapper>
      <Styles.StyledChoosePaymentHeader>
        <Styles.StyledChoosePaymentHeaderRight>
          <Typography
            variant="h5"
            className="cls-dkph-headerTitle"
          >{`TOTAL AMOUNT`}</Typography>
          <Typography
            variant="h4"
            className="cls-dkph-price-info"
          >{`$${cartTotalPrice}`}</Typography>
          <Typography
            variant="h6"
            className="cls-dkph-product-info"
          >{`PRODUCT ITEMS - (${totalQuantity})`}</Typography>
        </Styles.StyledChoosePaymentHeaderRight>
      </Styles.StyledChoosePaymentHeader>
      <Styles.StyledChoosePaymentContentWrapper>
        <Styles.StyledContentHeaderWrapper>
          <Typography
            variant="h6"
            className="cls-dkph-payment-type-content-header"
          >{`Choose Payment Type`}</Typography>
        </Styles.StyledContentHeaderWrapper>
        <Styles.StyledChoosePaymentContent>
          {getPayLaterInfo.map((itm: any, index: any) => {
            return (
              <Styles.StyledPaymentTypeGridWrapper
                className={itm?.selected ? "active" : ""}
                onClick={() => {
                  let lcgetPayLaterInfo = getPayLaterInfo.map(
                    (innerItm: any) => {
                      return {
                        ...innerItm,
                        selected: itm.name === innerItm.name ? true : false,
                      };
                    }
                  );
                  setPayLaterInfo([...lcgetPayLaterInfo]);
                }}
              >
                {renderPaymentTypeHeader({ ...props, selectedItem: itm })}
                {index === 0
                  ? renderImmediatePayBodyContent({
                      ...props,
                      selectedItem: itm,
                    })
                  : renderLaterPayBodyContent({ ...props, selectedItem: itm })}
              </Styles.StyledPaymentTypeGridWrapper>
            );
          })}

          {/* <Styles.StyledPaymentTypeGridWrapper
            onClick={() => {
              const selectedPay = {
                isImmediatePay: false,
                isLaterPay: true,
              };
              setChosenPaymentType({
                ...selectedPay,
              });
              onHandleClickChoosePaymentType({
                ...selectedPay,
              });
            }}
          >
            {renderPaymentTypeHeader({ ...props })}
            {renderLaterPayBodyContent({ ...props })}
          </Styles.StyledPaymentTypeGridWrapper> */}
        </Styles.StyledChoosePaymentContent>
      </Styles.StyledChoosePaymentContentWrapper>
      <Styles.StyledChoosePaymentFooter>
        <Button
          autoFocus
          className="cls-cancel"
          variant="outlined"
          color="inherit"
          onClick={() => {
            onUpdate({ name: "cancel" });
          }}
        >
          {`Cancel `}
        </Button>
        <Button
          className="cls-procceed"
          autoFocus
          variant="contained"
          color="inherit"
          disabled={isButtonDisable}
          onClick={() => {
            onUpdate({ name: "proceed" });
          }}
          style={{
            backgroundColor: isButtonDisable ? "grey" : "var(--darkPink)",
          }}
        >
          {plProcessing ? "Processing..." : "Proceed"}
        </Button>
      </Styles.StyledChoosePaymentFooter>
    </Styles.StyledChoosePaymentMainWrapper>
  );
};

export default ChoosePaymentType;
export { ChoosePaymentType };
