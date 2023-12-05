/***
 *  @SWAGGER_DOCS :
 * https://dev.digitkart.ai/api/frictionless/docs
 * https://dev.digitkart.ai/api/usermanagement/docs#/
 *
 */

/**
 * @API Transactions
 */
const GET_TRANSACTIONS = "/api/frictionless/api/kc/gettransactionreport";
const GET_TRANSACTION_ID = "/api/dk/getTransactionId";
const GET_TRANSACTION_BY_ID = "/api/dk/getTransactionById";
const START_TRANSACTION = "/ivlab-terminal/start-transaction";
const CLOSE_TRANSACTION = "/api/dk/closeTransaction";
const PAUSE_TRANSACTION = "/api/dk/transaction";

/**
 * @Socket Cart Summary
 */

const PROCESS_PAYMENT_SOCKET_ENDPOINT = "/ws/payment/status/";
const CART_MQTT_ENDPOINT = "dkart";

/**
 * @API Training Products
 */
const GET_PRODUCTS = "/api/frictionless/api/kc/getTrainingProducts";
const GET_TRAINING_PRODUCT = "/api/frictionless/api/kc/getTrainingProduct/";
const CREATE_TRAINING_PRODUCTS = "/api/frictionless/api/kc/trainingimages";
const UPDATE_TRAINING_PRODUCTS = "/api/frictionless/api/kc/trainingimages";
const CAPTURE_IMAGE = "/ivlab/capture-image";
const CAPTURE_IMAGE_SOCKET = "/dkart/image-capture";
const RECEIVE_IMAGE_SOCKET = "/dkart/image-receive";
const IMAGE_CAPTURE_TOPIC = "dkart/image-capture";
const IMAGE_RECEIVE_TOPIC = "dkart/image-receive";
const SCAN_TRIGGER_TOPIC = "dkart/scan-trigger";
/**
 * @API Reports
 */
const GET_REPORTS = "/api/frictionless/api/kc/gettransactionreport";
/**
 * @API Users
 */
const GET_USERS = "/api/usermanagement/api/tenant/getTerminalBusinessUsers";
const GET_TERMINAL_ROLES = "/api/usermanagement/api/tenant/getRoles";
const GET_TERMINAL_ROLE_ACCESS = "/api/usermanagement/api/tenant/getRoleById";
const CREATE_USER = "/api/usermanagement/api/tenant/createBusinessUser";
const UPDATE_USER = "/api/usermanagement/api/tenant/updateBusinessUser";
const GET_USER_BY_ID = "/api/usermanagement/api/tenant/getBusinessUserbyId";

/**
 * @API Authentication
 */
const LOGIN = "/api/user/login";
const LOGOUT = "/api/user/logout";
const USER_VERIFICATION = "/api/dk/verification/user";

/**
 * @API Cart
 */
const ADD_TO_CART = "/api/dk/AddToCart";
const REMOVE_CART = "/api/dk/removeItem";

/**
 * @EdgeDeviceConfig
 */
const APP_SOURCE_TYPE = "terminal";
const MOBILE_SOURCE_TYPE = "mobile";

/**
 * @API Payment Gateway
 */
const GET_LOCATION = "/stripe/locations";
const REGISTER_READER = "/register/reader";
const PROCESS_PAYMENT = "/payment/process";
const CANCEL_PAYMENT = "/payment/intent/cancel";
const CANCEL_PROCESS_PAYMENT = "/payment/process/cancel";

/**
 * HeartLand Connector Config
 */
const HEART_LAND_INIT_COMMAND = "A00";
const HEART_LAND_INIT_VERSION = "1.28";
const HEART_LAND_TRANSACTION_TYPE_SCALE = "01";
const HEART_LAND_CREDIT_COMMAND = "T00";
const HEART_LAND_CONNECT_PORT = "10009";
const HEART_LAND_CANCEL_COMMAND = "A01";
const HEART_LAND_CANCEL_PAY_PORT = "10010";
/**
 * PaymentGateWay Type
 */
const GET_PAYMENT_GATEWAY = "/api/payment/getPaymentType";
const UPDATE_TRANSACTION = "/api/dk/updateTransaction";
const GET_WISPOSE_CONNECTION_TOKEN = "/api/stripe/connection/token";
const CREATE_PAYMENT_INTENT = "/api/stripe/create/paymentindent";
const CAPTURE_PAYMENT = "/payment/intent/capture";
export {
  GET_USERS,
  GET_TERMINAL_ROLES,
  GET_TERMINAL_ROLE_ACCESS,
  CREATE_USER,
  UPDATE_USER,
  GET_PRODUCTS,
  CAPTURE_IMAGE,
  GET_TRAINING_PRODUCT,
  CREATE_TRAINING_PRODUCTS,
  GET_REPORTS,
  GET_TRANSACTIONS,
  PROCESS_PAYMENT_SOCKET_ENDPOINT,
  GET_TRANSACTION_ID,
  START_TRANSACTION,
  GET_USER_BY_ID,
  GET_TRANSACTION_BY_ID,
  LOGOUT,
  CLOSE_TRANSACTION,
  APP_SOURCE_TYPE,
  GET_LOCATION,
  REGISTER_READER,
  ADD_TO_CART,
  REMOVE_CART,
  CAPTURE_IMAGE_SOCKET,
  RECEIVE_IMAGE_SOCKET,
  PROCESS_PAYMENT,
  CANCEL_PAYMENT,
  CANCEL_PROCESS_PAYMENT,
  HEART_LAND_INIT_COMMAND,
  HEART_LAND_INIT_VERSION,
  HEART_LAND_TRANSACTION_TYPE_SCALE,
  HEART_LAND_CREDIT_COMMAND,
  GET_PAYMENT_GATEWAY,
  UPDATE_TRANSACTION,
  HEART_LAND_CONNECT_PORT,
  LOGIN,
  MOBILE_SOURCE_TYPE,
  CART_MQTT_ENDPOINT,
  IMAGE_CAPTURE_TOPIC,
  IMAGE_RECEIVE_TOPIC,
  PAUSE_TRANSACTION,
  USER_VERIFICATION,
  SCAN_TRIGGER_TOPIC,
  HEART_LAND_CANCEL_COMMAND,
  HEART_LAND_CANCEL_PAY_PORT,
  GET_WISPOSE_CONNECTION_TOKEN,
  CREATE_PAYMENT_INTENT,
  CAPTURE_PAYMENT,
  UPDATE_TRAINING_PRODUCTS,
};
