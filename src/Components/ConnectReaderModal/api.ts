import * as apiService from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";

const { GET_LOCATION, REGISTER_READER } = Constants;

export const getLocationsApi = (props: any) => {
  const { cbk = () => "" } = props || {};
  const pathName = GET_LOCATION;
  let apiData = {
    pathName: pathName,
    isBearerDisable: true,
    prefixUrl: apiService.stripeConnectDomainUrl,
  };
  apiService
    .getGetAPI({ ...apiData })
    .then(res => cbk(res.data))
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = "Failed to fetch locations!" } = data || {};
      if (window?.OuterSnackbar || typeof message === "string") {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote("error");
        window?.OuterSnackbar.setMessage(message);
      }
    });
};

export const registerAndConnectApi = (props: any) => {
  const {
    cbk = () => "",
    locationId = "",
    registrationCode = "",
    label = "",
  } = props || {};
  const pathName = REGISTER_READER;
  let apiData = {
    pathName: pathName,
    isBearerDisable: true,
    body: {
      location: locationId,
      label,
      registration_code: registrationCode,
    },
    prefixUrl: apiService.localDomainURL,
  };
  apiService
    .getPostAPI({ ...apiData })
    .then((res: any) => {
      cbk({ status: "success", data: res?.data || {} });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = "Failed to Register Reader!" } = data || {};
      if (window?.OuterSnackbar || typeof message === "string") {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote("error");
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: "fail", data: {} });
    });
};
