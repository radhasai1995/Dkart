import * as React from "react";
import { Grid, styled, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as GlobalFixture from "@globalFixture";
const { PAY_VIA_TAP_CARD_IMG } = GlobalFixture.MEDIA_FIXTURE_CONTENTS;
const {
  HEARTLAND_GATEWAY,
  STRIPE_GATEWAY,
} = GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;
export const StyledCard = styled(Grid)`
  width: 350px;
  height: 430px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: white;
  border-radius: 12px;
  text-align: center;
  padding: 10px;

  h1 {
    margin-bottom: 0px;
  }
  p {
    margin-top: 0px;
    margin-bottom: 3px;
  }
  h1,
  h3,
  p {
    color: black;
  }

  h3 {
    font-size: 30px;
    margin-top: 0px;
    margin-bottom: 0px;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -202px;
    margin: auto;
    height: 30px;
  }
  .cls-dkhp-loading {
    font-size: 20px;
    bottom: -210px;
    
  }
`;
export const StyledButton = styled(Button)`
  &.Mui-disabled {
    background: var(--lightDarkPink) !important;
    color: #fff !important;
  }
  &:hover {
    background-color: #c3338f;
  }
  background-color: #c3338f;
  border-radius: 4px;
  height: 42px;
  width: 170px;
  border: 1px solid #c3338f;
  color: #fff;
`;
function HoldPay(props: any) {
  const { t } = useTranslation();
  const {
    onUpdateBack = () => "",
    timer = "00:00",
    paymentGateway = "",
    isCancelPayLoading = false,
    isCancelPaymentHidden = false,
    setIsCancelPaymentHidden = () => {},
  } = props || {};

  React.useEffect(() => {
    if (paymentGateway === HEARTLAND_GATEWAY) {
      setTimeout(() => {
        setIsCancelPaymentHidden(false);
      }, 2 * 1000);
    }
  }, [paymentGateway]);

  return (
    <StyledCard>
      <h1>{t("HOLD_PAY_HEADER_TITLE")}</h1>
      <p>{t("HOLD_ON_PAY_INFO")}</p>
      <img alt="tap card" src={PAY_VIA_TAP_CARD_IMG} />
      {isCancelPayLoading ? <h3 className="cls-dkhp-loading">{t("PLEASE_WAIT")}</h3> : <h3>{timer}</h3>}
      {!isCancelPaymentHidden ? (
      <StyledButton
        disabled={isCancelPayLoading}
        onClick={onUpdateBack}
        variant="contained"
      >
        {isCancelPayLoading ? t("CANCELLING") : t("CANCEL_PAY")}
      </StyledButton>
      ) : (
        <></>
      )}
    </StyledCard>
  );
}

export { HoldPay };
export default HoldPay;
