import { Grid, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useCreateProductStates from "./useCreateProductPage";
import ImageWithPlaceHolder from "./ImageWithPlaceHolder"
import CloseIcon from "@mui/icons-material/Close";
import * as IconGallery from "@iconsGallery";
import * as GlobalFixture from "@globalFixture";
import * as Styles from "./styles";
import * as TrainingProductFixtures from "./fixture";

const CreateProduct = (props: any) => {
  const CreateProductStates = useCreateProductStates() as any;
  const { t } = useTranslation();
  const {
    productName,
    setProductName,
    barcode,
    setBarcode,
    handleCancel,
    onHandleProductCreateBtn,
    isProductUpdatePage,
    isLoading,
    onHandleCameraIconClicked,
    totalImagesCount = 0,
    loadedImagesSet = [],
    onDeleteProductImages = () => ""
  } = CreateProductStates;
  const { MAX_IMAGES_LIMIT = 0, MIN_IMAGES_LIMIT = 0 } = TrainingProductFixtures.useTrainingProductFixtures() || {};
  const renderGap = (props: any) => {
    const { xs, md, lg } = props;
    return <Grid item xs={xs} md={md} lg={lg}></Grid>;
  };
  const renderImage = (props: any) => {
    const { src = "", alt = "broken" } = props || {};
    const isUrl = src.includes("https");
    return isUrl ? (
      <ImageWithPlaceHolder src={src} alt={alt} />
    ) : (
      <ImageWithPlaceHolder src={`data:image/png;base64, ${src}`} alt={alt} />
    )
  }
  const renderImagesSet = (props: any) => {
    return props.map((prop: any, index: number) => {
      const { L = "", C = "", R = "" } = prop || {};
      return (
        <Grid className="cls-image-set-container" >
          <Grid className="cls-image-set-container-child">
            {renderImage({ src: L, alt: 'L' })}
            {renderImage({ src: C, alt: 'C' })}
            {renderImage({ src: R, alt: 'R' })}
          </Grid>
          <IconButton
            color="inherit"
            onClick={() => { onDeleteProductImages(prop, index) }}
            aria-label="delete"
            className={`cls-dkph-rm`}
          >
            <CloseIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </Grid>)
    }
    );
  };
  let allImage = [...loadedImagesSet] as any;
  let DynamicCamera = totalImagesCount >= MAX_IMAGES_LIMIT ? IconGallery.NoCameraIcon : IconGallery.CameraIcon;
  const onKeyDown = (keyDownProps: any) => {
    const { event = {}, setStateValue = () => "" } = keyDownProps || {}
    if (event.which === 13) {
      setStateValue("");
    }
  }
  return (
    <Styles.StyledMainWrapper>
      <Styles.StyledToolbarTypography variant="h5" gutterBottom>
        {!isProductUpdatePage
          ? t("PRODUCT_CREATE_INFO")
          : t("PRODUCT_UPDATE_INFO")}
      </Styles.StyledToolbarTypography>
      <Grid container spacing={3} sx={{ marginTop: "10px" }}>
        {renderGap({ xs: 0.5, md: 0, lg: 0 })}
        <Grid item xs={5}>
          <Styles.StyledTextField
            fullWidth={true}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={productName}
            onChange={(event: any) => {
              const regex = /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]( ?[A-Za-z0-9!@#\$%\^\&*\)\(+=._-] ?)*$/g;
              if (event?.target?.value === "" || regex.test(event?.target?.value))
                setProductName(event?.target.value);
            }}
            inputProps={{ maxLength: 64 }}
            onKeyDown={(event: any) => { onKeyDown({ event, setStateValue: setProductName }) }}
          />
        </Grid>
        <Grid item xs={5}>
          <Styles.StyledTextField
            fullWidth={true}
            id="outlined-basic"
            label="BarCode"
            variant="outlined"
            value={barcode}
            disabled={isProductUpdatePage}
            onChange={(event: any) => {
              const regex = /^[A-Za-z0-9\b]+$/;
              if (event?.target?.value === "" || regex.test(event?.target?.value))
                setBarcode(event?.target.value);
            }}
            inputProps={{ maxLength: 64 }}
          />
        </Grid>
        <Grid item xs={1}>
          <DynamicCamera
            className="cls-icon-camera"
            onClick={() => {
              if (allImage?.length < MAX_IMAGES_LIMIT) {
                onHandleCameraIconClicked();
              }
            }}
          />
        </Grid>
        {renderGap({ xs: 0.5, md: 0, lg: 0 })}
      </Grid>
      {isLoading && <IconGallery.CircleLoading />}
      <Grid className={`cls-dkph-training-gif-container`}>
        <Styles.StyledImg src={GlobalFixture.MEDIA_FIXTURE_CONTENTS.CREATE_PRODUCT_IMG} />
        <Grid
          item
          className={`cls-dkph-training-gif-item`}
        >
          <Typography variant="h5" gutterBottom fontWeight={500}>
            {t("PRODUCT_INFO_1")}{" "}
            <b style={{ color: "#02E8E8" }}>
              {MIN_IMAGES_LIMIT + 1}
            </b>{" "}
            {t("PRODUCT_INFO_2")}
          </Typography>
        </Grid>
      </Grid>

      {totalImagesCount ? <Typography className={`cls-dkph-img-count`} >{`Total Images :${totalImagesCount}`}</Typography> : <></>}
      <Styles.StyledImagesSetContainer
        container
        spacing={3}
        sx={{ marginTop: "10px", maxHeight: "40vh", overflow: "auto", }}
      >
        <Grid item xs={15} style={{ padding: "0px 30px 0px 60px" }}>
          {allImage?.length ? (
            renderImagesSet(allImage)
          ) : ""}

        </Grid>
      </Styles.StyledImagesSetContainer>
      <Grid container spacing={3} sx={{ marginTop: "10px", textAlign: "center" }}>
        {renderGap({ xs: 6, md: 7, lg: 9 })}
        <Grid item xs={6} md={5} lg={3}>
          <Styles.StyledCancelButton variant="outlined" onClick={() => handleCancel()}>
            {t("PRODUCT_CANCEL")}
          </Styles.StyledCancelButton>
          <Styles.StyledCreateButton
            variant="contained"
            onClick={() => { onHandleProductCreateBtn({ isEdit: isProductUpdatePage }) }}
            disabled={productName === "" || barcode === "" || !(totalImagesCount >= MIN_IMAGES_LIMIT) || !(totalImagesCount <= MAX_IMAGES_LIMIT)}
          >
            {isLoading
              ? t("LOGIN_BUTTON_TEXT_LOADING")
              : !isProductUpdatePage
                ? t("PRODUCT_CREATE")
                : t("PRODUCT_UPDATE")}
          </Styles.StyledCreateButton>
        </Grid>
      </Grid>
    </Styles.StyledMainWrapper>
  );
};

export default CreateProduct;
export { CreateProduct };
