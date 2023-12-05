import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { doLogout } from "./api";
import { useAppHeaderFixture } from "./fixture";
import PAX from "./Pax";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
import * as PageConfiguration from "@pageConfiguration";
import * as Utils from "@utils";
const { STRINGIFIED_JSON, API_SUCCESS_STATUS, SEVERITY_ERROR } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const { DEFAULT_HEARTLAND_INIT_STATUS } =
  GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;
const { DATE_ALONE_FORMAT, TIME_ALONE_FORMAT } =
  GlobalFixture.DATE_FIXTURE_CONTENTS;

const {
  HEART_LAND_INIT_COMMAND,
  HEART_LAND_INIT_VERSION,
  HEART_LAND_CONNECT_PORT,
} = Constants;

function useAppHeaderState(props: any) {
  const navigate = useNavigate();
  const locationKit = useLocation();
  const { t } = useTranslation();
  const globalAppStates = useContext(Utils.GlobalAppContext);
  const {
    getPaymentType = "",
    onHandleChangeIP_Address = () => "",
    getIsIP_Valid = () => "",
    heartLandPaxIntializeStatus = DEFAULT_HEARTLAND_INIT_STATUS,
    setHeartLandPaxIntializeStatus = () => "",
    isHeartLandConnectorModalOpen = false,
    setIsHeartLandConnectorModalOpen = () => false,
    isConnectingHearLandReader = false,
    setIsConnectingHearLandReader = () => false,
    ipAddress = "",
    setIpAddress = () => "",
    port = HEART_LAND_CONNECT_PORT,
    setPort = () => "",
    isIpAddressValid = false,
    setIpAddressValid = () => false,
    heartLandInputFieldError = {},
    setheartLandInputFieldError = () => {},
    doTriggerHEARTLAND_PAXA35 = () => "",
    onHandleHeartLandConnectReader = () => "",
    connectorReaderIntializedStatus = "",
    setConnectorReaderIntializeStatus = () => "",
    isConnectingReader = false,
    setIsConnectingReader = () => false,
    isConnectReaderModalOpen = false,
    setIsConnectReaderModalOpen = () => false,
    locations = [],
    doTriggerSTRIPE = () => "",
    onHandleConnectReader = () => "",
  } = globalAppStates as any;
  const { pathname = "" } = locationKit || {};
  const { permissons = STRINGIFIED_JSON } = Utils?.getStorage() || {};
  const [getDateTime, setDateTime] = useState({
    date: moment().format(DATE_ALONE_FORMAT) || "MM/DD/YYYY",
    time: moment().format(TIME_ALONE_FORMAT) || "HH:SS AA",
  });

  const [isConfimationModalOpen, setConfirmatinModalOpen] =
    useState<boolean>(false);
  const [confimationModalTitle, setConfirmatinModalTitle] =
    useState<string>("");
  const [confimationModalSubTitle, setConfirmatinModalSubTitle] =
    useState<string>("");
  const [isHome, setIsHome] = useState(true);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const { defaultMenuList = [] } = useAppHeaderFixture();
  const [menuList, setMenuList] = useState(defaultMenuList);
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const onHandleOpenModal = () => {
    setConfirmatinModalOpen(true);
  };

  const onHandleCloseModal = () => {
    setConfirmatinModalOpen(false);
  };
  const doResetWindowObjects = () => {
    window["liveCartTransactionSocket"] = null;
    window["liveProcessPaymentSocket"] = null;
    window["PAX"] = null;
    window["heartLandPaxIntializeStatus"] = null;
    window["stripeTerminalObject"] = null;
  };
  const onHandleClickModalSuccess = () => {
    setIsLogoutLoading(true);
    doLogout({
      cbk: (responseProps: any) => {
        const { status = "" } = responseProps;
        if (status === API_SUCCESS_STATUS) {
          setIsLogoutLoading(false);
          setConfirmatinModalOpen(false);
          Utils?.resetStorage();
          doResetWindowObjects();
          setTimeout(() => {
            navigate(PageConfiguration?.pathParams?.login);
          }, 300);
        } else {
          setIsLogoutLoading(false);
          /**
           * do necessary action
           */
        }
      },
    });
  };

  const onHandleClickModalFail = () => {
    setConfirmatinModalOpen(false);
  };

  const doGetDateTime = () => {
    const currentDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
    const splitedDateTime = currentDateTime.split(" ");
    const [date = ""] = splitedDateTime;
    const splitedTime = moment(currentDateTime).format("hh:mm A");

    return {
      date: date,
      time: splitedTime,
    };
  };
  const hasPermission = (fieldProps: any) => {
    const { field = "" } = fieldProps || {};
    if (!field) return true;
    let authenticatedUserPermissions = {};
    if (permissons) {
      authenticatedUserPermissions = JSON.parse(permissons);
    }
    const { userPermissons = [] } = authenticatedUserPermissions as any;

    if (userPermissons.includes(field)) {
      return true;
    }
    return false;
  };

  const doGetPaymentGateway = (props: any = {}) => {
    const { paymentGatewayType = "" } = props || {};
    const doPayMethod = {
      Heartland: doTriggerHEARTLAND_PAXA35,
      Stripe: doTriggerSTRIPE,
    } as any;
    const { paymentGateway = "" } = Utils.getStorage() || {};
    let payGateWay = paymentGatewayType || paymentGateway;
    if (payGateWay) {
      let isValidIP = getIsIP_Valid(ipAddress);
      setIpAddressValid(isValidIP);
      let doPayTrigger = doPayMethod[payGateWay];
      doPayTrigger();
    } else {
      if (
        pathname === "/" ||
        pathname === PageConfiguration?.pathParams?.login
      ) {
        /**
         * do nothing
         */
      } else {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(t("PAYMENT_GATEWAY_NOT_FOUND"));
      }
    }
  };
  const doTriggerEvent = () => {
    if (!getPaymentType) {
      return;
    }
    window.isHeartLandConnected = false;
    window.getPaxInitializeObject = {
      command: HEART_LAND_INIT_COMMAND,
      version: HEART_LAND_INIT_VERSION,
    };
    window.heartLandPaxIntializeStatus = DEFAULT_HEARTLAND_INIT_STATUS;
    window.PAX = PAX;
    doGetPaymentGateway({});
  };
  useEffect(() => {
    const { heartLandIpAddress = "" } = Utils.getStorage() || {};
    setIpAddress(heartLandIpAddress || "");
  }, []);
  useEffect(() => {
    /**
     * @TIMER_SEQUENCE
     */
    setInterval(() => {
      setDateTime({ ...doGetDateTime() });
    }, 1 * 60 * 1000);

    /**
     * @GatewayConfigTriggerEvent
     */
    doTriggerEvent();
  }, [getPaymentType]);
  return {
    isConfimationModalOpen,
    setConfirmatinModalOpen,
    confimationModalTitle,
    setConfirmatinModalTitle,
    confimationModalSubTitle,
    setConfirmatinModalSubTitle,
    isHome,
    setIsHome,
    onHandleCloseModal,
    onHandleClickModalSuccess,
    onHandleClickModalFail,
    doGetDateTime,
    onHandleOpenModal,
    getDateTime,
    isLogoutLoading,
    setIsLogoutLoading,
    menuList,
    setMenuList,
    hasPermission,
    isMenuLoading,
    setIsMenuLoading,
    isConnectReaderModalOpen,
    setIsConnectReaderModalOpen,
    locations,
    isConnectingReader,
    setIsConnectingReader,
    onHandleConnectReader,
    isHeartLandConnectorModalOpen,
    setIsHeartLandConnectorModalOpen,
    isConnectingHearLandReader,
    setIsConnectingHearLandReader,
    onHandleHeartLandConnectReader,
    onHandleChangeIP_Address,
    isIpAddressValid,
    ipAddress,
    setIpAddress,
    port,
    setPort,
    heartLandInputFieldError,
    setheartLandInputFieldError,
    heartLandPaxIntializeStatus,
    setHeartLandPaxIntializeStatus,
    doGetPaymentGateway,
    getIsIP_Valid,
    setIpAddressValid,
    connectorReaderIntializedStatus,
    setConnectorReaderIntializeStatus,
    globalAppStates,
  };
}

export { useAppHeaderState };
export default useAppHeaderState;
