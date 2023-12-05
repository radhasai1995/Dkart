import { useRef, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import {
  StyledPayGrid,
  StyledImg,
  StyledMainGrid,
  StyledUnknownProduct,
} from "../styles";
import { useTranslation } from "react-i18next";
import { useCartFixtures } from "../fixture";
import * as IconGallery from "@iconsGallery";
import * as GlobalFixture from "@globalFixture";
const {
  SCAN_INFO_IMG,
  PAY_VIA_TAP_IMG,
  PAY_VIA_SWIPE_IMG,
  PAY_VIA_MOBILE_IMG,
  PAY_VIA_INSERT_IMG,
} = GlobalFixture.MEDIA_FIXTURE_CONTENTS;
const ReadyToPay = () => {
  return (
    <StyledPayGrid>
      <img src={PAY_VIA_TAP_IMG} />
      <img src={PAY_VIA_SWIPE_IMG} />
      <img src={PAY_VIA_MOBILE_IMG} />
      <img src={PAY_VIA_INSERT_IMG} />
    </StyledPayGrid>
  );
};
const ScanningPage = () => <StyledImg src={SCAN_INFO_IMG} />;

const CartRightPage = (props: any) => {
  const {
    isReadyToPay = false,
    isCartHasUnknowProduct = false,
    cartTransactionData = {},
  } = props;
  const { unknownImage = "" } = cartTransactionData || {};
  const { t } = useTranslation();
  return (
    <div>
      <StyledMainGrid>
        {isReadyToPay ? (
          <ScanningPage />
        ) : !isCartHasUnknowProduct ? (
          <ScanningPage />
        ) : (
              unknownImage && (
                <Grid sx={{ position: "relative" }}>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "center", 
                      alignItems: "center",
                      background: "var(--red)",
                      position: "absolute",
                      top: "-25px",
                      padding: "10px 50px",
                      borderRadius: "20px",
                      left: "15%",
                      zIndex: "50",
                    }}
                  >
                    <IconGallery.SheildIcon />
                    <Typography
                      variant="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        marginLeft: "20px",
                        fontSize: "22px !important",
                        marginBottom: "0px"
                      }}
                    >
                    {t("CART_LITERAL_UNKNOWN_PRODUCT_DETECTED")}
                    </Typography>
                  </Grid>
                  <StyledUnknownProduct
                    src={`data:image/png;base64, ${unknownImage}`}
                  />
            </Grid>
          )
        )}
          <Grid
            container
            style={{
              marginTop: "60px",
              width: "100%",
              maxWidth: "850px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!isCartHasUnknowProduct ? (
              <>
                <Grid
                  item
                  style={{
                    display: "flex",
                    width: "100%",
                    paddingTop: "10px",
                    justifyContent: "center",
                    textAlign: "center",
                    background: "var(--darkShadePink)",
                    borderRadius: "10px",
                    margin: "0 10px"
                  }}
                >
                  <Typography variant="h4" gutterBottom fontWeight={700}>
                    <span>{t("CART_LITERAL_MAKE_SURE_YOUR")}{" "}
                    {t("CART_LITERAL_ITEMS_ARE")}{" "}</span>
                    <b>{t("CART_LITERAL_SEPARATED")}</b>
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  item
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: "25px !important",
                      color: "var(--lightDarkPink)"
                    }}
                  >
                      {t("CART_LITERAL_MAKE_SURE_YOUR")}{" "}
                      {t("CART_LITERAL_ITEMS_ARE")}{" "}
                      {t("CART_LITERAL_SEPARATED")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: "35px !important",
                    }}
                  >
                      {t("CART_LITERAL_SCAN_DEVICE")}
                  </Typography>
                </Grid>
              </>
            )}
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Grid>
          </Grid>
      </StyledMainGrid>
    </div>
  );
};

export default CartRightPage;
export { CartRightPage };
