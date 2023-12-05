import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getProductsRecordList } from "./api";
import { useProductsFixture } from "./fixtures";
import * as GlobalFixture from "@globalFixture";
import * as Utils from "@utils";
function useTransactionStates() {
  const navigate = useNavigate();
  const [getProductPageDetails, setProductPageDetails] = useState({
    currentPage: 1,
    rowsPerPage: 10,
    source: "terminal",
  });
  const [totalProductRecords, setTotalProductRecords] = useState(0);
  const [productsList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { columns = [] } = useProductsFixture({ t });
  const globalAppStates = useContext(Utils.GlobalAppContext);
  const { hasPermission = () => "" } = globalAppStates as any;
  const [getCRUD_Operation, setCrud_Operation] = useState({ allow: false });
  const [productsColumns, setProductsColumns] = useState(columns || []);
  const onTiggerAPIProductsList = (data: any) => getProductsRecordList(data);
  useEffect(() => {
    const isPermissionAllowed = hasPermission({ field: GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.TRAINING_WRITE });
    setCrud_Operation({ ...getCRUD_Operation, allow: isPermissionAllowed });
    if (isPermissionAllowed) {
      setProductsColumns([...productsColumns, {
        id: "actions",
        label: t('PRODUCT_TABLE_ACTIONS'),
        minWidth: 170,
      },])
    }
    onTiggerAPIProductsList({
      getProductPageDetails,
      setProductList,
      setTotalProductRecords,
      setIsLoading,
    });
  }, [getProductPageDetails]);

  const onHandleProductsPaginationChange = (
    event: unknown,
    newPage: number
  ) => {
    setProductPageDetails({
      ...getProductPageDetails,
      currentPage: newPage + 1,
    });
  };

  const onHandleRowsDpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductPageDetails({
      ...getProductPageDetails,
      rowsPerPage: +event.target.value,
      currentPage: 1,
    });
  };

  const onHandleCreateProductBtn = () => {
    navigate("/createproduct");
  };

  const onHandleEditProduct = (editedData: any) => {
    navigate("/createproduct", {
      state: { edit: true, editedData: editedData },
    });
  };

  return {
    getProductPageDetails,
    totalProductRecords,
    productsList,
    onHandleProductsPaginationChange,
    onHandleRowsDpChange,
    onHandleCreateProductBtn,
    onHandleEditProduct,
    isLoading,
    setIsLoading,
    getCRUD_Operation, setCrud_Operation,
    productsColumns, setProductsColumns
  };
}
export { useTransactionStates };
export default useTransactionStates;
