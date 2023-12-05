import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginAPI } from "./api";
import * as GlobalFixture from "@globalFixture";
import * as Utils from "@utils";

const { LOGIN_ERROR_MSG } = GlobalFixture.TOTAL_CONTENTS;
function useLoginPageStates() {
  const navigate = useNavigate();
  const globalAppStates = useContext(Utils.GlobalAppContext);
  const {
    doChoosePaymentDefaultAPI = () => "",
    setIsAuthenticated = () => false,
    setIsConnectReaderModalOpen = () => false,
    setConnectorReaderIntializeStatus = () => false,

  } = globalAppStates as any;
  const [countryCode, setCountryCode] = React.useState({
    code: "US",
    label: "United States",
    phone: "1",
  });
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [validUser, setValidUser] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [getIsLoading, setIsLoading] = React.useState(false);

  const handlePhoneNumberChange = (event: any) => {
    const number = event?.target.value;
    const regex = /^[0-9\b]+$/;
    if (number.length <= 10 && (number === "" || regex.test(number))) {
      setPhoneNumber(number);
      setValidUser(false);
    }
  };
  const handleCodeChange = (data: any) => {
    setCountryCode(data);
  };

  const handleLogin = () => {
    if (pinCode !== "" || phoneNumber !== "") {
      let userName = countryCode?.phone + phoneNumber;
      userLoginAPI({
        navigate,
        setValidUser,
        setErrorMessage,
        userName,
        pinCode,
        getIsLoading,
        setIsLoading,
        phoneNumber: { countryCode: countryCode?.phone, number: phoneNumber },
        doChoosePaymentDefaultAPI,
        setIsAuthenticated,
        setIsConnectReaderModalOpen,
        setConnectorReaderIntializeStatus

      });
    } else {
      setValidUser(true);
      setErrorMessage(LOGIN_ERROR_MSG);
    }
  };
  const onHandleKeyDown = (keyDownProps: any) => {
    const { event = {}, setStateValue = () => "" } = keyDownProps || {}
    if (event.which === 13) {
      setStateValue("")
    }
  }
  return {
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
    setIsLoading,
    doChoosePaymentDefaultAPI,
    onHandleKeyDown
  };
}
export { useLoginPageStates };
export default useLoginPageStates;
