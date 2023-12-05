import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
import * as ApiService from "@apiService";

export const doLogout = (props: any) => {
  const { cbk = () => "" } = props || {};
  const { userId = "" } = Utils.getStorage();

  const pathName = `${Constants.LOGOUT}?user_id=${userId}`;
  let apiData = {
    pathName: pathName,
    isBearerDisable: true,
    isTenantIdRequired: true,
    prefixUrl: ApiService.localDomainURL,
  };
  ApiService.getGetAPI({ ...apiData })
    .then((res: any) => {
      cbk({ status: GlobalFixture.API_FIXTURE_CONTENTS.API_SUCCESS_STATUS });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GlobalFixture.TOTAL_CONTENTS.LOGOUT_ERROR_MESSAGE } =
        data || {};
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
      cbk({ status: GlobalFixture.API_FIXTURE_CONTENTS.API_FAIL_STATUS });
    });
};
