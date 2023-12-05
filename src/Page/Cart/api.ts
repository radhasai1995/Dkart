import * as ApiService from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";

const {
  GET_TRANSACTION_ID_ERROR_MSG,
  UPDATE_TRANSACTION_ERROR_MESSAGE,
  STRIPE_CANCEL_PAYMENT_ERROR_MESSAGE,
  STRIPE_PROCESS_PAYMENT_ERROR_MESSAGE,
  REMOVE_CART_ITEM_ERROR_MESSAGE,
  ADD_CART_ITEM_ERROR_MESSAGE,
  GET_CART_TRANSACTION_DATA_ERROR_MESSAGE,
  FIELDS_MISSING,
} = GlobalFixture.TOTAL_CONTENTS;
const {
  API_SUCCESS_STATUS,
  API_FAIL_STATUS,
  SEVERITY_ERROR,
  SEVERITY_WARNING,
  TYPE_STRING,
} = GlobalFixture.API_FIXTURE_CONTENTS;
const { TRANSACTION_ID } = GlobalFixture.STORAGE_FIXTURE_CONTENTS;
const { PAYMENT_CURRENCY_TYPE } =
  GlobalFixture.PAYMENT_GATEWAY_FIXTURE_CONTENTS;

const {
  APP_SOURCE_TYPE,
  GET_TRANSACTION_BY_ID,
  ADD_TO_CART,
  REMOVE_CART,
  PROCESS_PAYMENT,
  CANCEL_PAYMENT,
  GET_TRANSACTION_ID,
  UPDATE_TRANSACTION,
  CANCEL_PROCESS_PAYMENT,
} = Constants;
export const getCartTransactionData = (props: any) => {
  const { setIsLoading = () => "", cbk = () => "" } = props;
  setIsLoading(true);
  const { transactionId = "" } = Utils.getStorage();
  if (!transactionId) {
    setIsLoading(false);
    window?.OuterSnackbar.handleClickStack();
    window?.OuterSnackbar.setSeverityNote(SEVERITY_WARNING);
    window?.OuterSnackbar.setMessage(FIELDS_MISSING);
    return;
  }
  const pathName = `${GET_TRANSACTION_BY_ID}/${transactionId}`;
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
    prefixUrl: ApiService.localDomainURL,
  };
  ApiService.getGetAPI({ ...apiData })
    .then((res: any) => {
      setIsLoading(false);
      cbk({ status: API_SUCCESS_STATUS, data: res?.data || {} });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_CART_TRANSACTION_DATA_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
      cbk({ status: API_SUCCESS_STATUS, data: {} });
    });
};

export const doAddItemTOCart = (props: any) => {
  const { cbk = () => "", barcode = "" } = props;
  const { tenantId = "", transactionId = "" } = Utils.getStorage();
  const pathName = `${ADD_TO_CART}`;
  if (!tenantId || !transactionId) {
    window?.OuterSnackbar.handleClickStack();
    window?.OuterSnackbar.setSeverityNote(SEVERITY_WARNING);
    window?.OuterSnackbar.setMessage(FIELDS_MISSING);
    return;
  }
  let body = {
    transactionId: transactionId,
    barcode: barcode,
  };
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
    isAuthShow: true,
    prefixUrl: ApiService.localDomainURL,
    body,
  };
  ApiService.getPostAPI({ ...apiData })
    .then((res: any) => {
      cbk({ status: API_SUCCESS_STATUS, data: res?.data || {} });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = ADD_CART_ITEM_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS, data: {} });
    });
};

export const doRemoveItemFromCart = (props: any) => {
  const {
    cbk = () => "",
    barcodeDetails = {},
    setIsBackdropLoading = () => false,
  } = props;
  const { tenantId = "", transactionId = "" } = Utils.getStorage();
  const pathName = `${REMOVE_CART}`;
  if (!tenantId || !transactionId) {
    setIsBackdropLoading(false);
    if (window?.OuterSnackbar) {
      window?.OuterSnackbar.handleClickStack();
      window?.OuterSnackbar.setSeverityNote(SEVERITY_WARNING);
      window?.OuterSnackbar.setMessage(FIELDS_MISSING);
    }
    return;
  }
  const { barcode = "", quantity = 1 } = barcodeDetails || {};
  let body = {
    transactionId: transactionId,
    barcode: barcode,
    quantity: quantity,
  };
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
    isAuthShow: true,
    body,
    prefixUrl: ApiService.localDomainURL,
  };
  ApiService.getPostAPI({ ...apiData })
    .then((res: any) => {
      cbk({ status: API_SUCCESS_STATUS, data: res?.data || {} });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = REMOVE_CART_ITEM_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS, data: {} });
    });
};

