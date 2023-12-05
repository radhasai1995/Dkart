import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import * as API from "./api";
import * as CartFixture from "./fixture";
import * as PageConfiguration from "@pageConfiguration";
import * as GlobalFixture from "@globalFixture";
import * as ApiServices from "@apiService";
import * as Constants from "@constants";
import * as Utils from "@utils";

/**
 * @TODO_TESING_PURPOSE_TODO_MOVE_GLOBAL_STATE_BINDING
 */

const {
  HEART_LAND_INIT_VERSION,
  HEART_LAND_TRANSACTION_TYPE_SCALE,
  HEART_LAND_CREDIT_COMMAND,
  HEART_LAND_CONNECT_PORT,
  HEART_LAND_INIT_COMMAND,
  MOBILE_SOURCE_TYPE,
  CART_MQTT_ENDPOINT,
} = Constants;

const { SEVERITY_ERROR, API_SUCCESS_STATUS,API_FAIL_STATUS, TYPE_NUMBER, TYPE_STRING } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const {
  PAYMENT_TIMEOUT,
  PAYMENT_SUCCEEDED,
  PAYMENT_FAILED,
  PAYMENT_PROCESSING,
  PAYMENT_CURRENCY_TYPE,
  HEARTLAND_INIT_FAIL,
  HEARTLAND_INIT_SUCCESS,
  HEARTLAND_GATEWAY,
  HEARTLAND_CREDIT_SUCCESS,
  HEARTLAND_CREDIT_DECLINED,
  HEARTLAND_CREDIT_TIMEOUT,
} = GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;
const { TRANSACTION_ID, PAYMENT_GATEWAY, IS_AUTHENTICATED, ADULT_VERIFIED } =
  GlobalFixture.STORAGE_FIXTURE_CONTENTS;

