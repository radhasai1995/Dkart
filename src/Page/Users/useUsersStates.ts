import React, { useState } from "react";
import { IUserDetail } from "./typings";
import {
  doGetAllTerminalRoles,
  doCreateUser,
  doUpdateUser,
  doGetAllUsers,
  doGetUserDetils,
} from "./api";

function useUsersStates() {
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [modalType, setModalType] = useState("new");
  const [actionLoader, setActionLoader] = useState(false);
  const [terminalRoles, setTerminalRoles] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [dataParams, setDataParams] = useState({
    page: 1,
    offset: 10,
    sortvalue: -1,
  });
  const [createUpdateButtonLoader, setCreateUpdateButtonLoader] =
    useState(false);
  const [rowDetails, setRowDetails] = useState({});
  const [getCRUD_Operation, setCrud_Operation] = useState({ allow: false });
  const handleChangePage = (event: unknown, newPage: number) => {
    let localDataParam = {
      ...dataParams,
      page: newPage + 1,
    };
    setDataParams(localDataParam);
    let apiProps = {
      ...localDataParam,
      setUsersData,
      setTotalDocs,
      setTotalPages,
      setIsLoading,
    };
    doGetAllUsers(apiProps);
  };
  const handleChangeRowsPerPage = (event: any) => {
    let localDataParam = {
      ...dataParams,
      page: 1,
      offset: event.target.value,
    };
    setDataParams(localDataParam);
    let apiProps = {
      ...localDataParam,
      setUsersData,
      setTotalDocs,
      setTotalPages,
      setIsLoading,
    };
    doGetAllUsers(apiProps);
  };
  const handleCreateOrUpdateUser = (prop: any) => {
    const { type = "", pin = "", confirmPin = "" } = prop;
    if (pin && confirmPin && pin === confirmPin) {
      if (type !== "edit") {
        doCreateUser({
          ...prop,
          setTotalDocs,
          setTotalPages,
          setUsersData,
          setCreateUpdateButtonLoader,
        });
      } else {
        doUpdateUser({
          ...prop,
          setTotalDocs,
          setTotalPages,
          setUsersData,
          setCreateUpdateButtonLoader,
        });
      }
    } else {
      if (window?.OuterSnackbar) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote("error");
        window?.OuterSnackbar.setMessage("Pin & Confirm Pin aren't same");
      }
    }
  };
  const handleOpenModal = (prop: any) => {
    const { type = "new" } = prop;
    setModalType(type);
    setOpenCreateUserModal(true);
  };
  const handleCloseModal = () => {
    setOpenCreateUserModal(false);
    setRowDetails({});
  };
  const handleEditRow = (rowData: any) => {
    setRowDetails({ ...rowData, confirmPin: rowData?.pin });
    handleOpenModal({ type: "edit" });
  };
  const doGetIndividualUserDetails = (apiProps: any) => {
    doGetUserDetils(apiProps);
  };
  const doGetAllTerminalRolesDetails = (apiProps: any) => {
    let dataProps = {
      ...apiProps,
    };
    doGetAllTerminalRoles(dataProps);
  };
  return {
    handleChangePage,
    handleChangeRowsPerPage,
    handleCreateOrUpdateUser,
    totalDocs,
    setTotalDocs,
    totalPages,
    setTotalPages,
    isLoading,
    setIsLoading,
    handleOpenModal,
    handleCloseModal,
    openCreateUserModal,
    setOpenCreateUserModal,
    dataParams,
    setDataParams,
    terminalRoles,
    setTerminalRoles,
    modalType,
    setModalType,
    handleEditRow,
    rowDetails,
    setRowDetails,
    actionLoader,
    setActionLoader,
    usersData,
    setUsersData,
    doGetIndividualUserDetails,
    doGetAllTerminalRolesDetails,
    createUpdateButtonLoader,
    setCreateUpdateButtonLoader,
    getCRUD_Operation,
    setCrud_Operation,
  };
}
export { useUsersStates };
export default useUsersStates;
