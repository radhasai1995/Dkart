
import { IconButton, Grid, Backdrop } from "@mui/material";
import BarcodeReader from "react-barcode-reader";
import LottieWrapper from "lottie-react";
import CartAnimation from "./../lottie/cart.json";
import * as IconGallery from "@iconsGallery";
import * as Styles from "../styles";
import * as GlobalFixture from "@globalFixture";
import DeleteIcon from '@mui/icons-material/Delete';
export const renderRefreshCartSummary = (props: any) => {
    const {
        setIsCartSummaryLoading = () => false,
        runCloseCartTransactionSocketMQTT = () => "",
        runOpenCartTransactionSocketMQTT = () => "",
        doGetCartTransactionData = () => "",
        setCartTransactionData = () => "",
        cartTransactionData = {},
        isCartSummaryLoading = false,
        doUpdateTransactionStatus = () => "",
        doResetTimer = () => "",
        doResetTriggerTimer = () => "",
        doTriggerInitTimer = () => "",
    } = props || {};
    return (
        <IconButton
            onClick={() => {
                setIsCartSummaryLoading(true);
                doUpdateTransactionStatus({
                    status: false,
                    cbk: (responseProps: any) => {
                        runCloseCartTransactionSocketMQTT();
                        runOpenCartTransactionSocketMQTT(true);
                    },
                });
                doResetTimer();
                doResetTriggerTimer();
                doTriggerInitTimer({
                    flowMessageFrom: "after refresh cart summary",
                });
                doGetCartTransactionData({
                    cbk: (responseProps: any) => {
                        const { status = "", data = { data: {} } } = responseProps;
                        if (status === "success") {
                            setCartTransactionData({
                                ...cartTransactionData,
                                ...(data?.data || {}),
                            });
                        }
                        setIsCartSummaryLoading(false);
                    },
                });
            }}
        >
            <IconGallery.IRefreshIcon
                isRefreshing={isCartSummaryLoading}
            />
        </IconButton>
    )
}
export const renderBarcodeScannedProductKit = (props: any) => {
    const {
        scanFalg = false,
        barcode = "",
        quantity = 0,
        doTriggerRemoveItemFromCart = () => "",
        doTriggerAddItemToCart = () => "",
    } = props || {};
    return (
        <Grid className={`cls-dkph-product-info-container${scanFalg ? "" : "-hide"}`}>
            <Grid className="cls-dkph-barcode-info-wrapper">
                <Styles.StyledItemTypo variant="subtitle1" className="cls-dkph-barcode-info-style">
                    {`Barcode Scanned`}
                    <span style={{ position: 'absolute', left: 8, bottom: 7 }}>
                        <IconGallery.IBarcodeIcon />
                    </span>
                </Styles.StyledItemTypo>
                <Styles.StyledIconButton
                    disabled={!scanFalg}
                    onClick={() => {
                        doTriggerRemoveItemFromCart({ barcode, quantity: 0 })
                    }
                    } >
                    {/* {quantity > 0 ? <IconGallery.ICartRemoveIcon /> : <></>} */}
                    {quantity > 0 ? <DeleteIcon style={{ color: "var(--lightDarkPink)" }} /> : <></>}
                </Styles.StyledIconButton>

            </Grid>
            <Grid
                className="cls-dkph-barcode-action-wrapper"
                style={{ display: scanFalg ? 'flex' : 'none' }}
            >
                <Styles.StyledIconButton
                    disabled={!scanFalg}
                    onClick={() => {
                        doTriggerAddItemToCart(barcode);
                    }} >
                    <IconGallery.ICartPlusIcon />
                </Styles.StyledIconButton>
                <Styles.StyledIconButton
                    disabled={quantity < 2}
                    style={{ display: quantity > 1 ? 'flex' : 'none' }}
                    className=""
                    onClick={() => {
                        doTriggerRemoveItemFromCart({ barcode, quantity: quantity - 1 })
                    }} >
                    <IconGallery.ICartMinusIcon />
                </Styles.StyledIconButton>
            </Grid>
        </Grid>
    )
}
export const renderProductQtyKit = (props: any) => {
    const { quantity = 0 } = props || {};
    return (
        <Styles.StyleItemDetailWrapper className="cls-dkph-product-qty">
            <Styles.StyledItemTypo variant="h6" className="cls-dkph-product-qty-style" >
                {`${quantity > 0 ? `${quantity}` : ""}`}
            </Styles.StyledItemTypo>
        </Styles.StyleItemDetailWrapper>)
}
export const renderProductPriceKit = (props: any) => {
    const { subtotalofferPrice = 0 } = props || {};
    return (<Styles.StyleItemDetailWrapper className="cls-dkph-product-price">
        <Styles.StyledItemTypo variant="h6" className="cls-dkph-product-price-style">
            {`$${subtotalofferPrice ? subtotalofferPrice : 0}`}
        </Styles.StyledItemTypo>
    </Styles.StyleItemDetailWrapper>)
}
export const renderProductImageKit = (props: any) => {
    const { item_image = "" } = props || {};
    return (
        <>
            {
                item_image && item_image.length > 0 ?
                    <Styles.StyleItemImage
                        alt={"DK"}
                        src={item_image}
                        onError={(event: any) => {
                            event.target.src = GlobalFixture.MEDIA_FIXTURE_CONTENTS.NO_IMAGE;
                            event.onerror = null;
                        }}
                    /> :
                    <Grid style={{ borderRadius: 10, border: "1px solid var(--darkGray)", width: 60, height: 70, backgroundColor: "#dfdddd", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        <div style={{ position: "relative", width: 40, height: 20, alignItems: "center", display: "flex", justifyContent: "center" }}>
                            <IconGallery.ICartProductImageNotFound style={{ position: "absolute", top: -19, bottom: 0, }} />
                        </div>
                    </Grid>

            }
        </>
    )
}
export const renderProductTitleKit = (props: any) => {
    const { title = "" } = props || {};
    return (
        <Styles.StyledItemTypo variant="h6" className="cls-dkph-product-info-style">
            {`${title}`}
        </Styles.StyledItemTypo>)
}
export const renderProductDetailKit = (props: any) => {
    const { item_image = "", title = "", ...restProps } = props || {};
    return (
        <Styles.StyleItemDetailWrapper className="cls-dkph-product-info">
            {renderProductImageKit({ item_image })}
            <Grid className="cls-dkph-product-info-wrapper">
                {renderProductTitleKit({ title })}
                {renderBarcodeScannedProductKit({ ...restProps })}
            </Grid>
        </Styles.StyleItemDetailWrapper>)
}
export const renderEmptyListKit = (props: any) => {
    return (
        <LottieWrapper
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
            animationData={CartAnimation}
            loop={true}
        />)
}
export const renderCartSummaryHeader = (props: any) => {
    const {
        t = () => "",
        showActivityStatus = false,
        isCartSummaryLoading = false,
        isSocketConnected = false,
        ...restProps } = props || {};
    return (
        <Styles.StyledCartSummaryHeaderWrapper>
            <Styles.StyledCartSummaryHeader >
                <Styles.StyledCartSummaryHeaderTypo className="cls-dkph-header-title" variant="h3">
                    {t("CART_LITERAL_CART_SUMMARY")}
                    {showActivityStatus && <span style={{ position: "absolute", right: 0, bottom: 14 }}>
                        <IconGallery.IActiveStatusIcon
                            isLoading={isCartSummaryLoading}
                            isConnected={isSocketConnected}
                        />
                    </span>}
                </Styles.StyledCartSummaryHeaderTypo>
                {!isSocketConnected ? renderRefreshCartSummary(restProps) : <></>}
            </Styles.StyledCartSummaryHeader>
            <Styles.StyledCartSummaryHeaderContents>
                <Styles.StyledCartSummaryHeaderTypo className="cls-dkph-header-contents" variant="h6" style={{ width: "75%" }}>{`Item(s)`}</Styles.StyledCartSummaryHeaderTypo>
                <Styles.StyledCartSummaryHeaderTypo className="cls-dkph-header-contents" variant="h6" style={{ width: "12%" }}>{`Qty`}</Styles.StyledCartSummaryHeaderTypo>
                <Styles.StyledCartSummaryHeaderTypo className="cls-dkph-header-contents cls-dkph-right-alignment" variant="h6" style={{ width: "13%" }}>{`Price`}</Styles.StyledCartSummaryHeaderTypo>
            </Styles.StyledCartSummaryHeaderContents>
        </Styles.StyledCartSummaryHeaderWrapper>)
}
export const renderCartSummaryListFooter = (props: any) => {
    const {
        t = () => "",
        totalQuantity = "",
        cartPrice = "",
        totalTax = "",
        cartTotalPrice = "" } = props || {};
    return (<div
        style={{
            backgroundColor: "#e0e3e3",
            gridArea: "footer",
            marginTop: 8
        }}
    >
        <Grid container rowSpacing={1}>
            <Grid item xs={6}>
                <Styles.TypographyWrapperLeft
                    variant="subtitle1"
                    gutterBottom
                    style={{ marginBottom: "0", fontSize: 18, color: '#5d5c5c' }}
                >
                    {t("CART_LITERAL_ITEMS")}
                </Styles.TypographyWrapperLeft>
            </Grid>
            <Grid item xs={6}>
                <Styles.TypographyWrapperRight
                    variant="subtitle1"
                    gutterBottom
                    style={{ marginBottom: "0", paddingTop: 0, paddingBottom: 0, fontSize: 18, color: '#5d5c5c' }}
                >
                    {`${totalQuantity ? totalQuantity : 0} `}
                </Styles.TypographyWrapperRight>
            </Grid>
        </Grid>
        <Grid container rowSpacing={1}>
            <Grid item xs={6}>
                <Styles.TypographyWrapperLeft variant="subtitle1" gutterBottom
                    style={{ fontSize: 18, color: '#5d5c5c' }}
                >
                    {t("CART_LITERAL_SUBTOTAL")}
                </Styles.TypographyWrapperLeft>
            </Grid>
            <Grid item xs={6}>
                <Styles.TypographyWrapperRight variant="subtitle1" gutterBottom
                    style={{ fontSize: 18, color: '#5d5c5c' }}
                >
                    {`$${cartPrice ? cartPrice : 0}`}
                </Styles.TypographyWrapperRight>
            </Grid>
        </Grid>
        <Grid className="cls-default-border-style" container rowSpacing={1} sx={{ marginBottom: "5px" }}>
            <Grid item xs={6}>
                <Styles.TypographyWrapperLeft variant="subtitle1" gutterBottom
                    style={{ fontSize: 18, color: '#5d5c5c' }}
                >
                    {t("CART_LITERAL_TAX")}
                </Styles.TypographyWrapperLeft>
            </Grid>
            <Grid item xs={6}>
                <Styles.TypographyWrapperRight variant="subtitle1" gutterBottom
                    style={{ fontSize: 18, color: '#5d5c5c' }}
                >
                    {`$${totalTax ? totalTax : 0}`}
                </Styles.TypographyWrapperRight>
            </Grid>
        </Grid>
        <Grid
            container
            rowSpacing={1}
            sx={{ borderTop: "1px dashed var(--lightGray)" }}
        >
            <Grid item xs={6}>
                <Styles.TypographyWrapperLeft
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "var(--black)" }}
                >
                    {t("CART_LITERAL_TOTAL")}
                </Styles.TypographyWrapperLeft>
            </Grid>
            <Grid item xs={6}>
                <Styles.TypographyWrapperRight
                    variant="subtitle1"
                    gutterBottom
                    style={{ fontSize: 30, color: '#029e9e' }}
                >
                    {`$${cartTotalPrice ? cartTotalPrice : 0}`}
                </Styles.TypographyWrapperRight>
            </Grid>
        </Grid>
    </div>)
}
export const renderBackdropLoader = (props: any) => {
    const { isCartHasUnknowProduct = false } = props || {};
    return (<Backdrop
        sx={{ color: 'gary', zIndex: (theme) => theme.zIndex.drawer + 1, position: "absolute", }}
        open={isCartHasUnknowProduct}
    >
        {isCartHasUnknowProduct && <IconGallery.ScannerIcon style={{ width: "60%" }} />}
    </Backdrop>)
}
export const renderBarcodeReaderKit = (props: any) => {
    const { triggerBarcodeDetected = () => "" } = props || {};
    return (
        <BarcodeReader
            onScan={(value: any) => {
                triggerBarcodeDetected(value);
            }}
        />)
}