import {
  Typography,
  styled,
  Table,
  TableContainer,
  Paper,
  Toolbar,
  Card,
  CardContent,
  Grid,
  TextField,
  Checkbox,
  Box,
  Modal,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button, { ButtonProps } from "@mui/material/Button";

export const useStyles = makeStyles({
  overrideBaseInputStyle: {
    "& .MuiInputBase-input": {
      height: "0.4em",
    },
    "& .MuiOutlinedInput-input": {
      height: "0.4em",
      border: "none",
    },
  },
  overrideBaseInputColor: {
    "& .MuiInputBase-input": {
      color: "var(--black)",
      minHeight: "25px",
      border: "none",
    },
    "& .MuiOutlinedInput-input": {
      color: "var(--black)",
      minHeight: "25px",
    },
  },
  overrideBaseInputRoot: {
    margin: "20px 0px 0px 0px",
    "& .MuiInputBase-input": {
      color: "var(--black)",
      minHeight: "25px",
      border: "none",
    },
    "& .MuiOutlinedInput-input": {
      color: "var(--black)",
      minHeight: "25px",
      border: "none",
    },
  },
});

export const StyledCard = styled(Card)`
  background: var(--white);
  height: calc(100% - 84px);
  width: 100%;
  borderradius: 10px;
`;
export const StyledCardContent = styled(CardContent)`
  background: var(--white);
`;
export const StyledDiv = styled("div")`
  margin-top: 10px;
`;
export const StyledPaper = styled(Paper)`
  .pagination {
    background: var(--white);
    color: var(--black);
    & .css-12ituji-MuiSvgIcon-root-MuiSelect-icon {
      color: rgba(0, 0, 0, 0.54);
    }
    & .css-b57xgn-MuiButtonBase-root-MuiIconButton-root.Mui-disabled {
      color: rgba(0, 0, 0, 0.26);
    }
  }
`;
export const StyledToolbar = styled(Toolbar)`
  background: var(--white);
  color: var(--black);
  borderbottom: 1px solid #f7f7f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .cls-users-header-title {
    font-size: 26px;
    font-weight: 500;
    color: var(--darkShadePink);
    width: "200px";
    min-width: 110px;
    textoverflow: "ellipsis";
    overflow: "hidden";
    display: "inline-block";
    whitespace: "nowrap";
    padding: 5px;
    height: 50px;
  }
`;
export const StyledTableContainer = styled(TableContainer)`
  //max-height: 435px;
  background: var(--white);
  color: var(--black);
  max-height: calc(100vh - 260px);
`;
export const StyledUsersTable = styled(Table)`
  .coloum_cell {
    background-color: #f7f7f7;
    color: var(--black);
    text-align: center;
    border: 1px solid var(--lightGray);
  }
  .body_cell {
    background: var(--white);
    color: var(--black);
    border: 1px solid var(--lightGray);
    text-align: center;
  }
`;
export const StyledToolbarTypography = styled(Typography)`
  flex: 1 1 100%;
  color: var(--darkShadePink);
`;

export const StyledCreateButton = styled(Button)<ButtonProps>(({ theme }) => ({
  background: "var(--darkPink)",
  color: "var(--white)",
  width: "160px !important",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "var(--primaryColor) !important",
  },
}));

export const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
  color: var(--black);
  text-align: center;
  border: none;
  padding: "10px 0px 0px 0px";
  -webkit-box-shadow: 0 0 0 100px var(--white) inset;
  -webkit-text-fill-color: var(--black);
  & #switchValue: {
    caret-color: transparent;
  }
  & p {
    margin: 0;
    -webkit-text-fill-color: var(--red);
    font-size: 16px;
  }
  & .MuiOutlinedInput-input {
    border: none !important;
    color: var(--black);
    min-height: 25px;
  }
  & .MuiInputBase-input {
    height: 0.4em;
  }
  & .MuiFormControl-root {
    color: var(--red);
    webkit-text-fill-color: red;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: var(--darkGray) !important;
    border-radius: 7px !important;
  }
