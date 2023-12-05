import * as apiService from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
const { GET_USER_DETAILS_ERROR_MESSAGE } = GlobalFixture.TOTAL_CONTENTS;
const { API_SUCCESS_STATUS, SEVERITY_ERROR, TYPE_STRING } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const { GET_USER_BY_ID } = Constants;

export const getProfileDetails = (props: any) => {
  const { setIsLoading = () => false, setProfileDetails = () => "" } =
    props || {};
  setIsLoading(true);
  const { userId = "" } = Utils.getStorage();
  const pathName = `${GET_USER_BY_ID}/${userId}`;
  let apiData = {
    pathName: pathName,
  };
  apiService
    .getGetAPI({ ...apiData })
    .then((res: any) => {
      const { data = {}, status = "" } = res?.data || {};
      if (status === API_SUCCESS_STATUS) {
        setProfileDetails(data);
      }
      setIsLoading(false);
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_USER_DETAILS_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
    });
};
