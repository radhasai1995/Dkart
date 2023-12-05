import * as apiService from "@apiService";
import * as GlobalFixture from "@globalFixture";
import * as PageConfiguration from "@pageConfiguration";
import * as Constants from "@constants";
import * as ApiService from "@apiService";
const { STRIPE_INIT_SUCCESS } = GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;
const {
  REPORTS_READ,
  REPORTS_WRITE,
  TRAINING_READ,
  TRAINING_WRITE,
  USERS_READ,
  USERS_WRITE,
  RESET_PIN_READ,
  RESET_PIN_WRITE,
  PROFILE_READ,
  PROFILE_WRITE,
} = GlobalFixture.MODULE_PERMISSION_FIXTURES;
const { IS_AUTHENTICATED } = GlobalFixture.STORAGE_FIXTURE_CONTENTS;

const _getPermission = (permissionObj: any) => {
  let result = [];
  if (permissionObj[USERS_READ]) {
    if (permissionObj[USERS_READ][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.USERS_READ);
    }
  }
  if (permissionObj[USERS_WRITE]) {
    if (permissionObj[USERS_WRITE][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.USERS_WRITE);
    }
  }
  if (permissionObj[REPORTS_READ]) {
    if (permissionObj[REPORTS_READ][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.REPORTS_READ);
    }
  }
  if (permissionObj[REPORTS_WRITE]) {
    if (permissionObj[REPORTS_WRITE][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.REPORTS_WRITE);
    }
  }
  if (permissionObj[TRAINING_READ]) {
    if (permissionObj[TRAINING_READ][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.TRAINING_READ);
    }
  }
  if (permissionObj[TRAINING_WRITE]) {
    if (permissionObj[TRAINING_WRITE][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.TRAINING_WRITE);
    }
  }
  if (permissionObj[RESET_PIN_WRITE]) {
    if (permissionObj[RESET_PIN_WRITE][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.RESET_PIN_WRITE);
    }
  }
  if (permissionObj[RESET_PIN_READ]) {
    if (permissionObj[RESET_PIN_READ][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.RESET_PIN_READ);
    }
  }
  if (permissionObj[PROFILE_READ]) {
    if (permissionObj[PROFILE_READ][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.PROFILE_READ);
    }
  }
  if (permissionObj[PROFILE_WRITE]) {
    if (permissionObj[PROFILE_WRITE][0] === GlobalFixture.PERMISSION_YES) {
      result.push(GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.PROFILE_WRITE);
    }
  }
  return result;
};

