import { Typography, Grid, Modal } from "@mui/material";
import * as ComponentLib from "@componentLib";
import * as StyledDOM from "./styles";
import * as IconGallery from "@iconsGallery";
import * as Utils from "@utils";
import useAuthenticationStates from "./useAuthentication";
import { useTranslation } from "react-i18next";
import * as GlobalFixture from "@globalFixture";
const { IS_AUTHENTICATED } = GlobalFixture.STORAGE_FIXTURE_CONTENTS;
const AuthenticationStoreApproval = (props: any) => {
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
    setIsAuthenticated = () => false,
  } = AuthenticationStates;
  const {
    onClose = () => "",
    isOpen = false,
  } = props || {};
  const { userName: name = "", phoneNumber = "{}" } = Utils?.getStorage() || {};
  let phoneObj = {};
  if (phoneNumber !== null) {
    phoneObj = JSON.parse(phoneNumber);
  }
  const { countryCode = "", number = '' } = phoneObj || {} as any;
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledDOM.StyledBox>

        <StyledDOM.StyledMainRTWrapper>
          <StyledDOM.StyledSubMainRTWrapper style={{ fontWeight: 700, fontSize: "25px" }}>
            {t("RESTRICTED_ITEM")}
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "var(--black)", mt: 3 }}
            >
              <IconGallery.UserVerified sx={{ fontSize: "5.5rem" }} />
              <div>{t('STORE_APPROVAL')}</div>
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
              inputStyle={{
                border: "1px solid"
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
              <Grid item xs={12} justifyContent={'center'}>
                <StyledDOM.ButtonUI
                  disabled={!(pinCode.length >= 6 && number.length >= 10) || getIsLoading}
                  variant="contained"
                  onClick={() => {
                    handleAuthenticate({
                      countryCode, phoneNumber: number, pin: pinCode, checkAgeRestriction: true
                    });
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
      </StyledDOM.StyledBox>
    </Modal>
  );
};

export default AuthenticationStoreApproval;
export { AuthenticationStoreApproval };
