import { Typography, Grid } from "@mui/material";
import * as ComponentLib from "@componentLib";
import * as StyledDOM from "./styles";
import * as IconGallery from "@iconsGallery";
import * as Utils from "@utils";
import useAuthenticationStates from "./useAuthentication";
import { useTranslation } from "react-i18next";
import * as GlobalFixture from "@globalFixture";
const { IS_AUTHENTICATED } = GlobalFixture.STORAGE_FIXTURE_CONTENTS;
const Authentication = (props: any) => {
  const AuthenticationStates = useAuthenticationStates();
  const { t } = useTranslation();
  const {
    pinCode = "",
    setPinCode = () => "",
    validUser = false,
    setValidUser = () => false,
    handleAuthenticate = () => "",
    errorMessage = "",
    getIsLoading = false,
    setIsAuthenticated = () => false
  } = AuthenticationStates;
  const {
    onClose = () => ""
  } = props || {};
  const { userName: name = "", phoneNumber = "{}" } = Utils?.getStorage() || {};
  let phoneObj = {};
  if (phoneNumber !== null) {
    phoneObj = JSON.parse(phoneNumber);
  }
  const { countryCode = "", number = '' } = phoneObj || {} as any;
  return (
    <StyledDOM.StyledMainRTWrapper>
      <StyledDOM.StyledSubMainRTWrapper>
        {t("AUTHENTICATION_REQUIRED")}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: "var(--black)", mt: 3 }}
        >
          <IconGallery.IPersonIcon sx={{ fontSize: "5.5rem" }} />
          <div>{name}</div>
        </Typography>
        <ComponentLib.OTPInput
          disabled={getIsLoading}
          autoFocus
          length={6}
          className="otpContainer"
          inputClassName="otpInput"
          onChangeOTP={(otp: any) => {
            setPinCode(otp);
            setValidUser(false);
          }}
          setPin={setPinCode}
        />
        {validUser && (
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "red",
            }}
          >
            {errorMessage}
          </Typography>
        )}
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <StyledDOM.CancelButtonUI
              variant="outlined"
              disabled={getIsLoading}
              onClick={() => {
                localStorage.removeItem(IS_AUTHENTICATED)
                setIsAuthenticated(false);
                setTimeout(() => onClose(), 100);
              }}
            >
              {t("CANCEL_AUTHENTICATION_BUTTON")}
            </StyledDOM.CancelButtonUI>
          </Grid>
          <Grid item xs={6}>
            <StyledDOM.ButtonUI
              disabled={!(pinCode.length >= 6 && number.length >= 10) || getIsLoading}
              variant="contained"
              onClick={() => {
                handleAuthenticate({ countryCode, phoneNumber: number, pin: pinCode });
              }}
            >
              {getIsLoading
                ? t("LOGIN_BUTTON_TEXT_LOADING")
                : t("AUTHENTIC_BUTTON_TEXT")}
            </StyledDOM.ButtonUI>
          </Grid>
        </Grid>
      </StyledDOM.StyledSubMainRTWrapper>
    </StyledDOM.StyledMainRTWrapper>
  );
};

export default Authentication;
export { Authentication };
