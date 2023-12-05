import { Typography, Grid } from "@mui/material";
import * as ComponentLib from "@componentLib";
import * as Fixture from "../fixture";
import * as StyledDOM from "../styles";
import * as GlobalFixture from "@globalFixture";
const { LOGIN_VERSION } = GlobalFixture.TOTAL_CONTENTS;
const { APP_LOGIN_LOGO_IMG, APP_LOGO_ALT } = GlobalFixture.MEDIA_FIXTURE_CONTENTS;

const LoginRightPage = (props: any) => {
  const {
    countryCode,
    setCountryCode,
    phoneNumber,
    handlePhoneNumberChange,
    pinCode,
    setPinCode,
    validUser,
    setValidUser,
    handleLogin,
    errorMessage,
    getIsLoading = false,
    t = () => "",
    onHandleKeyDown = () => "",
    setPhoneNumber = () => ""
  } = props || {};

  const renderLogo = () => (
    <img
      src={APP_LOGIN_LOGO_IMG}
      alt={APP_LOGO_ALT}
      style={{ textAlign: "left", width: "fit-content", height: 42 }}
    />
  );

  const renderTitles = () => {
    return (
      <Grid>
        <StyledDOM.StyledHeaderTypography variant="h4" gutterBottom>
          {t("LOGIN_HEADER")}
        </StyledDOM.StyledHeaderTypography>
        <StyledDOM.StyledSubHeaderTypography gutterBottom>
          {t("LOGIN_SUBHEADER")}
        </StyledDOM.StyledSubHeaderTypography>
      </Grid>
    );
  };

  return (
    <StyledDOM.StyledMainRTWrapper>
      <StyledDOM.StyledSubMainRTWrapper>
        {renderLogo()}
        {renderTitles()}
        <ComponentLib.PhoneNumberCountryCode
          disabled={getIsLoading}
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          handleCodeChange={(newValue: any) => {
            setCountryCode(newValue);
          }}
          handlePhoneNumberChange={handlePhoneNumberChange}
          style={{ color: "var(--black)" }}
          countryCodes={Fixture.countryCodes}
          onKeyDown={(event: any) => { onHandleKeyDown({ event, setStateValue: setPhoneNumber }) }}
        />
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
              color: "var(--red)",
            }}
          >
            {errorMessage}
          </Typography>
        )}
        <StyledDOM.ButtonUI
          disabled={!(pinCode.length >= 6 && phoneNumber.length >= 10) || getIsLoading}
          variant="contained"
          onClick={() => {
            handleLogin();
          }}
        >
          {getIsLoading
            ? t("LOGIN_BUTTON_TEXT_LOADING")
            : t("LOGIN_BUTTON_TEXT")}
        </StyledDOM.ButtonUI>
        <StyledDOM.StyledVersionTypography variant="subtitle1" gutterBottom>
          {LOGIN_VERSION}
        </StyledDOM.StyledVersionTypography>
      </StyledDOM.StyledSubMainRTWrapper>
    </StyledDOM.StyledMainRTWrapper>
  );
};

export default LoginRightPage;
export { LoginRightPage };
