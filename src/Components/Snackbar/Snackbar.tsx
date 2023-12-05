import React from "react";
import {
    Stack,
    Alert as MuiAlert,
} from "@mui/material";
import { StyledSnackbarMUI } from './styles';
import { useSnackbarState } from './useSnackbarState';
import { SnackbarContext } from './SnackbarContext';

const Snackbar = (props: any) => {
    const {
        openStack = false,
        handleCloseStack = () => "",
        vertical = "bottom",
        horizontal = "right",
        message = "something went wrong!",
        severityNote = "info",
    } = props || {};

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <StyledSnackbarMUI
                open={openStack}
                autoHideDuration={4000}
                onClose={handleCloseStack}
                anchorOrigin={{ vertical, horizontal }}
            >
                <MuiAlert
                    className={`cls-alert-txt cls-${severityNote}`}
                    onClose={handleCloseStack}
                    severity={severityNote}
                    sx={{ width: "100%" }}
                >
                    {message}
                </MuiAlert>
            </StyledSnackbarMUI>
        </Stack>
    );
}

export { Snackbar, useSnackbarState, SnackbarContext };
export default Snackbar;
