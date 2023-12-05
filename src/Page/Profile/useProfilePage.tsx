import  { useState, useEffect } from "react";
import { getProfileDetails } from "./api";

function useProfileState() {
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
    email: "",
    phoneNumber: {
      countryCode: "",
      number: ""
    },
    role: {
      name: ""
    },
    address: {
      line1: "",
      line2: "",
      region: "",
      city: "",
      country: "",
      postalcode: ""
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getProfileDetails({
      setIsLoading,
      setProfileDetails
    })
  }, []);
  return {
    getProfileDetails,
    profileDetails,
    setProfileDetails,
    isLoading,
    setIsLoading,
  };
}
export { useProfileState };
export default useProfileState;
