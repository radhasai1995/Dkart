import moment from "moment-timezone";
import * as apiService from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
const { API_SUCCESS_STATUS, SEVERITY_ERROR, TYPE_STRING } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const { TRANSACATION_API_FAIL } = GlobalFixture.TOTAL_CONTENTS;
const { DATE_TIME_FORMAT } = GlobalFixture.DATE_FIXTURE_CONTENTS;
const { GET_TRANSACTIONS } = Constants;

export const getReportRecordList = (props: any) => {
  const {
    getReportPageDetails,
    setTotalReportRecords,
    setReportList,
    setIsLoading,
  } = props || {};
  setIsLoading(true);
  const {
    userId = "",
    kcPosId = "",
    locationId = "",
  } = Utils.getStorage() || {};
  const queryPayload: any = {
    sortvalue: getReportPageDetails.sortvalue,
    pagenumber: getReportPageDetails.currentReportPage,
    itemcount: getReportPageDetails.rowsPerPage,
    sortpara: getReportPageDetails.sortingparameter,
    starttime:
      getReportPageDetails.startTime || moment().startOf("day").format(),
    endtime: getReportPageDetails.endTime || moment().endOf("day").format(),
    kcpos_id: getReportPageDetails.kcPosId || kcPosId,
    locationId: getReportPageDetails.locationId || locationId,
  };
  const queryParams = new URLSearchParams(queryPayload).toString();
  const pathName = `${GET_TRANSACTIONS}?${queryParams}`;
  let apiData = {
    pathName: pathName,
    isBearerDisable: true,
    isTenantIdRequired: true,
  };

  apiService
    .getGetAPI({ ...apiData })
    .then((res: any) => {
      const {
        data = {},
        status = "",
        totalDocs = 0,
        response: transactiondata = [],
      } = res?.data || {};
      if (status === API_SUCCESS_STATUS) {
        let responseData = [];
        responseData =
          transactiondata &&
          transactiondata.map((item: any) => {
            const { createdAt = "" } = item;
            const utcDate = moment.utc(createdAt);
            let createdDateTime = createdAt
              ? moment(utcDate).tz(moment.tz.guess()).format(DATE_TIME_FORMAT)
              : "";
            return { ...item, createdAt: createdDateTime };
          });
        setReportList(responseData);
        setTotalReportRecords(totalDocs);
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
