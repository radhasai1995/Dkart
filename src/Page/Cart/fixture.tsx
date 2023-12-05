export const useCartFixtures = () => {
  const DEFAULT_INIT_TIMER_MINUTES = 0;
  const DEFAULT_INIT_TIMER_SECONDS = 30;
  const DEFAULT_PAYMENT_HOLD_TIMER_MINUTES = 0;
  const DEFAULT_PAYMENT_HOLD_TIMER_SECONDS = 33;
  const PAYMENT_HOLD_TIMER_INTERVAL = 1000; //milliseconds
  const INIT_TIMER_INTERVAL = 1000; //milliseconds
  const TRIGGER_INIT_TIMER_INTERVAL = 3 * 1000; // 60 * 1000 trigger every one minute gap
  const defaultPayLaterInfo = [
    {
      name: "payNow",
      selected: true,
      title: "Pay Now",
      subTitle: "Credit Card/Debit Card",
    },
    {
      name: "payLater",
      selected: false,
      form: {
        lastName: "",
        roomNo: "",
        zipcode: "",
      },
      title: "Pay Later",
      subTitle: "Charge to room",
    },
  ];

  return {
    DEFAULT_INIT_TIMER_MINUTES,
    DEFAULT_INIT_TIMER_SECONDS,
    DEFAULT_PAYMENT_HOLD_TIMER_MINUTES,
    DEFAULT_PAYMENT_HOLD_TIMER_SECONDS,
    PAYMENT_HOLD_TIMER_INTERVAL,
    INIT_TIMER_INTERVAL,
    TRIGGER_INIT_TIMER_INTERVAL,
    defaultPayLaterInfo,
  };
};

export let getPaymentHLPAXDetailsObject = (details: any) => {
  const {
    TransactionAmount = 0,
    HEART_LAND_CREDIT_COMMAND = "",
    HEART_LAND_INIT_VERSION = "",
    transactionTypeSale = "",
  } = details;
  return {
    command: HEART_LAND_CREDIT_COMMAND,
    version: HEART_LAND_INIT_VERSION,
    transactionType: transactionTypeSale,
    amountInformation: {
      TransactionAmount: Math.round(
        parseFloat(TransactionAmount) * 100
      ).toString(),
      TipAmount: "",
      CashBackAmount: "",
      MerchantFee: "",
      TaxAmount: "",
      FuelAmount: "",
    },
    accountInformation: {
      Account: "",
      EXPD: "",
      CVVCode: "",
      EBTtype: "",
      VoucherNumber: "",
      Force: "1",
      FirstName: "",
      LastName: "",
      CountryCode: "",
      State_ProvinceCode: "",
      CityName: "",
      EmailAddress: "",
    },
    traceInformation: {
      ReferenceNumber: "1",
      InvoiceNumber: "",
      AuthCode: "",
      TransactionNumber: "",
      TimeStamp: "",
      ECRTransID: "",
    },
    avsInformation: {
      ZipCode: "",
      Address: "",
      Address2: "",
    },
    cashierInformation: {
      ClerkID: "",
      ShiftID: "",
    },
    commercialInformation: {
      PONumber: "",
      CustomerCode: "",
      TaxExempt: "",
      TaxExemptID: "",
      MerchantTaxID: "",
      DestinationZipCode: "",
      ProductDescription: "",
    },
    motoEcommerce: {
      MOTO_E_CommerceMode: "",
      TransactionType: "",
      SecureType: "",
      OrderNumber: "",
      Installments: "",
      CurrentInstallment: "",
    },
    additionalInformation: {
      TABLE: "",
      GUEST: "",
      SIGN: "",
      TICKET: "",
      HREF: "",
      TIPREQ: "",
      SIGNUPLOAD: "",
      REPORTSTATUS: "",
      TOKENREQUEST: "",
      TOKEN: "",
      CARDTYPE: "",
      CARDTYPEBITMAP: "",
      PASSTHRUDATA: "",
      RETURNREASON: "",
      ORIGTRANSDATE: "",
      ORIGPAN: "",
      ORIGEXPIRYDATE: "",
      ORIGTRANSTIME: "",
      DISPROGPROMPTS: "",
      GATEWAYID: "",
      GETSIGN: "",
      ENTRYMODEBITMAP: "",
      RECEIPTPRINT: "",
      CPMODE: "",
      ODOMETER: "",
      VEHICLENO: "",
      JOBNO: "",
      DRIVERID: "",
      EMPLOYEENO: "",
      LICENSENO: "",
      JOBID: "",
      DEPARTMENTNO: "",
      CUSTOMERDATA: "",
      USERID: "",
      VEHICLEID: "",
    },
  };
};
