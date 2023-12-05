import * as ApiServices from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
const { API_SUCCESS_STATUS, API_FAIL_STATUS, SEVERITY_ERROR, TYPE_STRING, SEVERITY_SUCCESS } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const {
  USER_UPDATE_SUCCESS_MESSAGE,
  USER_CREATION_ERROR_MESSAGE,
  USER_CREATED_SUCCESS_MESSAGE,
  GET_USERS_LIST_ERROR_MESSAGE,
  GET_TERMINAL_ROLES_ERROR_MESSAGE,
  GET_TERMINAL_ROLE_ERROR_MESSAGE,
  GET_USER_DETAILS_ERROR_MESSAGE,
  USER_UPDATE_ERROR_MESSAGE } = GlobalFixture.TOTAL_CONTENTS;
const {
  GET_USERS,
  GET_TERMINAL_ROLES,
  GET_TERMINAL_ROLE_ACCESS,
  CREATE_USER,
  UPDATE_USER,
  GET_USER_BY_ID,
  APP_SOURCE_TYPE
} = Constants;
export const doGetAllUsers = (props: any) => {
  const {
    setIsLoading = () => "",
    page = 1,
    offset = 10,
    sortvalue = -1,
    setTotalDocs = () => "",
    setTotalPages = () => "",
    setUsersData = () => "",
  } = props;
  setIsLoading(true);
  const { tenantId = "" } = Utils.getStorage();
  let pathName = GET_USERS;
  const payload = {
    page: page,
    limit: offset,
    sort: { createdAt: -1 },
    filter: [
      {
        tenantId: tenantId,
      },
    ],
  };
  let apiData = {
    pathName: pathName,
    body: payload,
    isBearerDisable: false,
  };
  ApiServices.getPostAPI({
    ...apiData,
  })
    .then(res => {
      const { data = {}, status = "" } = res?.data || {};
      const { totalDocs = 0, totalPages = 0, docs = [] } = data || {};
      if (status === API_SUCCESS_STATUS) {
        setTotalDocs(totalDocs);
        setTotalPages(totalPages);
        const users = docs || [];
        let tableDataValue: any = [];
        for (let user of users) {
          let keyCloakID = user?.terminalKeycloakUserId;
          keyCloakID = keyCloakID
            ? keyCloakID.slice(user.terminalKeycloakUserId.length - 6)
            : "";
          tableDataValue.push({
            id: keyCloakID,
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
            pin: user.terminalPassword ?? "",
            keycloakUserId: user?.terminalKeycloakUserId,
            role: user?.role,
            profileImage: user?.profileImage,
            isActive: user?.isActive,
            username: user?.username,
            storeId: user?.storeId,
            tenantId: user?.tenantId,
          });
        }
        setUsersData([...tableDataValue]);
      }
      setIsLoading(false);
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_USERS_LIST_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setTotalDocs(0);
      setTotalPages(0);
      setUsersData([]);
      setIsLoading(false);
    });
};

export const doGetAllTerminalRoles = (props: any) => {
  const {
    searchText = "",
    limit = 20,
    page = 1,
    roleId = "",
    sortPara = "roleName",
    sortValue = 1,
    terminal = true,
    setTerminalRoles = () => "",
    cbk = () => "",
  } = props;

  const { tenantId = "" } = Utils.getStorage();
  let pathName = `${GET_TERMINAL_ROLES}/${tenantId}`;
  let body = {
    limit: limit,
    page: page,
    roleName: searchText,
    roleId: roleId,
    sortPara: sortPara,
    sortValue: sortValue,
    terminal: terminal,
    accessType: "terminal",
    isActive: true
  };
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
    body
  };
  ApiServices.getPostAPI({
    ...apiData,
  })
    .then(res => {
      const { docs = [] } = res?.data?.data || {};
      let roles = [];
      roles = docs.map((itm: any, index: number) => ({
        roleName: itm?.roleName,
        roleId: itm?.roleId,
        title: itm?.roleName,
        id: itm?.roleId,
      }));
      setTerminalRoles(roles || []);
      cbk({ status: API_SUCCESS_STATUS });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_TERMINAL_ROLES_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS });
    });
};

export const doGetTerminalRoleAccess = (props: any) => {
  const {
    roleId = "",
    setRolePermissions = () => "",
    setLoadingPermissions = () => false,
  } = props;
  const { tenantId = "" } = Utils.getStorage();
  let pathName = `${GET_TERMINAL_ROLE_ACCESS}/${roleId}`;
  let apiData = {
    pathName: pathName,
    isBearerDisable: true,
    isTenantIdRequired: false,
    additionalHeaders: {
      "tenantId": tenantId,
    }
  };
  ApiServices.getGetAPI({ ...apiData })
    .then(res => {
      const { attributes = {} } = res?.data?.data;
      const { Sequence___Order = [], ...restItems } = attributes;
      let _permissions = [];
      for (let [key, value = []] of Object.entries(restItems)) {
        const [a = ""] = (value as Array<string>) || [];
        let dataParam = {
          rolesName: key,
          id: key,
          default: false,
          fixed: false,
          isAccessible: a === "Y" ? true : false,
        };
        _permissions.push(dataParam);
      }

      setRolePermissions(_permissions);
      setLoadingPermissions(false);
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_TERMINAL_ROLE_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setRolePermissions([]);
      setLoadingPermissions(false);
    });
};

