import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  createTrainingProducts,
  updateTrainingProducts,
  getIndividualProductDetails,
} from "./api";
import _ from "lodash";
import * as ApiServices from "@apiService";
import * as GlobalFixture from "@globalFixture";
import * as Utils from "@utils";
import * as Constants from "@constants";
import * as PageConfiguration from "@pageConfiguration";
import * as TrainingProductFixtures from "./fixture";

function useCreateProductStates() {
  const navigate = useNavigate();
  const location = useLocation();
  const [productName, setProductName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isProductUpdatePage, setIsProductUpdatePage] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [totalImagesCount, setTotalImagesCount] = useState(0);
  const [loadedImagesSet, setLoadedImagesSet] = useState([]);
  const {
    mqttConnect,
    mqttDisconnect,
    mqttSub,
    mqttPublish,
    mqttUnSub,
    connectionStatus,
    payload,
  }: any = Utils.useMQTTSocketHookState();
  const { MAX_IMAGES_LIMIT = 0 } = TrainingProductFixtures.useTrainingProductFixtures() || {};
  useEffect(() => {
    let trainProductsMqttUrl = ApiServices.mqttDomainUrl;
    mqttConnect(trainProductsMqttUrl);
  }, []);

  useEffect(() => {
    if (
      connectionStatus ===
      GlobalFixture?.API_FIXTURE_CONTENTS.MQTT_STATUS_CONNECTED
    ) {
      mqttSub({
        topic: Constants.IMAGE_RECEIVE_TOPIC,
        qos: 0,
      });
    }

    return () => {
      mqttUnSub({
        topic: Constants.IMAGE_RECEIVE_TOPIC,
        qos: 0,
      });
    };
  }, [connectionStatus]);

  useEffect(() => {
    if (!_.isEmpty(payload)) {
      if (payload.topic === Constants.IMAGE_RECEIVE_TOPIC) {
        const res = payload.message.images.map(
          (img: { image: string }) => img.image
        );
        if (totalImagesCount <= MAX_IMAGES_LIMIT) {
          let responseArray = res || [];
          const [rightCam = "", leftCam = "", centerCam = ""] = responseArray || [];
          const imagesSet = { R: rightCam, L: leftCam, C: centerCam }
          if (location?.state?.edit) {
            const oldArr: any = [...images, ...res];
            setImages(oldArr);
            let oldImageArr: any = [...loadedImagesSet];
            oldImageArr.unshift(imagesSet);
            setLoadedImagesSet(oldImageArr);
          }
          else {
            const newArr: any = [...newImages, ...res];
            setNewImages(newArr);
            let newImageArr: any = [...loadedImagesSet];
            newImageArr.unshift(imagesSet);
            setLoadedImagesSet(newImageArr);
          }
          setTotalImagesCount(totalImagesCount + responseArray.length)
        }

      }
    }
  }, [payload]);

  const handleCancel = () => {
    setTotalImagesCount(0);
    setImages([]);
    setNewImages([]);
    setLoadedImagesSet([]);
    setDeletedImages([]);
    navigate(PageConfiguration?.pathParams?.products);
  };

  const onTiggerCreateProductAPI = (data: any) =>
    createTrainingProducts(data);
  const onTiggerUpdateProductAPI = (data: any) => updateTrainingProducts(data);
  const onTiggerGetProductDetails = (data: any) =>
    getIndividualProductDetails(data);

  const onHandleProductCreateBtn = (props: any) => {
    const { isEdit = false } = props || {};
    if (!isEdit) {
      onTiggerCreateProductAPI({
        productName,
        barcode,
        images: newImages,
        navigate,
        isProductUpdatePage: isEdit,
        setIsLoading,
        deletedImages,
        setTotalImagesCount,
        setImages,
        setNewImages,
        setLoadedImagesSet,
        setDeletedImages,
      });

    }
    else {
      onTiggerUpdateProductAPI({
        productName,
        barcode,
        images: images,
        navigate,
        isProductUpdatePage: isEdit,
        setIsLoading,
        deletedImages,
        setTotalImagesCount,
        setImages,
        setNewImages,
        setLoadedImagesSet,
        setDeletedImages,
      });

    }
  };

  useEffect(() => {
    const editProductBarCode = location?.state?.editedData?.barcode;
    if (location?.state?.edit) {
      setIsProductUpdatePage(true);
      onTiggerGetProductDetails({
        editProductBarCode,
        setProductName,
        setBarcode,
        setImages,
        setIsLoading,
        setTotalImagesCount,
        setLoadedImagesSet
      });
    }
  }, []);

  const onHandleCameraIconClicked = () => {
    mqttPublish({
      qos: 1,
      topic: Constants.IMAGE_CAPTURE_TOPIC,
      payload: JSON.stringify({ message: "image-capture" }),
    });
  };

  const onDeleteImages = (val: any, key: number) => {
    if (images[key]) {
      const imgArr = [...images];
      imgArr.splice(key, 1);
      setImages([...imgArr]);

      const delImages = [...deletedImages];
      delImages.push(val);
      setDeletedImages([...delImages]);
    } else if (newImages[key - images.length]) {
      newImages.splice(key - images.length, 1);
      setNewImages([...newImages]);
    }
  };

  const onDeleteProductImages = (val: any, key: number) => {
    const exisitingLoadedImages = [...loadedImagesSet];
    exisitingLoadedImages.splice(key, 1);
    setLoadedImagesSet([...exisitingLoadedImages]);
    const { R = "", L = "", C = "" } = val || {};
    if (location?.state?.edit) {
      const existingNewLoadedImages = [...images];
      const r_index = existingNewLoadedImages.indexOf(R);
      if (r_index >= 0)
        existingNewLoadedImages.splice(r_index, 1)
      const l_index = existingNewLoadedImages.indexOf(L);
      if (l_index >= 0)
        existingNewLoadedImages.splice(l_index, 1)
      const c_index = existingNewLoadedImages.indexOf(C);
      if (c_index >= 0)
        existingNewLoadedImages.splice(c_index, 1);
      setImages([...existingNewLoadedImages]);
      setTotalImagesCount((exisitingLoadedImages.length * 3));
      const delImages = [...deletedImages];
      if (L.includes("https"))
        delImages.push(L)
      if (C.includes("https"))
        delImages.push(C)
      if (R.includes("https"))
        delImages.push(R)
      setDeletedImages([...delImages]);
    } else {
      const { R = "", L = "", C = "" } = val || {};
      const r_index = newImages.indexOf(R);
      newImages.splice(r_index, 1);
      const l_index = newImages.indexOf(L);
      newImages.splice(l_index, 1);
      const c_index = newImages.indexOf(C);
      newImages.splice(c_index, 1);
      setNewImages([...newImages]);
      setTotalImagesCount(newImages.length)
    }
  };

  return {
    productName,
    setProductName,
    barcode,
    setBarcode,
    handleCancel,
    onHandleProductCreateBtn,
    isProductUpdatePage,
    isLoading,
    setIsLoading,
    onHandleCameraIconClicked,
    images,
    setImages,
    newImages,
    onDeleteImages,
    totalImagesCount, setTotalImagesCount,
    loadedImagesSet, setLoadedImagesSet,
    onDeleteProductImages
  };
}
export { useCreateProductStates };
export default useCreateProductStates;
