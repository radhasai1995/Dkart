import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import * as IconGallery from "@iconsGallery";
import * as Utils from "@utils";
import { StyledRetryPaymentButton } from "./styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as PageConfiguration from "@pageConfiguration";

const TransactionDeclined = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleRetry = () => {
        doUpdateTransactionStatus({
            status: false
        })
        navigate(PageConfiguration?.pathParams?.cart);
    };
    const globalAppStates = useContext(Utils.GlobalAppContext);
    const {
        doUpdateTransactionStatus = () => "",
    } = globalAppStates as any;
    return (
        <Grid className="cls-dkph-transaction">
            <IconGallery.ITransactionDeclinedIcon />
            <Typography variant="h3">{t("PAYMENT_FAILURE")}</Typography>
            <Typography variant="h5">{t("PAYMENT_FAILURE_INFO")}</Typography>
            <StyledRetryPaymentButton variant="contained" onClick={handleRetry}>
                {t("PAYMENT_BUTTON_TITLE")}
            </StyledRetryPaymentButton>
        </Grid>
    );
};
export { TransactionDeclined };
export default TransactionDeclined;
