import { useState, useEffect, useRef } from "react";
import * as GlobalFixture from "@globalFixture";
import * as Constants from "@constants";
import * as Utils from "@utils";
import * as ApiServices from "@apiService";

const { ipcRenderer } = window.require("electron");
const {
  DEFAULT_GATE_WAY_ERROR_MESSAGE,
  HEARTLAND_IP_REQUIRED,
  HEARTLAND_VALID_IP_REQUIRED,
  LOGIN_API_FAIL_ERROR_MSG,
  CLOSE_TRANSACTION_ERROR_MESSAGE,
} = GlobalFixture.TOTAL_CONTENTS;
const {
  API_SUCCESS_STATUS,
  API_FAIL_STATUS,
  SEVERITY_ERROR,
  TYPE_STRING,
  API_FAILED_STATUS,
  API_ERROR_STATUS,
  STRINGIFIED_JSON,
} = GlobalFixture.API_FIXTURE_CONTENTS;
const {
  HEARTLAND_GATEWAY,
  DEFAULT_HEARTLAND_INIT_STATUS,
  DEFAULT_STRIPE_INIT_STATUS,
  HEARTLAND_INIT_FAIL,
  HEARTLAND_INIT_SUCCESS,
  STRIPE_INIT_SUCCESS,
  STRIPE_INIT_FAIL,
} = GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;

