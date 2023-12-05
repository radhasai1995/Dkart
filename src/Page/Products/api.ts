import * as apiService from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
const { GET_PRODUCTS_ERROR_MESSAGE } = GlobalFixture.TOTAL_CONTENTS;
const { API_SUCCESS_STATUS, SEVERITY_ERROR, TYPE_STRING } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const { GET_PRODUCTS } = Constants;
export const getProductsRecordList = (props: any) => {
  const {
    getProductPageDetails,
    setProductList,
    setTotalProductRecords,
    setIsLoading,
  } = props || {};
  setIsLoading(true);
  const { storeId = "" } = Utils.getStorage();
  const payload: any = {
    locationId: storeId,
    itemcount: getProductPageDetails.rowsPerPage,
    pagenumber: getProductPageDetails.currentPage,
    source: getProductPageDetails.source,
    sortvalue: -1,
    sortpara: "createdDateTime",
  };
  const queryParams = new URLSearchParams(payload).toString();
  const pathName = `${GET_PRODUCTS}?${queryParams}`;
  let apiData = {
    pathName: pathName,
    body: payload,
    isBearerDisable: true,
    isTenantIdRequired: true,
  };
  apiService
    .getGetAPI({ ...apiData })
    .then((res: any) => {
      const { response = {}, status = "", totalDocs = 0 } = res?.data || {};
      if (status === API_SUCCESS_STATUS) {
        setProductList(response);
        setTotalProductRecords(totalDocs);
      }
      setIsLoading(false);
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_PRODUCTS_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
    });
};
