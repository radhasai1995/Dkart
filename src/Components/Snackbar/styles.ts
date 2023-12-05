import { Snackbar as SnackbarMUI } from "@mui/material";
import { styled } from "@mui/material/styles";
export const StyledSnackbarMUI = styled(SnackbarMUI)`
  .cls-alert-txt {
    font-size: 14px !important;
    box-shadow: 2px 2px 1px #000000bf;
  }
  .cls-alert-txt,
  svg {
    color: var(--white) !important;
  }
  .cls-alert-txt.cls-warning {
    background: #e2b93b;
  }
  .cls-alert-txt.cls-error {
    background: #eb5757;
  }
  .cls-alert-txt.cls-success {
    background: #10bc55;
  }
`;