export const doStartProcessPayment = (props: any) => {
  const {
    cbk = () => "",
    amount = "0",
    currency = PAYMENT_CURRENCY_TYPE,
  } = props;
  const { reader } = Utils.getStorage();
  const pathName = `${PROCESS_PAYMENT}`;
  if (!Object.keys(reader).length) return;
  let body = {
    currency,
    amount: Math.round(parseFloat(amount || 0) * 100).toString(),
    reader_id: reader.id,
  };
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
    isAuthShow: true,
    body,
    prefixUrl: ApiService.stripeConnectDomainUrl,
  };
  ApiService.getPostAPI({ ...apiData })
    .then((res: any) => {
      cbk({ status: API_SUCCESS_STATUS, data: res?.data || {} });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = STRIPE_PROCESS_PAYMENT_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS, data: {} });
    });
};

export const doCancelPaymentIntent = (props: any) => {
  const { cbk = () => "", paymentIntentId = "" } = props;
  if (paymentIntentId === "") return;
  const pathName = `${CANCEL_PAYMENT}`;
  let body = {
    paymentIntent: paymentIntentId,
  };
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
    isAuthShow: true,
    body,
    prefixUrl: ApiService.stripeConnectDomainUrl,
  };
  ApiService.getPostAPI({ ...apiData })
    .then((res: any) => {
      cbk(res?.data || {});
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = STRIPE_CANCEL_PAYMENT_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS, data: {} });
    });
};

export const doCancelPayment = (props: any) => {
  const { cbk = () => "", paymentIntentId = "" } = props;
  const { reader } = Utils?.getStorage();
  if (paymentIntentId === "") return;
  const pathName = `${CANCEL_PROCESS_PAYMENT}`;
  let body = {
    paymentIntent: paymentIntentId,
    reader_id: reader.id,
  };
  let apiData = {
    pathName: pathName,
    isBearerDisable: false,
    isAuthShow: true,
    body,
    prefixUrl: ApiService.stripeConnectDomainUrl,
  };
  ApiService.getPostAPI({ ...apiData })
    .then((res: any) => {
      cbk({status: API_SUCCESS_STATUS, data: res?.data});
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = STRIPE_CANCEL_PAYMENT_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS, data: {} });
    });
};

export const getTransactionID = (props: any) => {
  const { cbk = () => "" } = props;
  let pathName = GET_TRANSACTION_ID;
  const { userId = "", userName = "" } = Utils?.getStorage() || {};
  let bodyParam = {
    storeAssociateId: userId,
    storeAssociateName: userName,
  };
  let apiData = {
    pathName,
    body: bodyParam,
    isBearerDisable: false,
    isTenantIdRequired: true,
  };
  ApiService.getPostAPI({
    ...apiData,
  })
    .then(res => {
      const { data = {} } = res;
      const { transactionId = "" } = data;
      localStorage.setItem(TRANSACTION_ID, transactionId);
      cbk({ status: API_SUCCESS_STATUS });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = GET_TRANSACTION_ID_ERROR_MSG } = data || {};
      if (typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS });
    });
};

export const doUpdateTransactionDetails = (props: any) => {
  const {
    customerName = "",
    amount = "",
    paymentStatus = "",
    cardNumber = "",
    cardBrand = "",
    paymentId = "",
    reason = "",
    cardExpiry = "",
    paymentType = "",
    fingerprint = "",
    message = "",
    cbk = () => "",
  } = props;
  const { transactionId = "", paymentGateway = "" } = Utils.getStorage();
  if (!transactionId) {
    window?.OuterSnackbar.handleClickStack();
    window?.OuterSnackbar.setSeverityNote(SEVERITY_WARNING);
    window?.OuterSnackbar.setMessage(FIELDS_MISSING);
    return;
  }
  let pathName = UPDATE_TRANSACTION;
  let reqBody = {
    transactionId: transactionId,
    source: APP_SOURCE_TYPE,
    transactionData: {
      customerName: customerName,
      transactionAmount: amount,
      status: paymentStatus,
      cardNumber: cardNumber,
      paymentId: paymentId,
      cardBrand: cardBrand,
      reason: reason,
      cardExpiry: cardExpiry,
      paymentGateway: paymentGateway,
      paymentType,
      fingerprint,
      messsage: message,
    },
  };

  let apiData = {
    pathName,
    body: reqBody,
    isBearerDisable: false,
    isTenantIdRequired: true,
    prefixUrl: ApiService.localDomainURL,
  };

  ApiService.getPostAPI({
    ...apiData,
  })
    .then(res => {
      const { data = {} } = res;
      cbk({ status: API_SUCCESS_STATUS, data });
    })
    .catch(err => {
      const { data = {} } = err?.response || {};
      const { message = UPDATE_TRANSACTION_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      cbk({ status: API_FAIL_STATUS, data: {} });
    });
};
