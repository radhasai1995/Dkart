import * as React from "react";
import * as MuiMaterial from "@mui/material";
import * as Styles from "../styles";
import * as IconGallery from "@iconsGallery";
import * as ComponentsLib from "@componentLib";
import _ from "lodash";
import { doGetTerminalRoleAccess } from "../api";

const { I3DotLoading } = IconGallery;
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const renderLeftPanel = (props: any) => {
  const {
    classes = {},
    firstNameFieldProps = {},
    lastNameFieldProps = {},
    userRoleFieldProps = {},
    createPinFieldProps = {},
    confirmPinFieldProps = {},
    terminalRoles = [],
    rowDetailsValue: rowDetails = {},
    errorText = {},
    selectedRole = {},
    onHandleChangeName = () => "",
    onHandleChangePin = () => "",
    handlePhoneNumberChange = () => "",
    handlePhoneCodeChange = () => "",
    handleRoleChange = () => "",
    setRolePermissions = [],
    setLoadingPermissions = () => "",
    countryCode: countryCodeObj = {},
    onHandleKeyDown = () => "",
    resetAutoComplete = false,
  } = props;
  const {
    firstName = "",
    lastName = "",
    phoneNumber = {},
    pin = "",
    confirmPin = "",
  } = rowDetails || {};
  const { number = "" } = phoneNumber || {};

  return (
    <MuiMaterial.Grid className="cls-dkph-modal-left">
      <Styles.StyledTextField
        {...firstNameFieldProps}
        label="First Name"
        className="cls-dkph-user-input-field"
        onChange={e => onHandleChangeName(e, "firstName", "First name")}
        value={firstName}
        onKeyDown={(event: any) => { onHandleKeyDown({ event, field: "firstName" }) }}
      />
      <Styles.StyledTextField
        {...lastNameFieldProps}
        label="Last Name"
        className="cls-dkph-user-input-field"
        onChange={e => onHandleChangeName(e, "lastName", "Last name")}
        value={lastName}
        onKeyDown={(event: any) => { onHandleKeyDown({ event, field: "lastName" }) }}
      />
      <Styles.StyledAutocomplete
        {...userRoleFieldProps}
        key={resetAutoComplete}
        disablePortal
        renderInput={params => (
          <MuiMaterial.TextField
            className="cls-dkph-text-field"
            {...params}
            placeholder={"Select Role"}
            label="Role"
          />
        )}
        onChange={(e, value) =>
          handleRoleChange({
            value,
            setRolePermissions,
            setLoadingPermissions,
            doGetTerminalRoleAccess,
          })
        }
        options={terminalRoles}
        defaultValue={_.isEmpty(selectedRole) ? null : selectedRole}

      />
      {errorText?.role && (
        <Styles.StyledErrorTextTypography>{errorText?.role}</Styles.StyledErrorTextTypography>
      )}

      <ComponentsLib.PhoneNumberCountryCode
        countryCode={countryCodeObj}
        phoneNumber={number}
        handleCodeChange={handlePhoneCodeChange}
        handlePhoneNumberChange={handlePhoneNumberChange} //handlePhoneNumberChange
        style={{ color: "var(--black)" }}
        onHandleKeyDown={onHandleKeyDown}
      />
      {errorText?.phoneNumber && (
        <Styles.StyledErrorTextTypography>
          {errorText?.phoneNumber}
        </Styles.StyledErrorTextTypography>
      )}
      <Styles.StyledTextField
        {...createPinFieldProps}
        label="Pin"
        className={classes.overrideBaseInputRoot}
        onChange={event => onHandleChangePin(event, "pin", "Pin")}
        value={pin}
        onKeyDown={(event: any) => { onHandleKeyDown({ event, field: "pin" }) }}
      />
      <Styles.StyledTextField
        {...confirmPinFieldProps}
        label="Confirm Pin"
        className={classes.overrideBaseInputRoot}
        onChange={event =>
          onHandleChangePin(event, "confirmPin", "Confirm pin")
        }
        value={confirmPin}
        onKeyDown={(event: any) => { onHandleKeyDown({ event, field: "confirmPin" }) }}
      />
    </MuiMaterial.Grid>
  );
};
export const renderRightPanel = (props: any) => {
  const {
    disableBtn = false,
    type = "",
    rowDetailsValue: rowDetails = {},
    rolePermissions = [],
    loadingPermissions = false,
    handleCloseModal = () => "",
    resetModal = () => "",
    setModalType = () => "",
    handleCreateOrUpdateUser = () => "",
    createUpdateButtonLoader = false,
    t = () => "",
  } = props;
  return (
    <MuiMaterial.Grid>
      <MuiMaterial.Typography
        variant="h5"
        style={{ fontWeight: "bold", color: "var(--primaryColor)" }}
      >
        {t("USERS_MODAL_ROLE_PERMISSION")}
      </MuiMaterial.Typography>
      <MuiMaterial.Grid
        style={{
          maxHeight: "325px",
          overflow: "scroll",
        }}
      >
        {!loadingPermissions ? (
          <>
            {rolePermissions && rolePermissions.length > 0 ? (
              <>
                {rolePermissions.map((itm: any) => (
                  <div style={{ padding: "15px" }}>
                    <Styles.StyledFormControlLabel
                      control={
                        <Styles.StyledRolePermissionCheckbox
                          {...label}
                          disabled
                          checked={itm?.isAccessible}
                        />
                      }
                      label={itm?.rolesName}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div style={{ padding: "135px 135px 225px 135px" }}>
                <MuiMaterial.Typography variant="h5">
                  {t("NO_PERMISSIONS_ASSOCIATED")}
                </MuiMaterial.Typography>
              </div>
            )}
          </>
        ) : (
          <div style={{ padding: "135px 135px 225px 135px" }}>
            <I3DotLoading />
          </div>
        )}
      </MuiMaterial.Grid>
      <Styles.StyledCreateUserButtonWrapper>
        <Styles.StyledCreateUserButton
          className="cls-dkph-cancel-button"
          onClick={() => {
            resetModal();
            setModalType("");
            handleCloseModal();
          }}
        >
          {t("CANCEL_USER_BUTTON")}
        </Styles.StyledCreateUserButton>
        <Styles.StyledUserButton
          className="cls-dkph-create-button"
          disabled={disableBtn}
          onClick={() => {
            handleCreateOrUpdateUser({
              ...rowDetails,
              resetModal,
              type,
              handleCloseModal,
              setModalType,
            });
          }}
        >
          {createUpdateButtonLoader
            ? t("LOGIN_BUTTON_TEXT_LOADING")
            : type !== "edit"
              ? t("CREATE_USER_BUTTON")
              : t("UPDATE_USER_BUTTON")}
        </Styles.StyledUserButton>
      </Styles.StyledCreateUserButtonWrapper>
    </MuiMaterial.Grid>
  );
};
