import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as GlobalFixture from "@globalFixture";
import * as Utils from "@utils";
const { LOGIN_ERROR_MSG } = GlobalFixture.TOTAL_CONTENTS;
function useAuthenticationStates() {
  const navigate = useNavigate();
  const globalAppStates = useContext(Utils.GlobalAppContext);
  const {
    setIsAuthenticated = () => false,
    userAuthenticationAPI = () => "",
  } = globalAppStates as any;
  const { isAuthenticated = "" } = Utils.getStorage() as any;

  const [pinCode, setPinCode] = React.useState("");
  const [validUser, setValidUser] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [getIsLoading, setIsLoading] = React.useState(false);


  const handleAuthenticate = (props: any) => {
    const { countryCode = "", phoneNumber = "", pin = "", checkAgeRestriction=false } = props || {} as any;
    if (pin !== "" || countryCode !== "" || phoneNumber !== "") {
      let userName = countryCode + phoneNumber;
      userAuthenticationAPI({
        navigate,
        setValidUser,
        setErrorMessage,
        userName,
        pinCode: pin,
        getIsLoading,
        setIsLoading,
        checkAgeRestriction,
      });
    } else {
      setValidUser(true);
      setErrorMessage(LOGIN_ERROR_MSG);
    }
  };

  useEffect(() => {

  })

  return {
    pinCode,
    setPinCode,
    validUser,
    setValidUser,
    handleAuthenticate,
    errorMessage,
    setErrorMessage,
    getIsLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated
  };
}
export { useAuthenticationStates };
export default useAuthenticationStates;