`;
export const StyledCreateUserButton = styled(Button)`
  background: var(--darkPink);
  color: var(--white);
  width: 150px;
  borderradius: 10px;
  &:hover {
    opacity: 0.5;
  }
  &.MuiButton-root:hover {
    opacity: 0.5;
  }
  &. Mui-disabled {
    background: rgba(255, 255, 255, 0.3);
  }
`;
export const StyledCreateUserButtonWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100px;
  min-width: 150px;
  background: var(--white);
  justify-content: flex-end;
  align-items: flex-end;

  .cls-dkph-create-button {
    background: var(--darkPink);
    color: var(--white);
    width: 150px;
    border-radius: 5px;
    margin: 5px 5px 5px 0px;
  }
  .cls-dkph-cancel-button {
    background: var(--white);
    color: var(--darkPink);
    width: 150px;
    border-radius: 5px;
    border: 1px solid var(--darkPink);
    margin: 5px 5px 5px 5px;
  }
`;

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  min-width: 1000px;
  min-height: 600px;
  height: auto;
  background-color: var(--white);
  padding: 20px;
  overflow: hidden;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.05);

  .ModalTitle {
    display: flex;
    justify-content: center;
  }
  .ModalTitle svg {
    width: 85px;
    height: 85px;
  }

  .inputTitles {
    font-weight: 700;
  }

  .LabelTypeIcons {
    display: grid;
    grid-template-columns: 1% 99%;
  }

  .groupLabelIcons {
    margin-top: 8px;
    margin-left: 30px;
  }

  .modal-shapes span {
    margin-right: 15px;
  }

  .modal-buttons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    grid-gap: 36px;
  }
  .cls-modal-icon {
    font-size: 20px;
    color: var(--lightPink);
  }
  .cls-modal-title {
    color: var(--lightPink);
  }
  @media only screen and (max-width: 650px) {
    width: 80%;
    margin: auto;
    min-width: 80%;
    max-width: 80%;
  }
`;
export const StyledRolePermissionCheckbox = styled(Checkbox)`
  &.Mui-disabled {
    color: var(--lightGray);
  }
  [class*="MuiSvgIcon-root"] {
    font-size: 30px;
  }
`;
export const StyledAutocomplete = styled(Autocomplete)`
  margin: 10px 0px 0px 0px;
  min-width: unset;
  margintop: unset;
  background-color: var(--white);
  width: 100%;
  & .MuiAutocomplete-popupIndicator {
    color: rgba(0, 0, 0, 0.54);
  }
  cls-dkph-text-field {
    border: none;
    color: var(--black);
    min-height: 25px;
  }
  & .MuiInputBase-input {
    color: var(--black);
    min-height: 25px;
  }
  & .MuiOutlinedInput-input {
    color: var(--black);
    min-height: 25px;
    border: none !important;
  }
  & .MuiAutocomplete-inputFocused {
    border-color: var(--lightGray) !important;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: var(--darkGray) !important;
    border-radius: 7px !important;
  }
  & .MuiInputLabel-root {
    color: var(--black) !important;
  }
`;
export const StyledErrorTextTypography = styled(Typography)`
  color: var(--red);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.66px;
  text-align: left;
  width: 100%;
  padding: 12px 0px 0px 5px;
  height: 20px;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  & .MuiFormControlLabel-label.Mui-disabled {
    color: var(--black);
    font-size: 20px;
    @media only screen and (orientation: portrait) {
      font-size: 14px;
    }
  }
`;
export const StyledUserButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "var(--white)",
  width: "130px",
  height: "40px",
  marginLeft: "10px",
  borderRadius: "10px",
  backgroundColor: "var(--lightDarkPink)",
  fontWeight: 600,
  fontSize: "16px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "var(--lightDarkPink)",
  },
  "&.Mui-disabled": {
    backgroundColor: "var(--lightGray)",
    color: "var(--darkGray)",
  },
}));
