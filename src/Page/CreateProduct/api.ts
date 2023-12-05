import * as apiService from "@apiService";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as GlobalFixture from "@globalFixture";
import * as PageConfiguration from "@pageConfiguration";
const { API_SUCCESS_STATUS, SEVERITY_ERROR, TYPE_STRING } =
  GlobalFixture.API_FIXTURE_CONTENTS;
const {
  PRODUCTS_API_FAIL_ERROR_MSG,
  PRODUCTS_API_CAMERA_ERROR_MSG,
  PRODUCT_CREATE_SUCCESS_MESSAGE,
  PRODUCT_CREATE_ERROR_MESSAGE,
  PRODUCT_UPDATE_SUCCESS_MESSAGE,
  PRODUCT_UPDATE_ERROR_MESSAGE,
} = GlobalFixture.TOTAL_CONTENTS;

export const createTrainingProducts = (props: any) => {
  const {
    barcode,
    productName,
    images,
    navigate,
    isProductUpdatePage,
    setIsLoading,
    deletedImages,
    setTotalImagesCount,
    setImages,
    setNewImages,
    setLoadedImagesSet,
    setDeletedImages,
  } = props || {};
  setIsLoading(true);
  const { storeId = "", userName = "" } = Utils.getStorage();
  const payload = {
    barcode,
    productName: productName ? productName.trim() : "",
    images,
    createdBy: userName,
    lastUpdatedBy: userName,
    locationId: [storeId],
    createFlag: isProductUpdatePage,
    adminPortal: true,
    deleted_images: deletedImages,
  };

  const pathName = Constants.CREATE_TRAINING_PRODUCTS;
  let apiData = {
    pathName: pathName,
    body: payload,
    isBearerDisable: false,
    isTenantIdRequired: true,
  };
  apiService
    .getPostAPI({ ...apiData })
    .then((res: any) => {
      const { message = PRODUCT_CREATE_SUCCESS_MESSAGE } = res?.data || {};
      setIsLoading(false);
      if (window?.OuterSnackbar && typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(API_SUCCESS_STATUS);
        window?.OuterSnackbar.setMessage(message);
      }
      setTotalImagesCount(0);
      setImages([]);
      setNewImages([]);
      setLoadedImagesSet([]);
      setDeletedImages([]);
      setTimeout(() => {
        navigate(PageConfiguration?.pathParams?.products);
      }, 1000);
    })
    .catch((err: any) => {
      const { data = {} } = err?.response || {};
      const { message = PRODUCT_CREATE_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar && typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
    });
};

export const updateTrainingProducts = (props: any) => {
  const {
    barcode,
    productName,
    images,
    navigate,
    isProductUpdatePage,
    setIsLoading,
    deletedImages,
    setTotalImagesCount,
    setImages,
    setNewImages,
    setLoadedImagesSet,
    setDeletedImages,
  } = props || {};
  setIsLoading(true);
  const { storeId = "", userName = "" } = Utils.getStorage();
  const payload = {
    barcode,
    productName: productName ? productName.trim() : "",
    images,
    createdBy: userName,
    lastUpdatedBy: userName,
    locationId: [storeId],
    createFlag: !isProductUpdatePage,
    adminPortal: true,
    deleted_images: deletedImages,
  };

  const pathName = Constants.UPDATE_TRAINING_PRODUCTS;
  let apiData = {
    pathName: pathName,
    body: payload,
    isBearerDisable: false,
    isTenantIdRequired: true,
  };
  apiService
    .getPostAPI({ ...apiData })
    .then((res: any) => {
      const { message = PRODUCT_UPDATE_SUCCESS_MESSAGE } = res?.data || {};
      setIsLoading(false);
      if (window?.OuterSnackbar && typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(API_SUCCESS_STATUS);
        window?.OuterSnackbar.setMessage(message);
      }
      setTotalImagesCount(0);
      setImages([]);
      setNewImages([]);
      setLoadedImagesSet([]);
      setDeletedImages([]);
      setTimeout(() => {
        navigate(PageConfiguration?.pathParams?.products);
      }, 1000);
    })
    .catch((err: any) => {
      const { data = {} } = err?.response || {};
      const { message = PRODUCT_UPDATE_ERROR_MESSAGE } = data || {};
      if (window?.OuterSnackbar && typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
    });
};

export const getIndividualProductDetails = (props: any) => {
  const {
    editProductBarCode = "",
    setProductName,
    setBarcode,
    setImages,
    setIsLoading,
    setTotalImagesCount = () => 0,
    setLoadedImagesSet = () => [],
  } = props;
  setIsLoading(true);
  const pathName = `${Constants.GET_TRAINING_PRODUCT}${editProductBarCode}`;
  let apiData = {
    pathName: pathName,
    isBearerDisable: true,
    isTenantIdRequired: true,
  };
  apiService
    .getGetAPI({ ...apiData })
    .then((res: any) => {
      const {
        images = [],
        productName = "",
        barcode = "",
      } = res?.data?.data || {};
      setProductName(productName);
      setBarcode(barcode);
      //setImages(images);
      let imageArray = images || [];
      setTotalImagesCount(imageArray.length);
      const chunkSize = 3;
      let finalArray = [];
      for (let i = 0; i < imageArray.length; i += chunkSize) {
        const chunk = imageArray.slice(i, i + chunkSize);
        const [rightCam = "", leftCam = "", centerCam = ""] = chunk || [];
        let object = { L: leftCam, R: rightCam, C: centerCam };
        finalArray.push(object);
      }
      setLoadedImagesSet(finalArray);
      setIsLoading(false);
    })
    .catch((err: any) => {
      const { data = {} } = err?.response || {};
      const { message = { PRODUCTS_API_FAIL_ERROR_MSG } } = data || {};
      if (window?.OuterSnackbar || typeof message === TYPE_STRING) {
        window?.OuterSnackbar.handleClickStack();
        window?.OuterSnackbar.setSeverityNote(SEVERITY_ERROR);
        window?.OuterSnackbar.setMessage(message);
      }
      setIsLoading(false);
    });
};
