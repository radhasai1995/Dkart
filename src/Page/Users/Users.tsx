import { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { usersFixture } from "./fixture";
import useUsersStates from "./useUsersStates";
import CreateUserModal from "./UserModal";
import * as GlobalFixture from "@globalFixture";
import * as ComponentsLib from "@componentLib";
import * as IconGallery from "@iconsGallery";
import * as Styles from "./styles";
import * as Utils from "@utils";

import { doGetAllUsers, doGetTerminalRoleAccess } from "./api";

const Users = (props: any) => {
  const { t } = useTranslation();
  const globalAppStates = useContext(Utils.GlobalAppContext);
  const { hasPermission = () => "" } = globalAppStates as any;
  const {
    handleChangePage = () => "",
    handleChangeRowsPerPage = () => "",
    totalDocs = 0,
    totalPages = 0,
    setTotalDocs = () => "",
    setTotalPages = () => "",
    setIsLoading = () => "",
    usersData = [],
    setUsersData = () => "",
    dataParams = {},
    handleEditRow = () => "",
    isLoading = false,
    handleOpenModal = () => "",
    getCRUD_Operation = {},
    setCrud_Operation = () => { },
    ...restProps
  } = useUsersStates() as any;
  const { userDetailColumns = [] } = usersFixture({ t });
  const { page = 1, offset = 10 } = dataParams || {};
  const [userColumns, setUserColumns] = useState(userDetailColumns || []);
  const usersDataProps = {
    usersData,
    setUsersData,
    handleChangePage,
    handleChangeRowsPerPage,
    setTotalDocs,
    totalPages,
    setTotalPages,
    isLoading,
    columns: userColumns,
    list: usersData,
    onHandleEdit: handleEditRow,
    rowsPerPage: offset,
    page: page,
    onHandleChangePage: handleChangePage,
    onHandleChangeRowsPerPage: handleChangeRowsPerPage,
    rowsPerPageOptions: [10, 20, 40, 80, 100],
    totalDocs: totalDocs,
    t,
  };
  const createUserModalProps = {
    doGetTerminalRoleAccess,
    handleOpenModal,
    t,
    ...restProps,
  };
  const { allow: isCRUD_allowed = false } = getCRUD_Operation;
  useEffect(() => {
    const isPermissionAllowed = hasPermission({ field: GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.USERS_WRITE });
    setCrud_Operation({ ...getCRUD_Operation, allow: isPermissionAllowed });
    if (isPermissionAllowed) {
      setUserColumns([...userColumns, {
        id: "actions",
        label: t("USERS_TABLE_ACTION"),
        minWidth: 170,
      },])
    }
    let apiProps = {
      ...dataParams,
      setUsersData,
      setTotalDocs,
      setTotalPages,
      setIsLoading,
    };
    doGetAllUsers(apiProps);
  }, []);

  return (
    <Styles.StyledCard>
      <Styles.StyledCardContent>
        <Styles.StyledToolbar>
          <Styles.StyledToolbarTypography
            variant="h5"
            className="cls-users-header-title"
          >
            {t("USERS_PAGE_TITLE")}
          </Styles.StyledToolbarTypography>
          <Styles.StyledCreateButton
            startIcon={<IconGallery.CreateAddIcon />}
            variant="contained"
            disabled={!isCRUD_allowed}
            onClick={handleOpenModal}
          >
            {t("USERS_ADD_USER")}
          </Styles.StyledCreateButton>
        </Styles.StyledToolbar>
        <ComponentsLib.Table {...usersDataProps} />
        {isCRUD_allowed ? <CreateUserModal {...createUserModalProps} /> : <></>}
      </Styles.StyledCardContent>
    </Styles.StyledCard>
  );
};

export default Users;
export { Users };
