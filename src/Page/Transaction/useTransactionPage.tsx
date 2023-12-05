import React, { useState, useEffect } from "react";
import { transactionList } from "./fixtures";
import { useNavigate } from "react-router-dom";
import * as apiService from "../../apiServices";
import { getTransactionRecordList } from "./api";
import * as PageConfiguration from "@pageConfiguration";
import * as Utils from "@utils";

function useTransactionStates() {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = React.useState([]);
  const [getTransactionPageDetails, setTransactionPageDetails] = useState({
    currentTransactionPage: 1,
    rowsPerPage: 10,
    sortvalue: -1,
    sortingparameter: "createdAt",
  });
  const [totalTransactionRecords, setTotalTransactionRecords] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onTiggerAPITransactionList = (data: any) =>
    getTransactionRecordList(data);

  useEffect(() => {
    getTransactionDetails();
  }, [getTransactionPageDetails]);

  const getTransactionDetails = () => {
    onTiggerAPITransactionList({
      getTransactionPageDetails,
      setTransactionData,
      setTotalTransactionRecords,
      setIsLoading,
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setTransactionPageDetails({
      ...getTransactionPageDetails,
      currentTransactionPage: newPage + 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionPageDetails({
      ...getTransactionPageDetails,
      rowsPerPage: +event.target.value,
      currentTransactionPage: 1,
    });
  };

  const handleCloseTransactions = () => {
    Utils?.resetStorage();
    setTimeout(() => {
      navigate(PageConfiguration?.pathParams?.login);
    }, 300);
  };

  return {
    getTransactionPageDetails,
    setTransactionPageDetails,
    transactionData,
    setTransactionData,
    totalTransactionRecords,
    setTotalTransactionRecords,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCloseTransactions,
    isLoading,
    setIsLoading,
  };
}
export { useTransactionStates };
export default useTransactionStates;