export const doCreateUser = (props: any) => {
  const {
    resetModal = () => "",
    handleCloseModal = () => "",
    setIsLoading = () => "",
    setTotalDocs = () => "",
    setTotalPages = () => "",
    setUsersData = () => "",
    setModalType = () => "",
    setCreateUpdateButtonLoader = () => false,
    ...restProps
  } = props;
  setCreateUpdateButtonLoader(true);
  let pathName = CREATE_USER;
  const { tenantId = "", storeId = "" } = Utils.getStorage();
  const {
    firstName = "",
    lastName = "",
    pin = "",
    phoneNumber = {},
    role = {},
  } = restProps;
  const { countryCode = "", number = "" } = phoneNumber;
  let bodyParam = {
    tenantId: tenantId,
    username: `${countryCode}${number}`,
    accessType: APP_SOURCE_TYPE,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    address: {},
    profileImage: "",
    isActive: true,
    role: role,
    storeId: storeId,
    terminalPassword: pin,
  };
  const formData = new FormData();
  formData.append('payload', JSON.stringify(bodyParam))
  let apiData = {
    pathName,
    body: formData,
    isBearerDisable: false,
  };
  ApiServices.getPostAPI({
    ...apiData,
  })
    .then(res => {
      setCreateUpdateButtonLoader(false);
      const { data = {} } = res;
      const { status = "" } = data;
      if (status === API_SUCCESS_STATUS) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_SUCCESS);
        window?.OuterSnackbar.setMessage(USER_CREATED_SUCCESS_MESSAGE);
      }
      handleCloseModal();
      resetModal();
      setModalType("");
      doGetAllUsers({
        setTotalDocs,
        setTotalPages,
        setUsersData,
      });
      setIsLoading(false);

    })
    .catch(err => {
      setCreateUpdateButtonLoader(false);
      const { data = {} } = err?.response || {};
      const { message = USER_CREATION_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
    });
};

export const doUpdateUser = (props: any) => {
  const {
    resetModal = () => "",
    handleCloseModal = () => "",
    setIsLoading = () => "",
    setTotalDocs = () => "",
    setTotalPages = () => "",
    setUsersData = () => "",
    setModalType = () => "",
    setCreateUpdateButtonLoader = () => false,
    ...restProps
  } = props;
  setCreateUpdateButtonLoader(true);
  const {
    keycloakUserId = "",
    firstName = "",
    lastName = "",
    pin = "",
    phoneNumber = {},
    role = {},
    accessType = '',
    isActive = false,
    storeId = '',
    tenantId = '',
    address = {},
    profileImage = "",
    gender = {}

  } = restProps;
  let pathName = `${UPDATE_USER}/${keycloakUserId}`;
  const { countryCode = "", number = "" } = phoneNumber;
  let bodyParam = {
    tenantId: tenantId,
    username: `${countryCode}${number}`,
    accessType: accessType,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    phoneNumber: phoneNumber,
    address: address,
    profileImage: profileImage,
    isActive: isActive,
    role: role,
    storeId: storeId,
    terminalPassword: pin,
  } as any;
  const formData = new FormData();
  formData.append('payload', JSON.stringify(bodyParam));

  let apiData = {
    pathName,
    body: formData,
    isBearerDisable: false,
  };
  ApiServices.getPutAPI({
    ...apiData,
  })
    .then(res => {
      setCreateUpdateButtonLoader(false);
      const { data = {} } = res;
      const { status = "", message = USER_UPDATE_SUCCESS_MESSAGE } = data;
      if (status === API_SUCCESS_STATUS) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_SUCCESS);
        window?.OuterSnackbar.setMessage(message);
      }
      handleCloseModal();
      resetModal();
      setModalType("");
      doGetAllUsers({
        setTotalDocs,
        setTotalPages,
        setUsersData,
      });
      setIsLoading(false);
    })
    .catch(err => {
      setCreateUpdateButtonLoader(false);
      const { data = {} } = err?.response || {};
      const { message = USER_UPDATE_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
    });
};

export const doGetUserDetils = (props: any) => {
  const {
    userId = '',
    cbk = () => ''
  } = props;
  let pathName = `${GET_USER_BY_ID}/${userId}`;
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
  };
  ApiServices.getGetAPI({
    ...apiData,
  })
    .then(res => {
      const { data = {} } = res?.data || {};
      cbk({ status: API_SUCCESS_STATUS, data: data });

    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_USER_DETAILS_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS, data: {} });

    });
}
