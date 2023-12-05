import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import * as IconGallery from "@iconsGallery";
import _, { isNaN } from "lodash";
interface Column {
  id: string;
  label: string;
  minWidth?: number;
}

export const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "First Name", minWidth: 170 },
  { id: "phoneNumber", label: "First Name", minWidth: 170 },
  { id: "pin", label: "First Name", minWidth: 170 },
  {
    id: "",
    label: "Actions",
    minWidth: 170,
  },
];

export const useFixtureDetails = (props: any) => {
  const { t = () => "" } = props;
  const userDetailsFixture = {
    firstName: "",
    lastName: "",
    role: { id: "", name: "" },
    phoneNumber: { countryCode: "1", number: "" },
    pin: "",
    confirmPin: "",
  };
  const userDetailsErrorFixture = {
    firstName: "",
    lastName: "",
    role: "",
    phoneNumber: "",
    pin: "",
    confirmPin: "",
  };
  const [resetAutoComplete, setResetAutoComplete] = useState(false);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [isDialogModalLoading, setIsDialogModalLoading] = useState(false)
  const [pinVisibility, setPinVisibility] = useState({
    pin: false,
    confirmPin: false,
  });
  const [rowDetailsValue, setRowDetailsValue] = useState(userDetailsFixture);
  const [errorText, setErrorText] = useState(userDetailsErrorFixture);
  const [countryCode, setCountryCode] = useState({
    code: "US",
    label: "United States",
    phone: "1",
  });
  const [isPinValid, setIsPinValid] = useState(false);
  const [isConfirmPinValid, setisConfirmPinValid] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const firstNameFieldProps = {
    id: "firstName",
    name: "firstName",
    label: "",
    placeholder: t("USERS_MODAL_FIRST_NAME"),
    type: "text",
    inputProps: { maxLength: 64 },
    autoComplete: "nope",
    autoFocus: true,
    helperText: errorText?.firstName,
    error: !!errorText?.firstName,
  };
  const lastNameFieldProps = {
    id: "lastName",
    name: "lastName",
    label: "",
    placeholder: t("USERS_MODAL_LAST_NAME"),
    type: "text",
    autoComplete: "nope",
    inputProps: { maxLength: 64 },
    helperText: errorText?.lastName,
    error: !!errorText?.lastName,
  };
  const userRoleFieldTextProps = {
    id: "userRole",
    name: "userRole",
    label: "",
    placeholder: t("USERS_MODAL_SELECT_ROLE"),
    type: "text",
    autoComplete: "nope",
    inputProps: { autoComplete: "nope" },
    InputProps: {
      inputProps: {
        autoComplete: "nope",
      },
    },
  };
  const userRoleFieldProps = {
    id: "combo-box-demo",
    key: resetAutoComplete,
    limitTags: 2,
    noOptionsText: "No options",
    getOptionLabel: (option: any) => `${option?.title}`, //`${option.label}`
  };
  const createPinFieldProps = {
    id: "createPin",
    name: "createPin",
    label: "",
    placeholder: t("USERS_MODAL_CREATE_PIN"),
    autoComplete: "nope",
    type: pinVisibility?.pin ? "text" : "password",
    helperText: errorText?.pin,
    error: !!errorText?.pin,
    inputProps: { maxLength: 6 },
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={e => {
              setPinVisibility({ ...pinVisibility, pin: !pinVisibility?.pin });
            }}
          >
            {pinVisibility?.pin ? (
              <IconGallery.IVisibilityIcon />
            ) : (
              <IconGallery.IVisibilityOffIcon />
            )}
          </IconButton>
        </InputAdornment>
      ),
    },
  };
  const confirmPinFieldProps = {
    id: "confirmPin",
    name: "confirmPin",
    label: "",
    placeholder: t("USERS_MODAL_CONFIRM_PIN"),
    autoComplete: "nope",
    type: pinVisibility?.confirmPin ? "text" : "password",
    helperText: errorText?.confirmPin,
    error: !!errorText?.confirmPin,
    inputProps: { maxLength: 6 },
    InputProps: {
      inputProps: { autoComplete: "nope" },
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={e => {
              setPinVisibility({
                ...pinVisibility,
                confirmPin: !pinVisibility?.confirmPin,
              });
            }}
          >
            {pinVisibility?.confirmPin ? (
              <IconGallery.IVisibilityIcon />
            ) : (
              <IconGallery.IVisibilityOffIcon />
            )}
          </IconButton>
        </InputAdornment>
      ),
    },
  };
  const onHandleChangeName = (
    event: any,
    field: string,
    errorField: string
  ) => {
    let textValue = event.target.value ? event.target.value.trim() : "";
    textValue = textValue.replace(/[^A-Za-z\s]+/g, "");
    setRowDetailsValue({ ...rowDetailsValue, [field]: textValue });
    if (!textValue)
      setErrorText({ ...errorText, [field]: `${errorField} is required` });
    else setErrorText({ ...errorText, [field]: "" });
    const {
      firstName = "",
      lastName = "",
      role = {},
      phoneNumber = {},
    } = rowDetailsValue;
    const { id: roleId = "", name: roleName = "" } = role as any;
    const { number = "" } = phoneNumber as any;
    if (field === "firstName")
      textValue &&
        lastName &&
        number &&
        roleName &&
        roleId
        ? setDisableBtn(false)
        : setDisableBtn(true);
    else
      textValue &&
        firstName &&
        number &&
        roleName &&
        roleId
        ? setDisableBtn(false)
        : setDisableBtn(true);
  };
  const onHandleChangePin = (event: any, field: string, errorField: string) => {
    let textValue = event.target.value ? event.target.value.trim() : "";
    textValue = textValue.replace(/\s\s+/g, "");
    let isOnlyNumbers = false;
    isOnlyNumbers = isNaN(Number(textValue));

    if (isOnlyNumbers || textValue.length > 6) return;

    let isPinValid = /^(\d{6})$/.test(textValue);
    if (field === "pin") setIsPinValid(isPinValid);
    else setisConfirmPinValid(isPinValid);
    if (
      field === "pin" &&
      rowDetailsValue?.pin?.length <= 6 &&
      rowDetailsValue?.confirmPin?.length === 6
    ) {
      setRowDetailsValue({
        ...rowDetailsValue,
        [field]: textValue,
        confirmPin: "",
      });
    } else {
      setRowDetailsValue({ ...rowDetailsValue, [field]: textValue });
    }
    if (!textValue)
      setErrorText({ ...errorText, [field]: `${errorField} is required` });
    else if (
      rowDetailsValue?.pin.length === 6 &&
      rowDetailsValue?.pin !== textValue &&
      field === "confirmPin"
    ) {
      setErrorText({
        ...errorText,
        [field]: `${errorField} should same as Pin`,
      });
    } else {
      if (!isPinValid)
        setErrorText({
          ...errorText,
          [field]: `${errorField} must contain 6 digits`,
        });
      else setErrorText({ ...errorText, [field]: "" });
    }
    const {
      firstName = "",
      lastName = "",
      role = {},
      phoneNumber = {},
      pin = "",
      confirmPin = "",
    } = rowDetailsValue;
    const { id: roleId = "", name: roleName = "" } = role as any;
    const { number = "" } = phoneNumber as any;
    if (field === "pin")
      textValue &&
        isPinValid &&
        firstName &&
        lastName &&
        number &&
        roleName &&
        roleId &&
        confirmPin
        ? setDisableBtn(false)
        : setDisableBtn(true);
    else
      textValue &&
        isPinValid &&
        firstName &&
        lastName &&
        number &&
        roleName &&
        roleId &&
        pin
        ? setDisableBtn(false)
        : setDisableBtn(true);
  };
  const handlePhoneNumberChange = (event: any) => {
    let textValue = event.target.value ? event.target.value.trim() : "";
    textValue = textValue.replace(/\s\s+/g, "");
    let isOnlyNumbers = false;
    isOnlyNumbers = /^\d+$/.test(textValue);
    if (textValue && !isOnlyNumbers) return;
    let isNumberValid = /^(\d{10})$/.test(textValue);
    let mobileNumber = {
      countryCode: rowDetailsValue?.phoneNumber?.countryCode,
      number: textValue,
    };
    setRowDetailsValue({ ...rowDetailsValue, phoneNumber: mobileNumber });
    if (!textValue)
      setErrorText({ ...errorText, phoneNumber: "Phone number is required" });
    else {
      if (isNumberValid) setErrorText({ ...errorText, phoneNumber: "" });
      else
        setErrorText({
          ...errorText,
          phoneNumber: "Phone number must have 10 digits",
        });
    }
    const {
      firstName = "",
      lastName = "",
      role = {},
      pin = "",
      confirmPin = "",
    } = rowDetailsValue;
    const { id: roleId = "", name: roleName = "" } = role as any;
    textValue &&
      isNumberValid &&
      firstName &&
      lastName &&
      isPinValid &&
      roleId &&
      roleName
      ? setDisableBtn(false)
      : setDisableBtn(true);
  };
  const handlePhoneCodeChange = (value: any) => {
    const { phone: countryCode = "" } = value;
    let mobileNumber = {
      number: rowDetailsValue?.phoneNumber?.number,
      countryCode: countryCode,
    };
    setCountryCode(value);
    setRowDetailsValue({ ...rowDetailsValue, phoneNumber: mobileNumber });
    const {
      firstName = "",
      lastName = "",
      role = {},
      pin = "",
      confirmPin = "",
    } = rowDetailsValue;
    const { id: roleId = "", name: roleName = "" } = role as any;
    firstName &&
      lastName &&
      roleId &&
      roleName && pin && confirmPin && (isPinValid || pin === confirmPin)
      ? setDisableBtn(false)
      : setDisableBtn(true);
  };
  const handleRoleChange = (prop: any) => {
    const {
      value = {},
      setRolePermissions = [],
      setLoadingPermissions = false,
      doGetTerminalRoleAccess = () => "",
    } = prop;
    setSelectedRole(value);
    const { roleId = "", roleName = "" } = value || {};
    setRowDetailsValue({
      ...rowDetailsValue,
      role: { id: roleId ? roleId : "", name: roleName ? roleName : "" },
    });
    if (roleId) {
      setLoadingPermissions(true);
      setRolePermissions([]);
      doGetTerminalRoleAccess({
        roleId: roleId,
        setRolePermissions,
        setLoadingPermissions,
      });
    }
    if (!roleId || !roleName)
      setErrorText({ ...errorText, role: "Role is required" });
    else setErrorText({ ...errorText, role: "" });

    const { firstName = "", lastName = "", phoneNumber = {} } = rowDetailsValue;
    const { number = "" } = phoneNumber as any;
    roleId &&
      roleName &&
      firstName &&
      lastName &&
      number
      ? setDisableBtn(false)
      : setDisableBtn(true);
  };
  const resetModal = () => {
    setErrorText(userDetailsErrorFixture);
    setRolePermissions([]);
    setLoadingPermissions(false);
    setSelectedRole({});
    setPinVisibility({
      pin: false,
      confirmPin: false,
    });
    setRowDetailsValue(userDetailsFixture);
  };
  const onHandleKeyDown = (keyDownProps: any) => {
    const { event = {}, field = "" } = keyDownProps || {}
    if (event.which === 13) {
      if (field !== "phoneNumber")
        setRowDetailsValue({ ...rowDetailsValue, [field]: "" });
      else
        setRowDetailsValue({ ...rowDetailsValue, [field]: { countryCode: rowDetailsValue?.phoneNumber?.countryCode, number: "" } });
    }
  }
  return {
    userDetailsFixture,
    userDetailsErrorFixture,
    firstNameFieldProps,
    lastNameFieldProps,
    userRoleFieldProps,
    userRoleFieldTextProps,
    createPinFieldProps,
    confirmPinFieldProps,
    onHandleChangeName,
    onHandleChangePin,
    handlePhoneNumberChange,
    handlePhoneCodeChange,
    handleRoleChange,
    rowDetailsValue,
    setRowDetailsValue,
    errorText,
    setErrorText,
    resetAutoComplete,
    setResetAutoComplete,
    rolePermissions,
    setRolePermissions,
    selectedRole,
    setSelectedRole,
    loadingPermissions,
    setLoadingPermissions,
    pinVisibility,
    setPinVisibility,
    resetModal,
    countryCode,
    setCountryCode,
    disableBtn,
    setDisableBtn,
    isPinValid,
    setIsPinValid,
    isConfirmPinValid,
    setisConfirmPinValid,
    isDialogModalLoading, setIsDialogModalLoading,
    onHandleKeyDown
  };
};
