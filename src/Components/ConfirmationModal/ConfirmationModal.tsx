import React from "react";
import { Typography, Grid } from "@mui/material";
import * as IconGallery from "@iconsGallery";
import {
    StyledModal,
    StyledCancelButton,
    StyledSuccessButton,
    StyledBox,
} from "./styles";

const ConfirmationModal = (props: any) => {
    const {
        open = false,
        handleClose = () => "",
        modalTitle = "",
        modalsubTitle = "",
        confirmAlert = "",
        onsuccess = () => "",
        onfail = () => "",
        cancelTxt = "No",
        confirmTxt = "Yes",
        isSuccessButtonLoading = false,
        confirmLoaderTxt = 'Loading...'

    } = props;

    return (
        <StyledModal
            disableEnforceFocus
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledBox className="Modal-outer">
                <Grid className="ModalTitle">
                    <Grid>
                        <IconGallery.ILogoutIcon className='cls-modal-icon' />
                    </Grid>
                </Grid>
                <Grid className="modal-content">
                    <Typography className='cls-modal-title' id="modal-modal-title" variant="h5" component="h5">
                        {modalTitle}
                    </Typography>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h6"
                        className={
                            confirmAlert.length > 0
                                ? "modal-modal-subtitle"
                                : "modal-subtitle"
                        }
                    >
                        {modalsubTitle}
                    </Typography>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h6"
                        className="modal-modal-confirm-title"
                    >
                        {confirmAlert}
                    </Typography>
                </Grid>
                <Grid className="modal-buttons">
                    <StyledCancelButton
                        type="submit"
                        variant="contained"
                        onClick={onfail}
                    >
                        <Typography variant="h6" component="h6">
                            {cancelTxt}
                        </Typography>
                    </StyledCancelButton>
                    <StyledSuccessButton variant="contained" onClick={onsuccess} disabled={isSuccessButtonLoading}>
                        <Typography variant="h6" component="h6">
                            {!isSuccessButtonLoading ? confirmTxt : confirmLoaderTxt}
                        </Typography>
                    </StyledSuccessButton>
                </Grid>
            </StyledBox>
        </StyledModal>
    );
};

export { ConfirmationModal };
export default ConfirmationModal;