export const userLoginAPI = (props: any) => {
  const {
    setIsLoading = () => "",
    setValidUser,
    setErrorMessage,
    navigate,
    userName,
    pinCode,
    phoneNumber,
    doChoosePaymentDefaultAPI = () => "",
    setIsAuthenticated = () => false,
    setIsConnectReaderModalOpen = () => "",
    setConnectorReaderIntializeStatus = () => "",
  } = props;
  setIsLoading(true);
  let pathName = Constants.LOGIN;
  const payload = {
    user_name: userName,
    password: pinCode,
  };
  let apiData = {
    pathName: pathName,
    body: payload,
    isBearerDisable: true,
    prefixUrl: ApiService.localDomainURL,
  };
  ApiService.getPostAPI({ ...apiData })
    .then((res: any) => {
      if (res.status === 200) {
        if (
          res.data.status ===
            GlobalFixture.API_FIXTURE_CONTENTS.API_FAILED_STATUS ||
          res.data.status ===
            GlobalFixture.API_FIXTURE_CONTENTS.API_ERROR_STATUS
        ) {
          setValidUser(true);
          setErrorMessage(res?.data?.message || "");
          setIsLoading(false);
          localStorage.removeItem(IS_AUTHENTICATED);
          setIsAuthenticated(false);
        } else {
          const result = res.data.data;
          userVerficationApi({
            locationId: result.storeId,
            tenantId: result.tenantId,
          })
            .then((verRes: any) => {
              if (
                res.data.status ===
                  GlobalFixture.API_FIXTURE_CONTENTS.API_FAILED_STATUS ||
                res.data.status ===
                  GlobalFixture.API_FIXTURE_CONTENTS.API_ERROR_STATUS
              ) {
                setValidUser(true);
                setErrorMessage(verRes?.data?.message || "");
                setIsLoading(false);
                localStorage.removeItem(IS_AUTHENTICATED);
                setIsAuthenticated(false);
              } else {
                const { data = {} } = verRes || {};
                const { stack = {} } = data || {};
                const {
                  locationId = "",
                  kcpos_id = "",
                  reader = {},
                } = stack || {};
                setValidUser(false);
                localStorage.setItem(IS_AUTHENTICATED, "true");
                setIsAuthenticated(true);

                if (!Object.keys(reader).length) {
                  setIsConnectReaderModalOpen(true);
                } else {
                  setConnectorReaderIntializeStatus(STRIPE_INIT_SUCCESS);
                }

                const permissions = _getPermission(result.role_permission);
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.ACCESS_TOKEN,
                  result?.access_token
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.REFRESH_TOKEN,
                  result?.refresh_token
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.TENANT_ID,
                  result?.tenantId
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.STORE_ID,
                  result?.storeId
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.USER_ROLE,
                  result?.role
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.USER_ID,
                  result?.user_id
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.USER_NAME,
                  result?.name
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.TRANSACTION_ID,
                  ""
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.TOKEN_EXPIRES_IN,
                  result?.expires_in
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS
                    .REFRESH_TOKEN_EXPIRES_IN,
                  result?.refresh_expires_in
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.TOKEN_TYPE,
                  result?.token_type
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.PERMISSIONS,
                  JSON.stringify({ userPermissons: permissions }) ||
                    GlobalFixture.API_FIXTURE_CONTENTS.STRINGIFIED_JSON
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.PHONE_NUMBER,
                  JSON.stringify(phoneNumber)
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED,
                  "true"
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.KC_POS_ID,
                  kcpos_id
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.LOCATION_ID,
                  locationId
                );
                localStorage.setItem(
                  GlobalFixture.STORAGE_FIXTURE_CONTENTS.READER_CONFIG,
                  JSON.stringify(reader) ||
                    GlobalFixture.API_FIXTURE_CONTENTS.STRINGIFIED_JSON
                );
                doChoosePaymentDefaultAPI({
                  tenantId: result?.tenantId || "",
                });
                setTimeout(() => {
                  setIsLoading(false);
                  navigate(PageConfiguration?.pathParams?.home);
                }, 500);
              }
            })
            .catch(err => {
              const { data = {}, status = "" } = err?.response || {};
              const {
                message = GlobalFixture.TOTAL_CONTENTS.USER_VERIFY_API_FAIL_MSG,
              } = data || {};

              setIsLoading(false);
              if (status === 401) {
                setValidUser(true);
                setErrorMessage(message);
              } else {
                if (
                  window?.OuterSnackbar ||
                  typeof message ===
                    GlobalFixture.API_FIXTURE_CONTENTS.TYPE_STRING
                ) {
                  window?.OuterSnackbar.handleClickStack();
                  window?.OuterSnackbar.setSeverityNote(
                    GlobalFixture.API_FIXTURE_CONTENTS.SEVERITY_ERROR
                  );
                  window?.OuterSnackbar.setMessage(message);
                }
                localStorage.removeItem(IS_AUTHENTICATED);
                setIsAuthenticated(false);
              }
            });
        }
      } else {
        setIsLoading(false);
        localStorage.removeItem(IS_AUTHENTICATED);
        setIsAuthenticated(false);
      }
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const {
        message = GlobalFixture.TOTAL_CONTENTS.LOGIN_API_FAIL_ERROR_MSG,
      } = data || {};

      if (
        window?.OuterSnackbar ||
        typeof message === GlobalFixture.API_FIXTURE_CONTENTS.TYPE_STRING
      ) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(
          GlobalFixture.API_FIXTURE_CONTENTS.SEVERITY_ERROR
        );
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
      localStorage.removeItem(IS_AUTHENTICATED);
      setIsAuthenticated(false);
    });
};

export const userVerficationApi = (props: any) => {
  const { tenantId, locationId } = props;
  const pathName = Constants.USER_VERIFICATION;
  const payload = {
    tenantId,
    locationId,
  };
  const apiData = {
    pathName: pathName,
    body: payload,
    isBearerDisable: true,
    prefixUrl: apiService.localDomainURL,
  };
  return apiService.getPostAPI({ ...apiData });
};
