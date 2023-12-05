import * as ApiServices from "@apiService";
import * as Constants from "@constants";
import * as Utils from "@utils";
import * as GlobalFixture from "@globalFixture";
const { API_SUCCESS_STATUS, API_FAIL_STATUS, SEVERITY_ERROR, TYPE_STRING } =
  GlobalFixture.API_FIXTURE_CONTENTS;

export const getTransactionID = (props: any) => {
  const { cbk = () => "" } = props;
  let pathName = Constants.GET_TRANSACTION_ID;
  const { userId = "", userName = "" } = Utils?.getStorage();
  let bodyParam = {
    storeAssociateId: userId,
    storeAssociateName: userName,
  };
  let apiData = {
    prefixUrl: ApiServices.localDomainURL,
    pathName,
    body: bodyParam,
    isBearerDisable: false,
    isTenantIdRequired: true,
  };
  ApiServices.getPostAPI({
    ...apiData,
  })
    .then(res => {
      const { data = {} } = res;
      const { transactionId = "" } = data;
      localStorage.setItem(
        GlobalFixture.STORAGE_FIXTURE_CONTENTS.TRANSACTION_ID,
        transactionId
      );
      cbk({ status: API_SUCCESS_STATUS, transactionId: transactionId });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const {
        message = GlobalFixture.TOTAL_CONTENTS.GET_TRANSACTION_ID_ERROR_MSG,
      } = data || {};
      if (typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS });
    });
};
