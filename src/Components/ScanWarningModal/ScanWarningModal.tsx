import { useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ScanWarningModal = (props: any) => {
    const { isOpen = false, setIsOpen } = props || {};
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsOpen(false)
            }, 3000)
        }
    }, [isOpen])

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 580,
        bgcolor: 'var(--white)',
        p: 5,
        color: '#424242',
        borderRadius: '20px' 
    };
    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', fontWeight: "600", fontSize: "30px" }}>
                    <span style={{ color: "var(--darkBlue)" }}>{t('CART_LITERAL_SCANNED')} </span>
                    {t('CART_LITERAL_SCANNED_PRODUCTS_ALERT')} <span style={{ color: "var(--darkPink)" }}>{t('CART_LITERAL_TRAY') }</span>.
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 4, textAlign: 'center', color: "var(--red)", fontWeight: "600", fontSize: "20px" }}>
                    {t('CART_LITERAL_SCANNED_PRODUCTS_IN_BAG')}
                </Typography>
            </Box>
        </Modal>
    )
};
export { ScanWarningModal };
export default ScanWarningModal;