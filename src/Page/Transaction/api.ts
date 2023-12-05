import * as apiService from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
const { API_SUCCESS_STATUS, SEVERITY_ERROR, TYPE_STRING } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const { TRANSACATION_API_FAIL } = GlobalFixture.TOTAL_CONTENTS;
const { GET_TRANSACTIONS } = Constants;

export const getTransactionRecordList = (props: any) => {
  const {
    getTransactionPageDetails,
    setTransactionData,
    setTotalTransactionRecords,
    setIsLoading,
  } = props || {};
  setIsLoading(true);
  const { userId = "" } = Utils.getStorage();
  const queryPayload: any = {
    sortvalue: getTransactionPageDetails.sortvalue,
    pagenumber: getTransactionPageDetails.currentTransactionPage,
    itemcount: getTransactionPageDetails.rowsPerPage,
    sortpara: getTransactionPageDetails.sortingparameter,
  };

  const payload = {
    storeAssociateId: userId,
  };
  const queryParams = new URLSearchParams(queryPayload).toString();
  const pathName = `${GET_TRANSACTIONS}?${queryParams}`;
  let apiData = {
    pathName: pathName,
    body: payload,
    isBearerDisable: true,
    isTenantIdRequired: true,
  };
  apiService
    .getPostAPI({ ...apiData })
    .then((res: any) => {
      const { data = {}, status = "" } = res?.data || {};
      const { totalDocs = 0, transactiondata = [] } = data || {};
      if (status === API_SUCCESS_STATUS) {
        setTotalTransactionRecords(totalDocs);
        setTransactionData(transactiondata);
      }
      setIsLoading(false);
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = TRANSACATION_API_FAIL } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
    });
};
