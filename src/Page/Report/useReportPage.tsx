import React, { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { getReportRecordList } from "./api";
import dayjs from "dayjs";
import moment from "moment";
import * as Utils from "@utils";

function useReportStates() {
  const { kcPosId = '', locationId = "" } = Utils.getStorage() || {};
  const [getReportPageDetails, setReportPageDetails] = useState({
    currentReportPage: 1,
    rowsPerPage: 10,
    sortvalue: -1,
    sortingparameter: "createdAt",
    startTime: moment().startOf("day").format(),
    endTime: moment().endOf("day").format(),
    kcPosId: kcPosId,
    locationId: locationId,
  });
  const [totalReportRecords, setTotalReportRecords] = useState(0);
  const [reportList, setReportList] = useState([]);
  const [openDatePickerModal, setOpenDatePickerModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = React.useState(
    dayjs(new Date(Date.now() - 86400000))
  );
  const [endDate, setEndDate] = React.useState(dayjs(new Date()));
  const [getSelectedDay, setSelectedDay] = useState<any>({
    label: "Today",
    value: "today",
  },);
  const onTiggerAPIReportList = (data: any) => getReportRecordList(data);

  useEffect(() => {
    onTiggerAPIReportList({
      getReportPageDetails,
      setReportList,
      setTotalReportRecords,
      startDate,
      endDate,
      isLoading,
      setIsLoading,
    });
  }, [getReportPageDetails]);

  const onHandleReportPageChange = (event: unknown, newPage: number) => {
    setReportPageDetails({
      ...getReportPageDetails,
      currentReportPage: newPage + 1,
    });
  };

  const onHandleReportRowsDpChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReportPageDetails({
      ...getReportPageDetails,
      rowsPerPage: +event.target.value,
      currentReportPage: 1,
    });
  };

  const onHandleSaveButtonClick = () => {
    setOpenDatePickerModal(false);
    onTiggerAPIReportList({
      getReportPageDetails,
      setReportList,
      setTotalReportRecords,
      startDate,
      endDate,
      setIsLoading,
    });
  };

  const handleChangeDateRange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value === "today") {
      setSelectedDay({
        label: "Today",
        value: "today",
      });
      const today = moment();
      const startTime = today.startOf("day").format();
      const endTime = today.endOf("day").format();
      setReportPageDetails({
        ...getReportPageDetails,
        startTime: startTime,
        endTime: endTime
      })
    }
    else {
      setSelectedDay({
        label: "Yesterday",
        value: "yesterday",
      });
      const yesterday = moment().add(-1, 'days');
      const startTime = yesterday.startOf("day").format();
      const endTime = yesterday.endOf("day").format();
      setReportPageDetails({
        ...getReportPageDetails,
        startTime: startTime,
        endTime: endTime
      })
    }

  };
  return {
    getReportPageDetails,
    totalReportRecords,
    reportList,
    onHandleReportPageChange,
    onHandleReportRowsDpChange,
    openDatePickerModal,
    setOpenDatePickerModal,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onHandleSaveButtonClick,
    isLoading,
    setIsLoading,
    handleChangeDateRange,
    getSelectedDay
  };
}
export { useReportStates };
export default useReportStates;
