import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Modal,
  Grid,
  IconButton
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  StyledBox, StyledButton,
  StyledIpAddressField,
  StyledHeader,
  StyledFormControl,
  StyledInputContainer
} from "./styles";
import { Authentication } from "../Authentication";
import * as Constants from "@constants";
import * as IconGallery from "@iconsGallery";
import * as GlobalFixture from "@globalFixture";
import * as Utils from "@utils";
const {
  HEARTLAND_INIT_SUCCESS,
  HEARTLAND_INIT_FAIL,
} = GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;




const HeartLandConnectorModal = (props: any) => {
  const { t } = useTranslation();
  const globalAppStates = useContext(Utils.GlobalAppContext);
  const {
    setIsAuthenticated = () => false
  } = globalAppStates as any;
  const {
    open: isOpen = false,
    onSubmit = () => "",
    isConnectButtonLoading = false,
    confirmText = "Connect",
    confirmLoaderText = "Loading...",
    messageStatus = "",
    onClose = () => "",
    ipAddress = '',
    port = Constants.HEART_LAND_CONNECT_PORT,
    onHandleChangeIP_Address = () => "",
    isIpAddressValid = false,
    setIpAddressValid = () => "",
    heartLandInputFieldError = {},
    isHeartLandConnected = false,
    getIsIP_Valid = () => ""
  } = props;

  const [isEdit, setIsEdit] = useState(false);
  const { ipAddress: ipAddressError = '' } = heartLandInputFieldError;
  const enableConnectButton = (ipAddress.length > 0 && port.length > 0 && isIpAddressValid && !isConnectButtonLoading);
  const onKeyDown = (event: any) => {
    if (!(/^[0-9.]+$/).test(event.key)) {
      if (event.code === GlobalFixture.EVENTS_FIXTURE_CONTENTS.BACKSPACE_KEYCODE) {
        /** allowing Clear field */
      }
      else {
        event.preventDefault();
      }
    }
  }

  const { isAuthenticated = false } = Utils?.getStorage() || {};

  useEffect(() => {
    let mainDom = document?.querySelector("#root") as any;
    if (isOpen) {
      mainDom.classList.add("blur-kit");
      if (messageStatus === HEARTLAND_INIT_SUCCESS) {
        setIsEdit(false);
      }
      else {
        setIsEdit(true);
        let isValidIp = false;
        isValidIp = getIsIP_Valid(ipAddress);
        setIpAddressValid(isValidIp)
      }
    } else {
      mainDom.classList.remove("blur-kit");
    }
    return () => {
      mainDom.classList.remove("blur-kit");
    };

  }, [isOpen]);

  const showGatewayConfig = isAuthenticated;
  const isIpEditable = isEdit ? false : true;
  const disableIPAddress = messageStatus === HEARTLAND_INIT_SUCCESS ? isIpEditable : false;

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        {showGatewayConfig ? (<>
          <StyledHeader>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="cls-modal-title"
            >
              {t("HEARTLAND_CONFIG_HEADER")}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              style={{ fontSize: 12 }}
              className="cls-modal-description"
            >
              {t("HEARTLAND_CONNECTOR_HEADER")}
            </Typography>
            <img src={GlobalFixture.MEDIA_FIXTURE_CONTENTS.PAX_DEVICE_IMG} />
          </StyledHeader>
          <StyledFormControl fullWidth required>
            <StyledInputContainer className="cls-dkph-input-container">
              <Typography className={messageStatus === HEARTLAND_INIT_SUCCESS ? "cls-dkph-input-header-340" : "cls-dkph-input-header-295"}>
                {t("HEARTLAND_INPUT_FIELD_IP_ADDRESS")}</Typography>
              <Grid className="cls-dkph-input-field-wrapper">
                <StyledIpAddressField
                  id="ipaddress"
                  variant="outlined"
                  color="info"
                  required
                  onChangeCapture={(event: any) => {
                    setIsEdit(true);
                    onHandleChangeIP_Address(event)
                  }}
                  onKeyDown={onKeyDown}
                  disabled={disableIPAddress || isConnectButtonLoading}
                  value={ipAddress}
                  placeholder="IP Address"
                  inputProps={{ maxLength: 15 }}
                  sx={{
                    mt: 2,
                    input: { color: "var(--black)" },
                    label: { color: "var(--black)" },
                  }}
                  error={!!ipAddressError}
                  helperText={ipAddressError}
                />
                {isHeartLandConnected && <IconButton
                  onClick={() => setIsEdit(!isEdit)}
                >
                  {!isEdit ? (
                    <IconGallery.IEditIcon />
                  ) : (
                    <IconGallery.ClearIcon />
                  )}
                </IconButton>}
              </Grid>
              <Grid className="cls-dkph-hearland-error">
                {messageStatus === HEARTLAND_INIT_FAIL
                  ? t("HEARTLAND_CONNECTION_ERROR")
                  : ""}
              </Grid>
              <Grid className="modal-buttons">
                {messageStatus === HEARTLAND_INIT_SUCCESS && (
                  <StyledButton
                    variant="outlined"
                    style={{
                      backgroundColor: "var(--white)",
                      border: "1px solid var(--black)",
                      color: "var(--black)",
                      marginRight: 10,
                    }}
                    onClick={() => {
                      localStorage.removeItem(GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED);
                      setIsAuthenticated(false);
                      setTimeout(() => onClose(), 100);
                    }}
                  >
                    <Typography
                      style={{
                        color: "var(--black)",
                      }}
                      variant="h6"
                      component="h6"
                    >
                      {t('HEARTLAND_CANCEL')}
                    </Typography>
                  </StyledButton>
                )}
                <StyledButton
                  variant="contained"
                  disabled={!enableConnectButton || !isEdit}
                  onClick={() => onSubmit({
                    ipAddress: ipAddress,
                    port: port,
                  })
                  }
                >
                  <Typography variant="h6" component="h6">
                    {!isConnectButtonLoading
                      ? messageStatus === HEARTLAND_INIT_FAIL
                        ? t('HEARTLAND_RETRY')
                        : confirmText
                      : confirmLoaderText}
                  </Typography>
                </StyledButton>
              </Grid>
            </StyledInputContainer>
          </StyledFormControl></>) : (<Authentication
            onClose={onClose}
          />)}
      </StyledBox>
    </Modal>
  );
};

export default HeartLandConnectorModal;
export { HeartLandConnectorModal };
