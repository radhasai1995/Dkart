import React, { useEffect, useState, useMemo } from "react";
import { MemoryRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, styled, Grid, } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getAppTheme } from "./styles/theme";
import { SnackbarProvider } from "notistack";
import * as Utils from "@utils";
import * as GlobalFixture from "@globalFixture";
import * as IconGallery from "@iconsGallery";
import * as PageConfiguration from "@pageConfiguration";
import * as ComponentsLib from "@componentLib";
import { useGlobalAppState } from "./useGlobalAppState";
import CustomRedirect from "./CustomRedirect";
import "./App.css";

const DARK_MODE_THEME = "dark" as any;
const LIGHT_MODE_THEME = "light" as any;
const AppMainWrapper = styled(Grid)``;

function App() {

  const [getLoad, setLoad] = useState(false);
  const [mode, setMode] = useState<
    typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
  >(DARK_MODE_THEME);
  const theme = useMemo(() => getAppTheme(mode), [mode]);
  const { i18n, t } = useTranslation();

  const stateGlobalAppState = useGlobalAppState();
  const {
    isHeartLandConnectorModalOpen = false,
    setIsHeartLandConnectorModalOpen = () => false,
    onHandleHeartLandConnectReader = () => "",
    isConnectingHearLandReader = false,
    setIsConnectingHearLandReader = () => false,
    heartLandPaxIntializeStatus = "",
    onHandleChangeIP_Address = () => "",
    ipAddress = "",
    port = "",
    isIpAddressValid = false,
    heartLandInputFieldError = {},
    connectorReaderIntializedStatus = "",
    isConnectingReader = false,
    isConnectReaderModalOpen = false,
    setIsConnectReaderModalOpen = () => false,
    locations = [],
    onHandleConnectReader = () => "",
    setIsAuthenticated = () => false,
    setIpAddressValid = () => false,
    getIsIP_Valid = () => "",
    ageRestrictChecked = false,
    openWarningScan = false,
    isAppUpdateProgressModalOpen = false,
    setAppUpdateProgressModalOpen = () => false,
    onHandleUpdateNow = () => "",
    onHandleUpdateLater = () => "",
    openAppUpdate = false, setOpenAppUpdate = () => false,
    isAppUpdateLaterModalOpen = false, setAppUpdateLaterModalOpen = () => false,
    onHandleChangeDatePicker = () => "",
    onCloseDatePicker = () => "",
    onSubmitDatePickerValue = () => "",
    isAuthenticated = false,
    setOpenWarningScan,
    downloadProgress = 0,
    onCancelUpdateNow = () => {},
  } = stateGlobalAppState as any;
  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };
  const onTriggerLoadApp = () => {
    changeLanguage("en");
    setTimeout(() => {
      let parentDOM = document?.querySelector("body") as any;
      parentDOM?.webkitRequestFullScreen();
      setLoad(true);
    }, 1000);
  };

  const routesConfigKit = PageConfiguration?.routesConfig;
const connectReaderModalProps = {
    open: isConnectReaderModalOpen,
    onSubmit: onHandleConnectReader,
    confirmText: t("REGISTER_READER"),
    confirmLoaderText: t("CONNECTING"),
    isConnectButtonLoading: isConnectingReader,
    locations: locations,
    isAuthenticated,
    setIsAuthenticated,
    messageStatus: connectorReaderIntializedStatus,
    isReaderConnected:
      connectorReaderIntializedStatus === "success" ? true : false,
    onClose: (props: any) => {
      setIsConnectReaderModalOpen(false);
    },
  };
  const heartLandConnectorModalProps = {
    open: isHeartLandConnectorModalOpen,
    onSubmit: onHandleHeartLandConnectReader,
    confirmText: t("HEARTLAND_CONNECT"),
    confirmLoaderText: t("CONNECTING"),
    isConnectButtonLoading: isConnectingHearLandReader,
    setIsConnectButtonLoading: setIsConnectingHearLandReader,
    messageStatus: heartLandPaxIntializeStatus,
    onClose: (props: any) => {
      setIsHeartLandConnectorModalOpen(false);
    },
    onHandleChangeIP_Address,
    ipAddress,
    port,
    isIpAddressValid,
    setIpAddressValid,
    heartLandInputFieldError,
    isHeartLandConnected:
      heartLandPaxIntializeStatus === GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.HEARTLAND_INIT_SUCCESS ? true : false,
    getIsIP_Valid,
  };

  const authenticateProps = {
    isOpen: ageRestrictChecked
  };
  const appUpdateProps = {
    isOpen: openAppUpdate,
    onHandleUpdateNow,
    onHandleUpdateLater,
  };
  const appUpdateNowProps = {
    isOpen: isAppUpdateProgressModalOpen,
    onCancelAppUpdate: onCancelUpdateNow,
    confirmText: "Cancel",
    confirmLoaderText: "Loading...",
    onHandleUpdateNow,
    progress: downloadProgress,
  };
  const appUpdateLaterProps = {
    isOpen: isAppUpdateLaterModalOpen,
    onCancelAppUpdate: (props: any) => {
      setAppUpdateLaterModalOpen(false);
      //setOpenAppUpdate(false);
    },
    onHandleChangeDatePicker,
    onHandleUpdateLater,
    onCloseDatePicker,
    onSubmitDatePickerValue,

  };

  useEffect(onTriggerLoadApp, []);

  return (
    <React.Fragment>
      {getLoad ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            classes={{
              containerRoot:
                "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
            }}
          >
            <Utils.GlobalAppContext.Provider value={{ ...stateGlobalAppState }}>
              <AppMainWrapper
                style={{
                  padding: 0,
                  color: "var(--white)",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <BrowserRouter>
                  <ComponentsLib.AppHeader />
                  <Routes>
                    <Route path={"/"} element={<CustomRedirect />} />
                    {routesConfigKit.map(itm => {
                      const DynamicCom = itm?.pageComponent;
                      return (
                        <Route
                          key={itm?.pagePath}
                          path={itm?.pagePath}
                          element={<DynamicCom />}
                        />
                      );
                    })}
                  </Routes>
                  <ComponentsLib.ConnectReaderModal
                    {...connectReaderModalProps}
                  />
                  <ComponentsLib.AppUpdate {...appUpdateProps} />
                  <ComponentsLib.CircularProgressModal {...appUpdateNowProps} />
                  <ComponentsLib.CalendarTimerModal {...appUpdateLaterProps} />
                  <ComponentsLib.HeartLandConnectorModal
                    {...heartLandConnectorModalProps}
                  />
                  {authenticateProps.isOpen && <ComponentsLib.AuthenticationStoreApproval  {...authenticateProps} />}
                  <ComponentsLib.ScanWarningModal isOpen={openWarningScan} setIsOpen={setOpenWarningScan} />

                </BrowserRouter>
              </AppMainWrapper>
            </Utils.GlobalAppContext.Provider>
          </SnackbarProvider>
        </ThemeProvider>
      ) : (
        <IconGallery.CircleLoading />
      )}
    </React.Fragment>
  );
}

export default App;