const useCartStates = () => {
  const { transactionId = "" } = Utils?.getStorage() || {};
  const navigateTo = useNavigate();
  const locationKit = useLocation();
  const { pathname = "" } = locationKit || {};
  const {
    DEFAULT_INIT_TIMER_MINUTES,
    DEFAULT_INIT_TIMER_SECONDS,
    DEFAULT_PAYMENT_HOLD_TIMER_MINUTES,
    DEFAULT_PAYMENT_HOLD_TIMER_SECONDS,
    PAYMENT_HOLD_TIMER_INTERVAL,
    INIT_TIMER_INTERVAL,
    TRIGGER_INIT_TIMER_INTERVAL,
    defaultPayLaterInfo = [],
  } = CartFixture.useCartFixtures();

  const cancelPooling: any = useRef(null);
  const [getPayLaterInfo, setPayLaterInfo] = useState(defaultPayLaterInfo);
  const [cartTransactionData, setCartTransactionData] = useState<any>({});
  const [isCartHasUnknowProduct, setIsCartHasUnknowProduct] = useState(false); //hide
  const [isCartHasProduct, setIsCartHasProduct] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(DEFAULT_INIT_TIMER_MINUTES);
  const [timerSeconds, setTimerSeconds] = useState(DEFAULT_INIT_TIMER_SECONDS);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isBackdropLoading, setIsBackdropLoading] = useState(false);
  const [isPayClickLoading, setIsPayClickLoadingLoading] = useState(false);
  const [isPms, setIsPms] = useState(false);
  const [isCartSummaryLoading, setIsCartSummaryLoading] = useState(false);
  let myInitTimerInterval: any = useRef(null);
  let myTriggerTimerInterval: any = useRef(null);
  let paymentInitTimerInterval: any = useRef(null);
  const [paymentTimerMinutes, setPaymentTimerMinutes] = useState(
    DEFAULT_PAYMENT_HOLD_TIMER_MINUTES
  );
  const [paymentTimerSeconds, setPaymentTimerSeconds] = useState(
    DEFAULT_PAYMENT_HOLD_TIMER_SECONDS
  );
  const [inputValues, setInputValues] = useState({
    amount: "0",
    currency: PAYMENT_CURRENCY_TYPE.toLowerCase(),
  });
  const [isCancelPayLoading, setisCancelPayLoading] = useState(false);
  const [productLoading, setProductLoading] = useState<Boolean>(false);
  const [isCancelPaymentHidden, setIsCancelPaymentHidden] = useState(false);
  const [plErrorMessage, setPLErrorMessage] = useState(false);
  const [plProcessing, setPlProcessing] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const productLoadingTimer = useRef<any>();
  const paymentIntentRef = useRef<any>();

  const { mqttConnect, mqttSub, mqttUnSub, connectionStatus, payload }: any =
    Utils.useMQTTSocketHookState();
  let isConnectionStatus = (connectionStatus ===
    GlobalFixture.API_FIXTURE_CONTENTS.MQTT_STATUS_CONNECTED) as any;
  const globalAppStates = useContext(Utils.GlobalAppContext);
  const {
    setHeartLandPaxIntializeStatus = () => "",
    setIsHeartLandConnectorModalOpen = () => false,
    setIsConnectingHearLandReader = () => false,
    doChoosePaymentDefaultAPI = () => "",
    setIsHeartLandConnected = () => false,
    doCloseTheTransaction = () => "",
    doUpdateTransactionStatus = () => "",
    doCancelHeartlandPayment = () => "",
    doUpdatePaylaterTransactionStatus = () => "",
    ageRestrictChecked,
    setAgeRestrictionChecked = () => "",
    doCreatePaymentIntent = () => "",
    pendingPaymentIntentSecret = "",
    setPendingPaymentIntentSecret = () => "",
    doInitiateStripeTerminal = () => {},
    setCancelablePayment = () => false,
    doCapturePaymentIntent = () => "",
    readerConnectionStatus = "",
    setOpenWarningScan,
  } = globalAppStates as any;

  const onCartInitLoad = () => {
    let cartMqttUrl = ApiServices.mqttDomainUrl;
    mqttConnect(cartMqttUrl);
    if (transactionId) {
      doGetCartTransactionData({
        cbk: (responseProps: any) => {
          const { status = "", data = {} } = responseProps;
          if (status === API_SUCCESS_STATUS) {
            setCartTransactionData({ ...cartTransactionData, ...data.data });
          }
        },
        transactionId: transactionId,
      });
    }
    localStorage.removeItem(ADULT_VERIFIED);
    runOpenCartTransactionSocketMQTT();
    return () => {
      doResetTimer();
      doResetTriggerTimer();
    };
  };
  const onCartTriggerConnectionStatusUpdate = () => {
    if (isConnectionStatus) {
      mqttSub({
        topic: `${CART_MQTT_ENDPOINT}/${transactionId}`,
        qos: 0,
      });

      mqttSub({
        topic: Constants.SCAN_TRIGGER_TOPIC,
        qos: 0,
      });
    }
    if (
      connectionStatus ===
      GlobalFixture.API_FIXTURE_CONTENTS.MQTT_STATUS_CONNECTED
    ) {
      setIsSocketConnected(true);
    } else {
      setIsSocketConnected(false);
    }

    return () => {
      mqttUnSub({
        topic: `${CART_MQTT_ENDPOINT}/${transactionId}`,
        qos: 0,
      });
      mqttUnSub({
        topic: Constants.SCAN_TRIGGER_TOPIC,
        qos: 0,
      });
    };
  };
  const onUpdatePayloadMQTT = () => {
    const { isAdultVerified } = Utils.getStorage();
    if (!_.isEmpty(payload)) {
      /**
       *@MESSAGE_INCOMING
       **/
      if (payload.topic === `${CART_MQTT_ENDPOINT}/${transactionId}`) {
        doResetTimer();
        doResetTriggerTimer();
        doTriggerInitTimer({
          flowMessageFrom: "mqtt message income",
          isPayClickLoadingL: isPayClickLoading,
        });
        const msg = payload?.message;
        if (productLoadingTimer.current) {
          setProductLoading(false);
          clearTimeout(productLoadingTimer.current);
        }
        const { status = "", terminalData: data = {} } = msg;
        const {
          source = "",
          products: items = [],
          unknownImageFlag = false,
        } = data;

        const adultVerifFlag = items.some((i: any) => i.adultVerifFlag);
        if (adultVerifFlag && isAdultVerified !== "true") {
          setAgeRestrictionChecked(true);
        }
        const scannedItems = items.filter((i: any) => i.scanFalg);
        if (scannedItems.length) {
          let trigger = false;
          scannedItems.forEach((item: any) => {
            trigger = !cartTransactionData.products.find(
              (tr: any) => tr.item_id === item.item_id
            );
          });
          if (trigger) {
            setOpenWarningScan(true);
          }
        }

        setCartTransactionData(data);
        let isSourceValid = source ? 1 : 0;
        let sourceValue = isSourceValid ? source.toLocaleLowerCase() : "";
        let isStatusValid = status ? 1 : 0;
        let statusValue = isStatusValid ? status.toLocaleLowerCase() : "";
        if (sourceValue === MOBILE_SOURCE_TYPE) {
          if (statusValue === PAYMENT_SUCCEEDED) {
            setPaymentStatus(PAYMENT_SUCCEEDED);
            setIsPaymentProcessing(false);
            /**
             * navigate to success transaction screen
             */
          } else if (statusValue === PAYMENT_FAILED) {
            setPaymentStatus(PAYMENT_FAILED);
            setIsPaymentProcessing(false);
            /**
             * navigate to failed transaction screen
             */
          } else if (statusValue === PAYMENT_PROCESSING) {
            setPaymentStatus(PAYMENT_PROCESSING);
            setIsPaymentProcessing(true);
          }
        } else {
          setPaymentStatus("");
          if (items && !items.length) {
            setInputValues({ ...inputValues, amount: "0" });
            setIsCartHasProduct(false);
          }
          if (unknownImageFlag) {
            setIsCartHasUnknowProduct(true);
          } else {
            const { cartTotalPrice = 0 } = data || {};
            let price = "0";
            if (typeof cartTotalPrice === TYPE_NUMBER) {
              price = cartTotalPrice.toString();
            }
            if (typeof cartTotalPrice === TYPE_STRING) {
              price = cartTotalPrice;
            }
            price = (Number(price) * 100).toString();
            setInputValues({ ...inputValues, amount: price });
            setIsCartHasProduct(true);
            setIsCartHasUnknowProduct(false);
          }
        }
      }
      if (payload.topic === Constants.SCAN_TRIGGER_TOPIC) {
        const res = payload.message;

        if (res) {
          if (!productLoading) {
            setProductLoading(true);
          }

          if (productLoadingTimer.current) {
            clearTimeout(productLoadingTimer.current);
          }
          productLoadingTimer.current = setTimeout(() => {
            setProductLoading(false);
          }, 4000);
        }
      }
    }
  };

  const triggerBarcodeDetected = (value: any) => {
    if (isSocketConnected) {
      /**@Bugfix- 1293 */
      API?.doAddItemTOCart({
        barcode: value,
        cbk: (responseProps: any) => {
          const { status = "" } = responseProps;
        },
      });
    }
  };
  const doTriggerAddItemToCart = (value: any) => {
    setIsBackdropLoading(true);
    API?.doAddItemTOCart({
      barcode: value,
      cbk: (responseProps: any) => {
        setIsBackdropLoading(false);
      },
    });
  };
  const doTriggerRemoveItemFromCart = (value: any) => {
    setIsBackdropLoading(true);
    API?.doRemoveItemFromCart({
      barcodeDetails: value,
      setIsBackdropLoading,
      cbk: (responseProps: any) => {
        setIsBackdropLoading(false);
      },
    });
  };
  const runCloseCartTransactionSocketMQTT = () => {
    /**
     *@MQTTSOCKET_CLOSING_METHOD
     **/
    if (isConnectionStatus) {
      let topic = `${CART_MQTT_ENDPOINT}/${transactionId}`;
      let qos = 0;
      mqttUnSub({
        topic,
        qos,
      });

      setIsSocketConnected(false);
    }
  };
  const runOpenCartTransactionSocketMQTT = (ignoreTimer = false) => {
    try {
      /**
       *@MQTTSOCKET_OPEN_CONNECTION_METHOD
       **/
      setIsCartSummaryLoading(true);
      mqttUnSub({
        topic: `${CART_MQTT_ENDPOINT}/${transactionId}`,
        qos: 0,
      });

      mqttSub({
        topic: `${CART_MQTT_ENDPOINT}/${transactionId}`,
        qos: 0,
      });
      setIsSocketConnected(true);
      if (!ignoreTimer) {
        doResetTimer();
        doResetTriggerTimer();
        doTriggerInitTimer({
          flowMessageFrom: "open mqtt connect",
          isPayClickLoadingL: isPayClickLoading,
        });
      }
      setTimeout(() => {
        setIsCartSummaryLoading(false);
      }, 2000);
    } catch (error) {
      /**
       * @MQTTSocket_Connection_Exception
       */
      setIsSocketConnected(false);
      setTimeout(() => {
        setIsCartSummaryLoading(false);
      }, 2000);
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
      window?.OuterSnackbar.setMessage("Couldn't connect to mqtt.");
    }
  };
  const triggerCloseTransaction = (apiProps: any) =>
    doCloseTheTransaction(apiProps);
  const doPaymentHeartLand = (props: any) => {
    const { cartTotalPrice = "0" } = props;
    setPlProcessing(false);
    let transactionTypeSale = HEART_LAND_TRANSACTION_TYPE_SCALE;
    let paymentDetails = CartFixture?.getPaymentHLPAXDetailsObject({
      TransactionAmount: Number(cartTotalPrice),
      HEART_LAND_CREDIT_COMMAND,
      HEART_LAND_INIT_VERSION,
      transactionTypeSale,
    });
    setTimeout(() => {
      const { heartLandIpAddress = "" } = Utils?.getStorage() || {};
      doHeartLandInitializeConnect({
        ipAddress: heartLandIpAddress,
        port: HEART_LAND_CONNECT_PORT,
        isForPayment: true,
        paymentDetails,
        cartTotalPrice,
        transactionTypeSale,
        cbk: (responseProps: any) => {
          const { status = "" } = responseProps || {};
          if (status === "fail") {
            doUpdateTransactionStatus({
              status: false,
              cbk: (responseProps: any) => {
                const { status = "" } = responseProps || {};
                if (status === API_SUCCESS_STATUS) {
                  runOpenCartTransactionSocketMQTT();
                }
              },
            });
          }
        },
      });
    }, 100);
  };
  const cancelPaymentCBK = (responseProps: any) => {
    const { status = "" } = responseProps;
    setisCancelPayLoading(false);
    if (status === API_SUCCESS_STATUS) {
      setPendingPaymentIntentSecret(null);
      setCancelablePayment(false);
      doUpdateTransactionStatus({
        status: false,
      });
      setIsPaymentProcessing(false);
      setIsPayClickLoadingLoading(false);
      setisCancelPayLoading(false);
      setIsBackdropLoading(false);
      runOpenCartTransactionSocketMQTT(true);
      doResetPaymentTimer();
    }
  };
  const onHanldePaymentCapture = (props: any) => {
    const { status = "", data = {}, amount = 0, paymentId, paid, requireCapture } = props || {};
    if (status === "success") {
      API?.doUpdateTransactionDetails({
        customerName: data?.payment_method?.card_present?.cardholder_name || "",
        amount: data?.amount_received,
        stripe_payment_status: data?.status,
        paymentStatus: PAYMENT_SUCCEEDED,
        paymentType: data?.payment_method?.card_present?.funding,
        cardNumber: data?.payment_method?.card_present?.last4,
        cardBrand: data?.payment_method?.card_present?.brand,
        paymentId: data?.id,
        fingerprint: data?.payment_method?.card_present?.fingerprint,
        cardExpiry: `${data?.payment_method?.card_present?.exp_month}/${data?.payment_method?.card_present?.exp_year}`,
      });

      triggerCloseTransaction({
        cbk: (responseProps: any) => {
          const { status = "" } = responseProps;
          if (status === API_SUCCESS_STATUS) {
            localStorage.setItem(TRANSACTION_ID, "");
            const { cartTotalPrice = "0" } = cartTransactionData as any;
            doResetPaymentTimer();
            navigateTo(PageConfiguration?.pathParams?.payment, {
              state: { paid: true, cartTotalPrice },
            });
          } else {
            /**
             * @TODO_CBK_ACTION_Do_Not_clear_the_transactionId_from_the_local_storage
             */
          }
          setIsBackdropLoading(false);
        },
      });
    } else {
      doResetPaymentTimer();
      doResetTimer();
      doResetTriggerTimer();
      setIsPayClickLoadingLoading(false);
      setIsCancelPaymentHidden(false);
      setisCancelPayLoading(false);
      setIsBackdropLoading(false);
      API.doCancelPaymentIntent({
        paymentIntent: paymentIntent,
        cbk: (responseProps: any) => {
          cancelPaymentCBK(responseProps);
        },
      });

      API?.doUpdateTransactionDetails({
        customerName: data?.card_present?.cardholder_name || "",
        amount: amount,
        paymentStatus: "require_capture",
        paymentType: data?.card_present?.funding || "",
        cardNumber: data?.card_present?.last4 || "",
        cardBrand: data?.card_present?.brand || "",
        paymentId: paymentId,
        cbk: (innerProps: any) => {
          localStorage.setItem(TRANSACTION_ID, "");
          const { cartTotalPrice = "0" } = cartTransactionData as any;
          navigateTo(PageConfiguration?.pathParams?.payment, {
            state: { paid: paid ?? true, require_capture: data.requireCapture ?? true, cartTotalPrice },
          });
        },
      });
    }
  };
  const doResetStateIfStripePaymentFlowFailed = () => {
    setIsPayClickLoadingLoading(false);
    setIsCancelPaymentHidden(false);
    setisCancelPayLoading(false);
    setIsBackdropLoading(false);
    doResetPaymentTimer();
    doResetTimer();
    doResetTriggerTimer();
    doUpdateTransactionStatus({
      status: false,
      cbk: (responseProps: any) => {
        const { status = "" } = responseProps || {};
        if (status === API_SUCCESS_STATUS) {
          runOpenCartTransactionSocketMQTT(true);
        }
      },
    });
    doTriggerInitTimer({
      flowMessageFrom: "payment intent not found",
      isPayClickLoadingL: false,
    });
  };
  console.log("----", {
    cancelPooling,
    paymentIntent
  })
  const callCaptureResult = ({
    paymentId,
    paymentItentId,
    amount
  }: any) => {
    if (cancelPooling.current) {
      cancelPooling.current = false
      return;
    } 
    doCapturePaymentIntent({
        paymentIntentId: paymentItentId
      }).then((captureResult: any) => {
        if (captureResult?.status === 200) {
          setPendingPaymentIntentSecret(null);
          onHanldePaymentCapture({
            ...captureResult.data,
            paymentId: paymentId,
            status: "success",
              amount,
            });
        } else if (captureResult?.response?.status === 402) {
          callCaptureResult({
          paymentId,
          paymentItentId,
          amount
        })
        } else if (captureResult?.response?.status === 401) {
          setPendingPaymentIntentSecret(null);
          API?.doUpdateTransactionDetails({
            paymentStatus: PAYMENT_FAILED,
            reason: "Declined",
            customerName: captureResult?.response?.data?.stack?.last_payment_error?.payment_method?.card_present?.cardholder_name || "",
            amount: amount,
            paymentType: captureResult?.response?.data?.stack?.last_payment_error?.payment_method?.card_present?.funding || "",
            cardNumber: captureResult?.response?.data?.stack?.last_payment_error?.payment_method?.card_present?.last4 || "",
            cardBrand: captureResult?.response?.data?.stack?.last_payment_error?.payment_method?.card_present?.brand || "",
            paymentId: captureResult?.response?.data?.stack?.id,
            cardExpiry: `${captureResult?.response?.data?.stack?.last_payment_error?.payment_method?.card_present?.exp_month}/${captureResult?.response?.data?.stack?.last_payment_error?.payment_method?.card_present?.exp_year}`,
            fingerprint: captureResult?.response?.data?.stack?.last_payment_error?.payment_method?.card_present?.fingerprint,
            message: captureResult?.response?.data?.stack?.last_payment_error?.message || "",
            cbk: (innerProps: any) => {
              doResetTimer();
              doResetPaymentTimer();
              doResetTriggerTimer();
              setIsPayClickLoadingLoading(false);
              setIsCancelPaymentHidden(false);
              setisCancelPayLoading(false);
              setIsBackdropLoading(false);
            },
          });
          navigateTo(PageConfiguration?.pathParams?.payment, {
          state: { paid: false },
          });
        }
      }).catch((err: any) => {
        callCaptureResult({
          paymentId,
          paymentItentId,
          amount
        })
      })
  }

  const handleCaptureResult = async ({
    paymentId,
    paymentItentId,
    amount
  }: any) => {
    callCaptureResult({
      paymentId,
      paymentItentId,
      amount
    })
  }

  const doCollectCardPayment = async (props: any) => {
    const { amount = 0, currency = "usd" } = props || {};
    // We want to reuse the same PaymentIntent object in the case of declined charges, so we
    // store the pending PaymentIntent's secret until the payment is complete.
    let _paymentPendingIntentSecret = pendingPaymentIntentSecret;
    // if (!_paymentPendingIntentSecret) {
      await API.doStartProcessPayment({
        amount: amount,
        currency: currency,
        cbk: async (createIntentResponse: any) => {
          const { data = {} , status} = createIntentResponse || {};
          setCancelablePayment(true);
      
          const { id: client_secret = "", action } = data || {};
          const paymentIntent = action?.process_payment_intent?.payment_intent;
          if (paymentIntent) {
            paymentIntentRef.current = paymentIntent
            setPaymentIntent(paymentIntent);
            setPaymentId(client_secret) 
          }

          if (client_secret) {
            setPendingPaymentIntentSecret(paymentIntent);
            _paymentPendingIntentSecret = paymentIntent;
            setIsCancelPaymentHidden(false);
            handleCaptureResult({
              paymentId: client_secret,
              paymentItentId: paymentIntent,
              amount
            });
          } else {
            setCancelablePayment(false);
            setPendingPaymentIntentSecret(null);
            _paymentPendingIntentSecret = null;
              API?.doUpdateTransactionDetails({
                customerName: "Stripe Test",
                amount: amount,
                paymentStatus: PAYMENT_FAILED,
                paymentType: "Stripe:credit",
                cardNumber: "test-card",
                cardBrand: "",
                paymentId: client_secret,
                cbk: (responseProps: any) => {
                  setIsPayClickLoadingLoading(false);
                  setIsCancelPaymentHidden(false);
                  setisCancelPayLoading(false);
                  doResetTimer();
                  doResetPaymentTimer();
                  doResetTriggerTimer();
                  // navigateTo(PageConfiguration?.pathParams?.payment, {
                  //   state: { paid: false },
                  // });
                },
              });
            // const { message = "Payment intent id not found" } =
            //   JSON.parse(JSON.stringify(createIntentResponse)) || {};

            //   window?.OuterSnackbar.handleClickStack();
            //   window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
            //   window?.OuterSnackbar.setMessage(message);
             doResetStateIfStripePaymentFlowFailed();
          }
        }
      })
  };

  const doPaymentStripe = (props: any) => {
    const { cartTotalPrice = "0" } = props;
    const reader = Object.keys(Utils.getStorage().reader).length;
    if (reader) {
      setIsPayClickLoadingLoading(true);
      setIsCancelPaymentHidden(true);
      setPlProcessing(false);
      doInitPaymentTimer();
      doCollectCardPayment({
        amount: cartTotalPrice,
        currency: PAYMENT_CURRENCY_TYPE.toLowerCase(),
      });
    } else {
      doResetStateIfStripePaymentFlowFailed();
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
      window?.OuterSnackbar.setMessage(
        "Please make sure the reader is connected."
      );
    }
  };
  const doHeartLandInitializeConnect = (initializeProps: any) => {
    const {
      ipAddress = "",
      port = "",
      isForPayment = false,
      cbk = () => "",
      ...restProps
    } = initializeProps;
    window.PAX.Settings(ipAddress, port);
    let getPaxInitializeObject = {
      command: HEART_LAND_INIT_COMMAND,
      version: HEART_LAND_INIT_VERSION,
    } as any;
    window.PAX.Initialize(getPaxInitializeObject, async (res: any) => {
      if (res === HEARTLAND_INIT_FAIL) {
        window.heartLandPaxIntializeStatus = HEARTLAND_INIT_FAIL;
        window.isHeartLandConnected = false;
        setHeartLandPaxIntializeStatus(HEARTLAND_INIT_FAIL);
        setIsHeartLandConnected(false);
        setIsConnectingHearLandReader(false);
        setIsBackdropLoading(false);
        setIsPayClickLoadingLoading(false);
        doResetPaymentTimer();
        localStorage.setItem(IS_AUTHENTICATED, "true");
        setIsHeartLandConnectorModalOpen(true);
        cbk({ status: "fail" });
      } else {
        setHeartLandPaxIntializeStatus(HEARTLAND_INIT_SUCCESS);
        setIsHeartLandConnected(true);
        setIsHeartLandConnectorModalOpen(false);
        setIsConnectingHearLandReader(false);
        window.heartLandPaxIntializeStatus = HEARTLAND_INIT_SUCCESS;
        window.isHeartLandConnected = true;
        cbk({ status: "success" });
        if (isForPayment) {
          const {
            paymentDetails = {},
            cartTotalPrice = "0",
            transactionTypeSale = HEART_LAND_TRANSACTION_TYPE_SCALE,
          } = restProps;
          setIsPayClickLoadingLoading(true);
          setIsCancelPaymentHidden(true);
          doInitPaymentTimer();
          doHeartLandInitializePay({
            paymentDetails,
            cartTotalPrice,
            transactionTypeSale,
          });
        }
      }
    });
  };
  const doHeartLandInitializePay = (payementProps: any) => {
    const { paymentDetails = {} } = payementProps;
    window.PAX.DoCredit(paymentDetails, (response: any) => {
      setIsBackdropLoading(false);
      setIsPayClickLoadingLoading(false);
      doResetPaymentTimer();
      const [_a, _b, _c, _d, _e, processPaymentStatus = ""] = response || [];
      const resposeIndex14 = response[14] === undefined ? [] : response[14];
      const resposeIndex12 =
        resposeIndex14[12] === undefined ? "" : resposeIndex14[12];
      const resposeIndex1 =
        resposeIndex14[1] === undefined ? "" : resposeIndex14[1];
      const cardBrand = resposeIndex12
        ? resposeIndex12.slice(resposeIndex12.indexOf("=") + 1)
        : "";
      const cardType = resposeIndex1
        ? resposeIndex1.slice(resposeIndex1.indexOf("=") + 1)
        : "";
      const cardDetails = response[9] === undefined ? [] : response[9];
      const [last4 = "", _f, expiryDate = "", ...restDetails] =
        cardDetails || [];
      const cardHolderName = restDetails[4] === undefined ? "" : restDetails[4];
      const cardExpiry = !expiryDate
        ? ""
        : expiryDate.slice(0, expiryDate.length / 2) +
          "/" +
          expiryDate.slice(expiryDate.length / 2, expiryDate.length);
      const { cartTotalPrice = "0" } = cartTransactionData || {};
      if (processPaymentStatus === HEARTLAND_CREDIT_SUCCESS) {
        API?.doUpdateTransactionDetails({
          customerName: cardHolderName,
          amount: cartTotalPrice,
          paymentStatus: PAYMENT_SUCCEEDED,
          paymentType: cardType,
          cardNumber: last4,
          cardBrand: cardBrand,
          cardExpiry: cardExpiry,
          cbk: (innerProps: any) => {
            setIsPayClickLoadingLoading(false);
            doResetPaymentTimer();
            doResetTimer();
            doResetTriggerTimer();
          },
        });

        triggerCloseTransaction({
          cbk: (responseProps: any) => {
            const { status = "" } = responseProps;
            if (status === API_SUCCESS_STATUS) {
              localStorage.setItem(TRANSACTION_ID, "");
              navigateTo(PageConfiguration?.pathParams?.payment, {
                state: {
                  paid: true,
                  cartTotalPrice,
                },
              });
            }
            setIsBackdropLoading(false);
          },
        });
      } else if (processPaymentStatus === HEARTLAND_CREDIT_DECLINED) {
        const declinedStates = response[6] === undefined ? [] : response[6];
        const [_x, declinedReason = ""] = declinedStates || [];
        API?.doUpdateTransactionDetails({
          customerName: cardHolderName,
          amount: cartTotalPrice,
          paymentStatus: PAYMENT_FAILED,
          paymentType: cardType,
          cardNumber: last4,
          cardBrand: cardBrand,
          cardExpiry: cardExpiry,
          reason: declinedReason,
          cbk: (innerProps: any) => {
            setIsPayClickLoadingLoading(false);
            doResetTimer();
            doResetPaymentTimer();
            doResetTriggerTimer();
          },
        });
        navigateTo(PageConfiguration?.pathParams?.payment, {
          state: { paid: false },
        });
      } else if (processPaymentStatus === HEARTLAND_CREDIT_TIMEOUT) {
        API?.doUpdateTransactionDetails({
          customerName: "",
          amount: cartTotalPrice,
          paymentStatus: PAYMENT_TIMEOUT,
          paymentType: "",
          cardNumber: "",
          cardBrand: "",
          cardExpiry: "",
          cbk: (innerProps: any) => {
            setIsPayClickLoadingLoading(false);
            doResetTimer();
            doResetPaymentTimer();
            doResetTriggerTimer();
            doUpdateTransactionStatus({
              status: false,
              cbk: (responseProps: any) => {
                const { status = "" } = responseProps || {};
                if (status === API_SUCCESS_STATUS) {
                  runOpenCartTransactionSocketMQTT(true);
                }
              },
            });
            doTriggerInitTimer({
              flowMessageFrom: "updating transaction details",
              isPayClickLoadingL: false,
            });
          },
        });
      } else {
        API?.doUpdateTransactionDetails({
          customerName: cardHolderName,
          amount: cartTotalPrice,
          paymentStatus: PAYMENT_FAILED,
          paymentType: cardType,
          cardNumber: last4,
          reason: processPaymentStatus,
          cardBrand: cardBrand,
          cardExpiry: cardExpiry,
          cbk: (innerProps: any) => {
            setIsPayClickLoadingLoading(false);
            doResetTimer();
            doResetPaymentTimer();
            doResetTriggerTimer();
            doUpdateTransactionStatus({
              status: false,
              cbk: (responseProps: any) => {
                const { status = "" } = responseProps || {};
                if (status === API_SUCCESS_STATUS) {
                  runOpenCartTransactionSocketMQTT(true);
                }
              },
            });
            doTriggerInitTimer({
              flowMessageFrom: "updating transaction details",
              isPayClickLoadingL: false,
            });
          },
        });
        if (window?.OuterSnackbar) {
          window?.OuterSnackbar.handleClickStack();
          window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
          window?.OuterSnackbar.setMessage(processPaymentStatus);
        }
      }
    });
  };
  const doGetPaymentGateway = (payProps: any) => {
    const { cartTotalPrice = "0" } = payProps;
    const doPayMethod = {
      Heartland: doPaymentHeartLand,
      Stripe: doPaymentStripe,
    } as any;
    /**
     * do get Default Payment Gateway through Api
     */
    setIsBackdropLoading(true);
    doChoosePaymentDefaultAPI({
      cbk: (innerProps: any) => {
        const {
          status = "",
          payType = HEARTLAND_GATEWAY,
          pmsFlag,
        } = innerProps;
        setIsBackdropLoading(false);
        if (status === API_SUCCESS_STATUS) {
          localStorage.setItem(PAYMENT_GATEWAY, payType);
          if (pmsFlag) {
            setIsPms(pmsFlag);
            doResetTimer();
            doResetTriggerTimer();
            doTriggerInitTimer({
              flowMessageFrom: "Once PMS is set",
              isPayClickLoadingL: isPayClickLoading,
            });
          } else {
            setIsBackdropLoading(true);
            let doPayTrigger =
              doPayMethod[payType ? payType : HEARTLAND_GATEWAY];
            doPayTrigger({ cartTotalPrice });
          }
        } else {
          /** do necessary action */
          setIsPayClickLoadingLoading(false);
          doUpdateTransactionStatus({
            status: false,
            cbk: (responseProps: any) => {
              runOpenCartTransactionSocketMQTT(true);
            },
          });
          doResetTimer();
          doResetTriggerTimer();
          doTriggerInitTimer({
            flowMessageFrom: "after payment gateway api fetch fail ",
            isPayClickLoadingL: false,
          });
        }
      },
    });
  };
  const doPay = (payProps: any) => {
    const { cartTotalPrice = "0" } = payProps;
    const doPayMethod = {
      Heartland: doPaymentHeartLand,
      Stripe: doPaymentStripe,
    } as any;

    const payType = localStorage.getItem(PAYMENT_GATEWAY);

    let doPayTrigger = doPayMethod[payType ? payType : HEARTLAND_GATEWAY];
    doPayTrigger({ cartTotalPrice });
  };
  const onHandleClickPay = () => {
    runCloseCartTransactionSocketMQTT();
    doUpdateTransactionStatus({
      status: true,
    });
    doResetTimer();
    doResetTriggerTimer();
    const { cartTotalPrice = "0" } = cartTransactionData as any;
    doGetPaymentGateway({
      cartTotalPrice,
    });
  };
  const doGetCartTransactionData = (apiProps: any) =>
    API?.getCartTransactionData(apiProps);
  const doInitTimer = (
    initMin: number = DEFAULT_INIT_TIMER_MINUTES,
    initSec: number = DEFAULT_INIT_TIMER_SECONDS
  ) => {
    let minutes = initMin ?? DEFAULT_INIT_TIMER_MINUTES;
    let seconds = initSec ?? DEFAULT_INIT_TIMER_SECONDS;
    myInitTimerInterval.current = setInterval(() => {
      if (!pathname.includes("cart")) {
        doResetTimer();
      } else {
        if (seconds > 0) {
          seconds = seconds - 1;
          setTimerSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            doResetTimer();
            doResetTriggerTimer();

            setAgeRestrictionChecked(false);
            API?.doUpdateTransactionDetails({
              customerName: "",
              amount: cartTransactionData.cartTotalPrice,
              paymentStatus: "timeout",
              paymentType: "",
              cardNumber: "",
              cardBrand: "",
              cardExpiry: "",
              cbk: (innerProps: any) => {
                triggerCloseTransaction({
                  setIsBackdropLoading,
                  cbk: (responseProps: any) => {
                    const { status = "" } = responseProps;
                    if (status === API_SUCCESS_STATUS) {
                      localStorage.setItem(TRANSACTION_ID, "");
                      localStorage.removeItem(IS_AUTHENTICATED);
                      navigateTo(PageConfiguration?.pathParams?.home);
                    }
                  },
                });
              },
            });
          } else {
            minutes = minutes - 1;
            seconds = 59;
            setTimerMinutes(minutes);
            setTimerSeconds(seconds);
          }
        }
      }
    }, INIT_TIMER_INTERVAL); // interval for every seconds
  };
  const doResetTimer = (
    initMin: number = DEFAULT_INIT_TIMER_MINUTES,
    initSec: number = DEFAULT_INIT_TIMER_SECONDS
  ) => {
    setIsTimerStarted(false);
    if (myInitTimerInterval.current) {
      clearInterval(myInitTimerInterval.current);
      myInitTimerInterval.current = null;
    }
    setTimerMinutes(initMin || DEFAULT_INIT_TIMER_MINUTES);
    setTimerSeconds(initSec || DEFAULT_INIT_TIMER_SECONDS);
  };
  const doResetTriggerTimer = (
    initMin: number = DEFAULT_INIT_TIMER_MINUTES,
    initSec: number = DEFAULT_INIT_TIMER_SECONDS
  ) => {
    setIsTimerStarted(false);
    if (myTriggerTimerInterval.current) {
      clearInterval(myTriggerTimerInterval.current);
      myTriggerTimerInterval.current = null;
    }
    setTimerMinutes(initMin || DEFAULT_INIT_TIMER_MINUTES);
    setTimerSeconds(initSec || DEFAULT_INIT_TIMER_SECONDS);
  };
  const doTriggerInitTimer = (props: any) => {
    const {
      flowMessageFrom = "",
      isPayClickLoadingL = false,
      initMin = DEFAULT_INIT_TIMER_MINUTES,
      initSec = DEFAULT_INIT_TIMER_SECONDS,
    } = props;
    if (myTriggerTimerInterval.current !== null) {
      return;
    }

    myTriggerTimerInterval.current = setInterval(() => {
      /**
       * @TODO_ADDED_GLOBAL_STATE_BINDING
       */
      if (isPayClickLoadingL || !pathname.includes("cart")) {
        doResetTriggerTimer();
      } else {
        if (!myInitTimerInterval.current) {
          setIsTimerStarted(true);
          doInitTimer();
        }
      }
    }, TRIGGER_INIT_TIMER_INTERVAL);
  };
  const doResetPaymentTimer = () => {
    if (paymentInitTimerInterval.current) {
      clearInterval(paymentInitTimerInterval.current);
      paymentInitTimerInterval.current = null;
    }
    setIsBackdropLoading(false);
    setIsPayClickLoadingLoading(false);
    setPaymentTimerMinutes(DEFAULT_PAYMENT_HOLD_TIMER_MINUTES);
    setPaymentTimerSeconds(DEFAULT_PAYMENT_HOLD_TIMER_SECONDS);
  };
  const doInitPaymentTimer = () => {
    let minutes = paymentTimerMinutes;
    let seconds = paymentTimerSeconds;
    paymentInitTimerInterval.current = setInterval(() => {
      doResetTimer(); // reset idleTimer
      doResetTriggerTimer(); // reset trigger idleTimer
      if (seconds > 0) {
        seconds = seconds - 1;
        setPaymentTimerSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          const { paymentGateway = "" } = Utils?.getStorage() || {};
          if (
            paymentGateway ===
            GlobalFixture.STORAGE_FIXTURE_CONTENTS.HEARTLAND_GATEWAY
          ) {
            clearInterval(paymentInitTimerInterval.current);
            setisCancelPayLoading(true);
            const { heartLandIpAddress = "" } = Utils?.getStorage() || {};
            doCancelHeartlandPayment({
              cbk: (responseProps: any) => {
                setisCancelPayLoading(false);
                setIsPayClickLoadingLoading(false);
                setIsBackdropLoading(false);
                doResetPaymentTimer();
                doResetTimer();
                doResetTriggerTimer();
                doUpdateTransactionStatus({
                  status: false,
                  cbk: (responseProps: any) => {
                    const { status = "" } = responseProps || {};
                    if (status === API_SUCCESS_STATUS) {
                      runOpenCartTransactionSocketMQTT(true);
                    } else {
                      setIsSocketConnected(false);
                    }
                  },
                });
                doTriggerInitTimer({
                  flowMessageFrom: "auto cancel heartland payment << cbk",
                  isPayClickLoadingL: false,
                });
              },
            });

            doHeartLandInitializeConnect({
              ipAddress: heartLandIpAddress,
              port: HEART_LAND_CONNECT_PORT,
              cbk: (responseProps: any) => {},
            });
          } else {
            cancelPooling.current = true
            setIsPayClickLoadingLoading(false);
            setIsBackdropLoading(false);
            clearInterval(paymentInitTimerInterval.current);
            doStartCancelPaymentIntent({
              cbk: (responseProps: any) => {
                cancelPaymentCBK(responseProps);
                const { status = "" } = responseProps || {};
                if (status === "success") {
                  API?.doUpdateTransactionDetails({
                    customerName: "",
                    amount: cartTransactionData?.cartTotalPrice || "",
                    stripe_payment_status: "timeout",
                    paymentStatus: PAYMENT_TIMEOUT,
                    paymentType: "",
                    cardNumber: "",
                    cardBrand: "",
                    paymentId: paymentId,
                  });
                }
              },
            });
            doResetTimer();
            doResetTriggerTimer();
            doTriggerInitTimer({
              flowMessageFrom: "payment interval",
              isPayClickLoadingL: false,
            });
          }
        } else {
          minutes = minutes - 1;
          seconds = 30;
          setPaymentTimerMinutes(minutes);
          setPaymentTimerSeconds(seconds);
        }
      }
    }, PAYMENT_HOLD_TIMER_INTERVAL); // interval for every seconds
  };
  const doCancelChoosePaymentType = () => {
    setIsPms(false);
    doResetPaymentTimer();
    doResetTimer();
    doResetTriggerTimer();
    setIsBackdropLoading(false);
    setIsPayClickLoadingLoading(false);
    doUpdateTransactionStatus({
      status: false,
    });
    runCloseCartTransactionSocketMQTT();
    runOpenCartTransactionSocketMQTT();
  };
  const doProceedChoosePaymentType = () => {
    const isButtonDisableKit = getPayLaterInfo.filter(
      (itm: any) => itm.selected
    );
    const [_isButtonDisable = {}] = isButtonDisableKit || [];
    const { name = "", form } = _isButtonDisable || ({} as any);
    setPlProcessing(true);
    if (name === "payLater") {
      doUpdatePaylaterTransactionStatus({
        ...form,
        cbk: (responseProps: any) => {
          const { status = "", data } = responseProps;
          if (status === API_SUCCESS_STATUS) {
            triggerCloseTransaction({
              cbk: (res: any) => {
                if (res.status === API_SUCCESS_STATUS) {
                  localStorage.setItem(TRANSACTION_ID, "");
                  const { cartTotalPrice = "0" } = cartTransactionData as any;
                  doResetPaymentTimer();
                  navigateTo(PageConfiguration?.pathParams?.payment, {
                    state: { paid: true, cartTotalPrice, roomNo: form.roomNo },
                  });
                }
              },
            });
          } else {
            setPLErrorMessage(data.message);
          }
          setPlProcessing(false);
          setIsBackdropLoading(false);
        },
      });
    } else {
      setIsBackdropLoading(true);
      const { cartTotalPrice = "0" } = cartTransactionData as any;
      doPay({
        cartTotalPrice,
      });
      setIsPms(false);
    }
  };

  useEffect(onCartInitLoad, []);
  useEffect(onCartTriggerConnectionStatusUpdate, [connectionStatus]);
  useEffect(onUpdatePayloadMQTT, [payload]);
  useEffect(() => {
    const { isAdultVerified } = Utils?.getStorage() || {};
    if (ageRestrictChecked) {
      doUpdateTransactionStatus({
        status: true,
        cbk: (responseProps: any) => {
          const { status = "" } = responseProps || {};
          if (status === API_SUCCESS_STATUS) {
            runCloseCartTransactionSocketMQTT();
          }
        },
      });
      doResetTimer(1, 30);
      doResetTriggerTimer(1, 30);
      setIsTimerStarted(true);
      doInitTimer(0, 90);
    } else if (isAdultVerified) {
      doUpdateTransactionStatus({
        status: false,
        cbk: (responseProps: any) => {
          const { status = "" } = responseProps || {};
          if (status === API_SUCCESS_STATUS) {
            runOpenCartTransactionSocketMQTT();
          }
        },
      });
      doResetTimer();
      doResetTriggerTimer();
      doTriggerInitTimer({
        flowMessageFrom: "After Adult verification",
      });
    }
  }, [ageRestrictChecked]);
   const doStartCancelPaymentIntent = async (props: any) => {
     const { cbk = () => "" } = props || {}; 
     API.doCancelPayment({
       paymentIntentId: paymentIntentRef.current,
       cbk
    })
  };

  return {
    runOpenCartTransactionSocketMQTT,
    cartTransactionData,
    setCartTransactionData,
    isCartHasUnknowProduct,
    setIsCartHasUnknowProduct,
    isCartHasProduct,
    setIsCartHasProduct,
    onHandleClickPay,
    doGetCartTransactionData,
    triggerCloseTransaction,
    triggerBarcodeDetected,
    doInitTimer,
    doResetTimer,
    doTriggerInitTimer,
    timerSeconds,
    setTimerSeconds,
    myInitTimerInterval,
    myTriggerTimerInterval,
    isTimerStarted,
    setIsTimerStarted,
    doTriggerRemoveItemFromCart,
    doTriggerAddItemToCart,
    navigateTo,
    isBackdropLoading,
    setIsBackdropLoading,
    isCartSummaryLoading,
    setIsCartSummaryLoading,
    isSocketConnected,
    runCloseCartTransactionSocketMQTT,
    isPayClickLoading,
    setIsPayClickLoadingLoading,
    paymentTimerMinutes,
    setPaymentTimerMinutes,
    paymentTimerSeconds,
    setPaymentTimerSeconds,
    globalAppStates,
    //cancelPaymentProcess,
    timerMinutes,
    setTimerMinutes,
    isCancelPayLoading,
    productLoading,
    productLoadingTimer,
    doCancelHeartlandPayment,
    setisCancelPayLoading,
    doResetPaymentTimer,
    paymentInitTimerInterval,
    isCancelPaymentHidden,
    setIsCancelPaymentHidden,
    getPayLaterInfo,
    setPayLaterInfo,
    doCancelChoosePaymentType,
    doProceedChoosePaymentType,
    isPms,
    setIsPms,
    plErrorMessage,
    setPLErrorMessage,
    plProcessing,
    setPlProcessing,
    doUpdateTransactionStatus,
    doResetTriggerTimer,
    doHeartLandInitializeConnect,
    doStartCancelPaymentIntent,
    cancelPaymentCBK,
    setIsSocketConnected,
  };
};
export { useCartStates };
export default useCartStates;