function useGlobalAppState() {
  const [getPaymentType, setPaymentType] = useState(
    Utils?.getStorage()?.paymentGateway || null
  ) as any;
  const [openWarningScan, setOpenWarningScan] = useState(false);
  const [ageRestrictChecked, setAgeRestrictionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  /**
   * Heart Land Config Connect States
   * ================================================================================
   */
  const [heartLandPaxIntializeStatus, setHeartLandPaxIntializeStatus] =
    useState<string>(DEFAULT_HEARTLAND_INIT_STATUS);
  const [isHeartLandConnectorModalOpen, setIsHeartLandConnectorModalOpen] =
    useState(false);
  const [isConnectingHearLandReader, setIsConnectingHearLandReader] =
    useState(false);
  const [isHeartLandConnected, setIsHeartLandConnected] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>("");
  const [port, setPort] = useState<string>(Constants.HEART_LAND_CONNECT_PORT);
  const [isIpAddressValid, setIpAddressValid] = useState(false);
  const [heartLandInputFieldError, setheartLandInputFieldError] = useState({
    ipAddress: "",
    port: "",
  });

  /**
   * Stripe Config Connect States
   * ================================================================================
   */
  const [connectorReaderIntializedStatus, setConnectorReaderIntializeStatus] =
    useState<string>(DEFAULT_STRIPE_INIT_STATUS);
  const [isConnectingReader, setIsConnectingReader] = useState(false);
  const [isConnectReaderModalOpen, setIsConnectReaderModalOpen] =
    useState(false);
  const [locations, setLocations] = useState([]);
  const [isDiscoverReaderModalOpen, setIsDiscoverReaderModalOpen] =
    useState(false);
  const [discoveryInProgress, setDiscoveryInProgress] = useState(false);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [discoveredReaders, setDiscoveredReaders] = useState([]);
  const [selectedReader, setSelectedReader] = useState(null) as any;
  const [readerConnectionStatus, setReaderConnectionStatus] =
    useState("not_connected");
  const [pendingPaymentIntentSecret, setPendingPaymentIntentSecret] = useState(
    null
  ) as any;
  const [cancelablePayment, setCancelablePayment] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0)as any;

  let _initiateStripeTerminal: any = useRef(null);

  useEffect(() => {
    ipcRenderer.on('update_available', () => {
      console.log("++++++")
      setOpenAppUpdate(true)
    });

    ipcRenderer.on('download-progress', (_: any, progress: number) => {
      console.log('+++', {progress})
      setDownloadProgress(progress);
    });

    return () => {
      ipcRenderer.removeAllListeners()
    }
  }, [])

  useEffect(() => {
    const reader = Object.keys(Utils.getStorage().reader).length;
    setConnectorReaderIntializeStatus(
      reader ? "connected" : DEFAULT_STRIPE_INIT_STATUS
    );
  }, []);
  /**
   * @App_Update_States
   */
  const [openAppUpdate, setOpenAppUpdate] = useState(false);
  const [isAppUpdateProgressModalOpen, setAppUpdateProgressModalOpen] =
    useState(false);
  const [isAppUpdateLaterModalOpen, setAppUpdateLaterModalOpen] =
    useState(false);

  /**
   * @functions
   */
  const doChoosePaymentDefaultAPI = (props: any) => {
    const { cbk = () => "" } = props || {};
    const pathName = `${Constants.GET_PAYMENT_GATEWAY}/${Constants.APP_SOURCE_TYPE}`;
    let apiData = {
      pathName: pathName,
      isBearerDisable: false,
      isTenantIdRequired: true,
    };

    ApiServices.getGetAPI({ ...apiData })
      .then((res: any) => {
        const { data = {} } = res;
        const { data: paymentGatewayConfig = {} } = data;
        const {
          Payment_Method_Type = HEARTLAND_GATEWAY,
          pmsFlag = false,
          Api_key = "",
          publishable_key = "",
        } = paymentGatewayConfig;
        localStorage.setItem(
          GlobalFixture.STORAGE_FIXTURE_CONTENTS.PAYMENT_GATEWAY,
          Payment_Method_Type
        );
        setPaymentType(Payment_Method_Type);
        if (
          Payment_Method_Type ===
          GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS.STRIPE_GATEWAY
        ) {
          localStorage.setItem(
            GlobalFixture.STORAGE_FIXTURE_CONTENTS.STRIPE_SECRET_KEY,
            Api_key
          );
          localStorage.setItem(
            GlobalFixture.STORAGE_FIXTURE_CONTENTS.STRIPE_PUBLISHABLE_KEY,
            publishable_key
          );
        }
        cbk({
          status: API_SUCCESS_STATUS,
          payType: Payment_Method_Type,
          pmsFlag,
        });
      })
      .catch(err => {
        const { data = {} } = err?.response || {};
        const { message = DEFAULT_GATE_WAY_ERROR_MESSAGE } = data || {};
        if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(message);
        }
        cbk({ status: API_FAIL_STATUS });
      });
  };
  const getLocationsApi = (props: any) => {
    const { cbk = () => "" } = props || {};
    const pathName = Constants.GET_LOCATION;
    const { stripe_secret = "" } = Utils.getStorage() as any;
    let bodyParams = {
      api_key: stripe_secret,
    };
    if (!stripe_secret) {
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
      window?.OuterSnackbar.setMessage(
        GlobalFixture.TOTAL_CONTENTS.STRIPE_KEY_NOT_FOUND
      );
    }
    let apiData = {
      pathName: pathName,
      isBearerDisable: true,
      prefixUrl: ApiServices.stripeConnectDomainUrl,
      body: { ...bodyParams },
    };
    ApiServices.getGetAPI({ ...apiData })
      .then(res => cbk(res.data))
      .catch(err => {
        const { data = {} } = err?.response || {};
        const {
          message = GlobalFixture.TOTAL_CONTENTS.STRIPE_GET_LOCATIONS_ERROR,
        } = data || {};
        if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(message);
        }
      });
  };
  const registerAndConnectApi = (props: any) => {
    const {
      cbk = () => "",
      locationId = "",
      registrationCode = "",
      label = "",
    } = props || {};
    const pathName = Constants.REGISTER_READER;
    const { stripe_secret = "" } = Utils.getStorage() as any;
    if (!stripe_secret) {
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
      window?.OuterSnackbar.setMessage(
        GlobalFixture.TOTAL_CONTENTS.STRIPE_KEY_NOT_FOUND
      );
    }
    let apiData = {
      pathName: pathName,
      isBearerDisable: true,
      body: {
        location: locationId,
        label,
        registration_code: registrationCode,
        api_key: stripe_secret,
      },
      prefixUrl: ApiServices.localDomainURL,
    };

    ApiServices.getPostAPI({ ...apiData })
      .then((res: any) => {
        cbk({
          status: API_SUCCESS_STATUS,
          data: res?.data || {},
        });
      })
      .catch(err => {
        const { data = {} } = err?.response || {};
        const { message = "Failed to Register Reader!" } = data || {};
        if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(message);
        }
        cbk({
          status: API_FAIL_STATUS,
          data: {},
        });
      });
  };
  const userAuthenticationAPI = (props: any) => {
    const {
      setIsLoading = () => "",
      setValidUser = () => false,
      setErrorMessage = () => "",
      userName = "",
      pinCode = "",
      checkAgeRestriction = false,
    } = props;
    setIsLoading(true);
    let pathName = Constants.LOGIN;
    const payload = {
      user_name: userName,
      password: pinCode,
    };
    let apiData = {
      pathName: pathName,
      body: payload,
      isBearerDisable: true,
      prefixUrl: ApiServices.localDomainURL,
    };
    ApiServices.getPostAPI({ ...apiData })
      .then((res: any) => {
        if (res.status === 200) {
          if (
            res.data.status === API_FAILED_STATUS ||
            res.data.status === API_ERROR_STATUS
          ) {
            setValidUser(true);
            setErrorMessage(res.data.message);
            localStorage.removeItem(
              GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED
            );
            setIsAuthenticated(false);
          } else {
            localStorage.setItem(
              GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED,
              "true"
            );
            setIsAuthenticated(true);
            if (checkAgeRestriction) {
              setAgeRestrictionChecked(false);
              localStorage.setItem(
                GlobalFixture.STORAGE_FIXTURE_CONTENTS.ADULT_VERIFIED,
                "true"
              );
            }
          }
        }
        setIsLoading(false);
      })
      .catch(err => {
        const { data = {} } = err?.response || {};
        const { message = LOGIN_API_FAIL_ERROR_MSG } = data || {};
        if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(message);
        }
        setIsLoading(false);
        localStorage.removeItem(
          GlobalFixture.STORAGE_FIXTURE_CONTENTS.IS_AUTHENTICATED
        );
        setIsAuthenticated(false);
      });
  };
  const doCloseTheTransaction = (props: any) => {
    const {
      cbk = () => "",
      setIsBackdropLoading = () => false,
      setIsPayClickLoadingLoading = () => false,
    } = props;
    setIsBackdropLoading(true);
    const { transactionId = "" } = Utils.getStorage();
    if (!transactionId) {
      return;
    }
    const pathName = `${Constants.CLOSE_TRANSACTION}/${transactionId}`;

    let apiData = {
      prefixUrl: ApiServices.localDomainURL,
      pathName: pathName,
      isBearerDisable: false,
      isAuthShow: true,
      isTenantIdRequired: true,
    };
    ApiServices.getPostAPI({ ...apiData })
      .then((res: any) => {
        setIsBackdropLoading(false);
        setIsPayClickLoadingLoading(false);
        cbk({ status: API_SUCCESS_STATUS, data: res?.data || {} });
      })
      .catch(err => {
        const { data = {} } = err?.response || {};
        const { message = CLOSE_TRANSACTION_ERROR_MESSAGE } = data || {};
        if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(message);
        }
        setIsBackdropLoading(false);
        setIsPayClickLoadingLoading(false);
        cbk({ status: API_FAIL_STATUS, data: {} });
      });
  };
  const getIsIP_Valid = (ip: string) =>
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi.test(
      ip
    );
  const onHandleChangeIP_Address = (event: any) => {
    const isIpValid = getIsIP_Valid(event.target.value);
    setIpAddressValid(isIpValid);
    setIpAddress(event.target.value);
    if (!event.target.value) {
      setheartLandInputFieldError({
        ...heartLandInputFieldError,
        ipAddress: HEARTLAND_IP_REQUIRED,
      });
    } else if (!isIpValid) {
      setheartLandInputFieldError({
        ...heartLandInputFieldError,
        ipAddress: HEARTLAND_VALID_IP_REQUIRED,
      });
    } else {
      setheartLandInputFieldError({
        ...heartLandInputFieldError,
        ipAddress: "",
      });
    }
  };
  const doTriggerHEARTLAND_PAXA35 = () => {
    /**
     * @DO_MODAL_CREATION_NEED_DO
     */
    let isValidIP = getIsIP_Valid(ipAddress);
    setIpAddressValid(isValidIP);
    setIsHeartLandConnectorModalOpen(true);
  };
  const onHandleHeartLandConnectReader = (props: any) => {
    const { ipAddress = "", port = "" } = props || {};
    setIsConnectingHearLandReader(true);
    if (!ipAddress || !port) {
      return;
    }
    /**
     *@DO_initialize_heartland
     */
    setTimeout(() => {
      window.PAX.Settings(ipAddress, port);
      let getPaxInitializeObject = {
        command: Constants.HEART_LAND_INIT_COMMAND,
        version: Constants.HEART_LAND_INIT_VERSION,
      } as any;
      window.PAX.Initialize(getPaxInitializeObject, async (res: any) => {
        localStorage.setItem(
          GlobalFixture.STORAGE_FIXTURE_CONTENTS.HEARTLAND_IP_ADDRESS,
          ipAddress
        );
        if (res === HEARTLAND_INIT_FAIL) {
          window.heartLandPaxIntializeStatus = HEARTLAND_INIT_FAIL;
          window.isHeartLandConnected = false;
          setIsConnectingHearLandReader(false);
          setHeartLandPaxIntializeStatus(HEARTLAND_INIT_FAIL);
          setIsHeartLandConnectorModalOpen(true);
        } else {
          window.heartLandPaxIntializeStatus = HEARTLAND_INIT_SUCCESS;
          window.isHeartLandConnected = true;
          setIsConnectingHearLandReader(false);
          setHeartLandPaxIntializeStatus(HEARTLAND_INIT_SUCCESS);
          setIsHeartLandConnectorModalOpen(false);
        }
      });
    }, 100);
  };
  const handleConnectReaderCBK = (props: any) => {
    const { status = "", data = {}, deviceData = {} } = props || {};
    if (status === API_SUCCESS_STATUS) {
      localStorage.setItem(
        GlobalFixture.STORAGE_FIXTURE_CONTENTS.READER_CONFIG,
        JSON.stringify(data.message) || STRINGIFIED_JSON
      );
      localStorage.setItem(
        GlobalFixture.STORAGE_FIXTURE_CONTENTS.PAYMENT_DEVICE_INFO,
        data?.message.id
      );
      setConnectorReaderIntializeStatus(STRIPE_INIT_SUCCESS);
      setIsConnectingReader(false);
      setIsConnectReaderModalOpen(false);
    }
    if (status === API_FAIL_STATUS) {
      setConnectorReaderIntializeStatus(STRIPE_INIT_FAIL);
      setIsConnectingReader(false);
      setIsConnectReaderModalOpen(true);
    }
  };
  const onHandleConnectReader = (props: any) => {
    const { registrationCode = "", locationId = "", label = "" } = props || {};
    setIsConnectingReader(true);
    const apiPayload = {
      registrationCode,
      label,
      locationId,
      cbk: (responseProps: any) => {
        handleConnectReaderCBK(responseProps);
      },
    };
    registerAndConnectApi({ ...apiPayload });
  };
  const doTriggerSTRIPE = () => {
    //setIsConnectReaderModalOpen(true);
    setIsDiscoverReaderModalOpen(true);
    getLocationsApi({
      cbk: (response: any) => {
        const { status = "", data = [] } = response;
        if (status === API_SUCCESS_STATUS) {
          setLocations(data);
        } else {
          setLocations([]);
        }
      },
    });
  };
  const doUpdateTransactionStatus = (props: any) => {
    const { status = false, cbk = () => "" } = props;
    const { transactionId = "" } = Utils.getStorage();
    if (!transactionId) {
      return;
    }
    let pathName = `${Constants.PAUSE_TRANSACTION}/${transactionId}/update/status/${status}`;
    let apiData = {
      pathName,
      body: {},
      isBearerDisable: false,
      isTenantIdRequired: true,
      prefixUrl: ApiServices.localDomainURL,
    };

    ApiServices.getPostAPI({
      ...apiData,
    })
      .then(res => {
        const { data = {} } = res;
        cbk({ status: API_SUCCESS_STATUS, data });
      })
      .catch(err => {
        const { data = {} } = err?.response || {};
        const { message = "Failed to enable cart summary MQTT status" } =
          data || {};
        if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(message);
        }
        cbk({ status: API_FAIL_STATUS, data: {} });
      });
  };
  const doUpdatePaylaterTransactionStatus = (props: any) => {
    const { transactionId = "", storeId: locationId } = Utils.getStorage();
    if (!transactionId) {
      return;
    }
    const { lastName = "", cbk = () => "", roomNo = "", zipcode = "" } = props;

    let pathName = `/api/dk/pay/later`;
    let apiData = {
      pathName,
      body: {
        lastName,
        roomNo,
        zipcode,
        transactionId,
        locationId,
      },
      isBearerDisable: false,
      isTenantIdRequired: true,
      prefixUrl: ApiServices.localDomainURL,
    };

    ApiServices.getPostAPI({
      ...apiData,
    })
      .then(res => {
        const { data = {} } = res;
        cbk({ status: API_SUCCESS_STATUS, data });
      })
      .catch(err => {
        const { data = {} } = err?.response || {};
        const { message = `${pathName} failed` } = data || {};
        cbk({ status: API_FAIL_STATUS, data: { message } });
      });
  };
  const doCancelHeartlandPayment = (props: any) => {
    const { cbk = () => "" } = props || {};
    const { heartLandIpAddress = "" } = Utils.getStorage() || {};
    setTimeout(() => {
      window.PAX.Settings(
        heartLandIpAddress,
        Constants.HEART_LAND_CANCEL_PAY_PORT
      );
      let getPaxInitializeObject = {
        command: Constants.HEART_LAND_CANCEL_COMMAND,
        version: Constants.HEART_LAND_INIT_VERSION,
      } as any;
      window.PAX.Initialize(getPaxInitializeObject, async (res: any) => {
        if (res === HEARTLAND_INIT_FAIL) {
          window.heartLandPaxIntializeStatus = HEARTLAND_INIT_SUCCESS;
          window.isHeartLandConnected = true;
          setIsConnectingHearLandReader(false);
          setHeartLandPaxIntializeStatus(HEARTLAND_INIT_SUCCESS);
          setIsHeartLandConnectorModalOpen(false);
          cbk({ status: "failed", responseData: res });
        } else {
          window.heartLandPaxIntializeStatus = HEARTLAND_INIT_FAIL;
          window.isHeartLandConnected = false;
          setIsConnectingHearLandReader(false);
          setHeartLandPaxIntializeStatus(HEARTLAND_INIT_FAIL);
          cbk({ status: API_SUCCESS_STATUS, responseData: res });
        }
      });
    }, 100);
  };
  const doGetWisePOSConnectionToken = async () => {
    let pathName = Constants.GET_WISPOSE_CONNECTION_TOKEN;
    const { stripe_secret = "" } = Utils.getStorage() as any;
    let bodyParams = {
      api_key: stripe_secret,
    };
    if (!stripe_secret) {
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
      window?.OuterSnackbar.setMessage(
        GlobalFixture.TOTAL_CONTENTS.STRIPE_KEY_NOT_FOUND
      );
    }
    return await ApiServices.getPostAPI({
      prefixUrl: ApiServices.apiDomainURL,
      pathName: pathName,
      body: { ...bodyParams },
    })
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        const { message = "Failed to fetch WisePOS connection token" } =
          error?.response || {};
        if (message === TYPE_STRING) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(message);
        }
        return {};
      });
  };
  const doCreatePaymentIntent = async (props: any) => {
    const {
      amount = 0,
      currency = "usd",
      description = "",
      paymentMethodTypes = [],
    } = props || {};
    const formData = new URLSearchParams();
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("description", description);
    paymentMethodTypes.forEach((type: string) =>
      formData.append(`payment_method_types[]`, type)
    );
    const { stripe_secret = "" } = Utils.getStorage() as any;
    if (!stripe_secret) {
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
      window?.OuterSnackbar.setMessage(
        GlobalFixture.TOTAL_CONTENTS.STRIPE_KEY_NOT_FOUND
      );
    }
    let payload = JSON.parse(
      JSON.stringify({
        currency: currency,
        amount: Math.ceil(Number(amount) * 100),
        api_key: stripe_secret,
      })
    );
    return ApiServices.getPostAPI({
      prefixUrl: ApiServices.apiDomainURL, //"https://dev8.digitkart.ai",
      pathName: Constants.CREATE_PAYMENT_INTENT,
      body: payload,
    })
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error;
      });
  };
  const doCancelPaymentIntent = async (props: any) => {
    const { cbk = () => "" } = props || {};
    setPendingPaymentIntentSecret(null);
    setCancelablePayment(false);
    cbk({ status: API_SUCCESS_STATUS });
  };
  const doCapturePaymentIntent = async (props: any) => {
    const { paymentIntentId = "" } = props || {};
    const formData = new URLSearchParams();
    formData.append("payment_intent_id", paymentIntentId);
    const { stripe_secret = "" } = Utils.getStorage() as any;
    if (!stripe_secret) {
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
      window?.OuterSnackbar.setMessage(
        GlobalFixture.TOTAL_CONTENTS.STRIPE_KEY_NOT_FOUND
      );
    }
    let payload = JSON.parse(
      JSON.stringify({
        paymentIntent: paymentIntentId,
      })
    );
    return ApiServices.getPostAPI({
      prefixUrl: ApiServices.localDomainURL, //"https://dev8.digitkart.ai",
      pathName: Constants.CAPTURE_PAYMENT,
      body: payload,
    })
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error;
      });
  };
  const hasPermission = (fieldProps: any) => {
    const { permissons = GlobalFixture.API_FIXTURE_CONTENTS.STRINGIFIED_JSON } =
      Utils?.getStorage() || {};
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
  const onCancelUpdateNow = () => {
    ipcRenderer.send('cancel-update');
    setAppUpdateProgressModalOpen(false)
  }
  const onHandleUpdateNow = (onChangeProps: any) => {
    ipcRenderer.send('downloadNInstall');
    setAppUpdateProgressModalOpen(true);
  };
  const onHandleUpdateLater = (onChangeProps: any) => {
    setAppUpdateLaterModalOpen(true);
  };
  const onHandleChangeDatePicker = (datePickerProps: any) => {
    console.log(datePickerProps?.$d);
  };
  const onCloseDatePicker = () => {
    setAppUpdateLaterModalOpen(false);
  };
  const onSubmitDatePickerValue = (submitProps: any) => {
    console.log(submitProps?.$d);
    setAppUpdateLaterModalOpen(false);
    setOpenAppUpdate(false);
  };
  useEffect(() => {
    if (Utils.getStorage().isAuthenticated)
      doChoosePaymentDefaultAPI({
        tenantId: Utils.getStorage().tenantId,
        cbk: (responseProps: any) => {},
      });
  }, []);
  return {
    doChoosePaymentDefaultAPI,
    userAuthenticationAPI,
    onHandleChangeIP_Address,
    doTriggerHEARTLAND_PAXA35,
    doTriggerSTRIPE,
    onHandleHeartLandConnectReader,
    onHandleConnectReader,
    getLocationsApi,
    registerAndConnectApi,
    getIsIP_Valid,
    doCloseTheTransaction,
    getPaymentType,
    setPaymentType,
    heartLandPaxIntializeStatus,
    setHeartLandPaxIntializeStatus,
    isHeartLandConnectorModalOpen,
    setIsHeartLandConnectorModalOpen,
    isConnectingHearLandReader,
    setIsConnectingHearLandReader,
    ipAddress,
    setIpAddress,
    port,
    setPort,
    isIpAddressValid,
    setIpAddressValid,
    heartLandInputFieldError,
    setheartLandInputFieldError,
    isAuthenticated,
    setIsAuthenticated,
    connectorReaderIntializedStatus,
    setConnectorReaderIntializeStatus,
    isConnectingReader,
    setIsConnectingReader,
    isConnectReaderModalOpen,
    setIsConnectReaderModalOpen,
    locations,
    setLocations,
    isHeartLandConnected,
    setIsHeartLandConnected,
    doUpdateTransactionStatus,
    doCancelHeartlandPayment,
    doUpdatePaylaterTransactionStatus,
    ageRestrictChecked,
    setAgeRestrictionChecked,
    isDiscoverReaderModalOpen,
    setIsDiscoverReaderModalOpen,
    _initiateStripeTerminal,
    discoveryInProgress,
    setDiscoveryInProgress,
    requestInProgress,
    setRequestInProgress,
    discoveredReaders,
    setDiscoveredReaders,
    selectedReader,
    setSelectedReader,
    setReaderConnectionStatus,
    doCreatePaymentIntent,
    pendingPaymentIntentSecret,
    setPendingPaymentIntentSecret,
    cancelablePayment,
    setCancelablePayment,
    doCancelPaymentIntent,
    doCapturePaymentIntent,
    readerConnectionStatus,
    hasPermission,
    openWarningScan,
    setOpenWarningScan,
    isAppUpdateProgressModalOpen,
    setAppUpdateProgressModalOpen,
    onHandleUpdateNow,
    onHandleUpdateLater,
    openAppUpdate,
    setOpenAppUpdate,
    isAppUpdateLaterModalOpen,
    setAppUpdateLaterModalOpen,
    onHandleChangeDatePicker,
    onCloseDatePicker,
    onSubmitDatePickerValue,
    downloadProgress,
    onCancelUpdateNow
  };
}

export { useGlobalAppState };

export default useGlobalAppState;
