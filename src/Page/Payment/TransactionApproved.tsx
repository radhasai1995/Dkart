import { Grid, Typography } from "@mui/material";
import * as IconGallery from "@iconsGallery";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import * as PageConfiguration from "@pageConfiguration";
const TransactionApproved = (props: any) => {
  const { requireCapture = false } = props || {}
  const location = useLocation();
  const { state = {} } = location;
  const { cartTotalPrice = "", roomNo } = state;
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      startPaperAnimation = () => "",
      stopPaperAnimation = () => "",
    } = window as any;
    if (requireCapture) {
      setTimeout(() => {
        navigate(PageConfiguration?.pathParams?.home);
      }, 5000);
      return () => { }
    }

    startPaperAnimation();
    setTimeout(() => {
      stopPaperAnimation();
      navigate(PageConfiguration?.pathParams?.home);
    }, 5000);

    return () => {
      stopPaperAnimation();
    };
  }, [navigate]);

  return (
    <span>
      <Grid className="cls-dkph-transaction">
        {requireCapture ? <IconGallery.IPaymentNotCaptureIcon /> : <IconGallery.ITransactionSuccessIcon />}
        <Typography variant="h3">{requireCapture ? t("PAYMENT_CAPTURE") : t("PAYMENT_SUCCESS")}</Typography>
        <Typography variant="h5">{`$${cartTotalPrice} ${roomNo ? t("PAYMENT_PAYLATER_SUCCESS_INFO") : t("PAYMENT_SUCCESS_INFO")}`} {roomNo ? roomNo : ""}</Typography>
        <Typography variant="h6">{`${requireCapture ? t("CONTACT_STORE_ADMIN") : t("PRINTER_RECEIPT_INFO")}`}</Typography>
      </Grid>
      <Grid className="cls-dkph-transaction-cv"></Grid>
    </span>
  );
};
export { TransactionApproved };
export default TransactionApproved;
