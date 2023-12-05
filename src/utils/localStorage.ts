const resetStorage = () => {
  if (localStorage) {
    const cachedPaymentInfo = localStorage.getItem("paymentDeviceInfo");
    localStorage.clear();
    if (cachedPaymentInfo && cachedPaymentInfo !== "undefined") {
      localStorage.setItem("paymentDeviceInfo", cachedPaymentInfo);
    }
  }
};
const getStorage = () => {
  return {
    token: `Bearer ${localStorage.getItem("token")}`,
    refreshToken: localStorage.getItem("refreshToken"),
    userId: localStorage.getItem("userId"),
    userRole: localStorage.getItem("userRole"),
    userName: localStorage.getItem("userName"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    name: localStorage.getItem("userName"),
    tenantId: localStorage.getItem("tenantId"),
    storeId: localStorage.getItem("storeId"),
    expiresIn: localStorage.getItem("expiresIn"),
    refreshExpiresIn: localStorage.getItem("refreshExpiresIn"),
    transactionId: localStorage.getItem("transactionId"),
    tokenType: localStorage.getItem("token_type"),
    permissons: localStorage.getItem("permissons"),
    authDetailsResponse: localStorage.getItem("authDetailsResponse"),
    paymentDeviceInfo: localStorage.getItem("paymentDeviceInfo"),
    paymentGateway: localStorage.getItem("paymentGateway"),
    phoneNumber: localStorage.getItem("phoneNumber"),
    heartLandIpAddress: localStorage.getItem("heartLandIpAddress"),
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    isAdultVerified: localStorage.getItem("adultVerified"),
    stripe_secret: localStorage.getItem("stripe_secret"),
    stripe_publish: localStorage.getItem("stripe_publish"),
    kcPosId: localStorage.getItem("kcPosId"),
    locationId: localStorage.getItem("locationId"),
    reader: JSON.parse(localStorage.getItem('readerConfig')|| '{}'),
  };
};
export { resetStorage, getStorage };
