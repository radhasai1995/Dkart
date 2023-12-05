import LoginLeftPage from "./LoginLeft";
import LoginRightPage from "./LoginRight";
import useLoginPageStates from "./useLoginPage";
import { useTranslation } from "react-i18next";
import * as StyledDOM from "./styles";
import * as IconGallery from "@iconsGallery";
const Login = (props: any) => {
  const LoginPageStates = useLoginPageStates();
  const { t } = useTranslation();
  const {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    handlePhoneNumberChange,
    handleCodeChange,
    pinCode,
    setPinCode,
    validUser,
    setValidUser,
    handleLogin,
    errorMessage,
    setErrorMessage,
    getIsLoading,
    onHandleKeyDown = () => "",
  } = LoginPageStates;

  const loginProps = {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    handlePhoneNumberChange,
    handleCodeChange,
    pinCode,
    setPinCode,
    validUser,
    setValidUser,
    handleLogin,
    errorMessage,
    setErrorMessage,
    getIsLoading,
    t,
    onHandleKeyDown
  };

  // return <IconGallery.SplashSpinner2 />;
  return (
    <StyledDOM.StyledGridWrapper>
      <LoginLeftPage />
      <LoginRightPage {...loginProps} />
    </StyledDOM.StyledGridWrapper>
  );
};

export default Login;
export { Login };
