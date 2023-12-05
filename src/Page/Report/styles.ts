import {
  Typography,
  styled,
  Table,
  TableContainer,
  Card,
  Paper,
  Toolbar,
  Avatar,
  CardContent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const StyledCard = styled(Card)`
  background: var(--white);
  height: calc(100% - 84px);
  width: 100%;
  borderradius: 10px;
  .cardcontent: {
    margin-top: 5px;
    padding: 0px 16px 16px 5px;
  }
`;

export const StyledPaper = styled(Paper)`
  .pagination {
    background: var(--white);
    color: var(--black);
    & .MuiSvgIcon-root-MuiSelect-icon {
      color: rgba(0, 0, 0, 0.54);
    }
    & .MuiButtonBase-root-MuiIconButton-root.Mui-disabled {
      color: rgba(0, 0, 0, 0.26);
    }
  }
`;

export const StyledToolbar = styled(Toolbar)`
  background: var(--white);
  color: var(--black);
  borderbottom: 1px solid #f7f7f7;
  padding-right: 0px;
  @media (min-width: 600px) {
    padding-right: 0px;
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  background: var(--white);
  color: var(--black);
  max-height: calc(100vh - 310px);
`;

export const StyledReportTable = styled(Table)`
  .coloum_cell {
    background-color: #f7f7f7;
    color: var(--black);
    border: 1px solid #e3e3e3;
    font-weight: 600;
  }
  .body_cell {
    background: var(--white);
    color: var(--black);
    border: 1px solid #e3e3e3;
  }
`;

export const StyledToolbarTypography = styled(Typography)`
  flex: 1 1 100%;
  color: #b62a6e;
`;

export const StyledAvatar = styled(Avatar)`
  display: inline-grid;
  background-color: #e11080;
  margin-left: 15px;
`;

export const StyledDatePicker = styled(DatePicker)`
  & .MuiInputLabel-root {
    color: rgba(0, 0, 0, 0.6);
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.6);
  }
  & .MuiOutlinedInput-input {
    color: var(--black);
  }
  & .MuiIconButton-root {
    color: rgba(0, 0, 0, 0.54);
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: var(--darkGray) !important;
  }
  & .Mui-focused {
    color: var(--darkGray) !important;
  }
`;

export const StyledTransactionReportCardWrapper = styled(CardContent)`
  background: var(--white);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledTransactionReportCardInfo = styled(Typography)`
  color: var(--darkPink);
  font-size: 16px;
  font-weight: 600;
  width: calc(100% - 300px);
  height: 50px;
  border-radius: 5px;
  background-color: #f9e7f1;
  text-align: center;
  vertical-align: center;
  line-height: 3rem;
  border: 1px solid var(--darkPink);
  min-width: 500px;
  max-width: 700px;
  @media (orientation: portrait) {
    min-width: 500px;
    max-width: 700px;
    width: calc(100% - 300px);
  }
`;
export const StyledCardContentWrapper = styled(CardContent)`
  background: var(--white);
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 16px 16px 16px;
  .cls-dkph-input-field-wrapper {
    width: 15%;
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const SelectTagStyles = {
  width: "15%",
  minWidth: 140,
  height: "52px",
  border: "1px solid var(--darkPink)",
  borderRadius: "5px",
  color: "var(--darkPink)",
  //backgroundColor: "green",
  //WebkitTextFillColor: "var(--darkPink)",
  ".MuiSelect-nativeInput": {
    position: "absolute",
    bottom: "12px",
    left: "10px",
    opacity: 1,
    pointerEvents: "none",
    width: "100%",
    fontSize: 18,
    border: "none",
    maxWidth: 100,
  },
  svg: {
    color: "var(--darkPink)",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--darkPink)",
    color: "var(--darkPink)",
    WebkitTextFillColor: "var(--darkPink)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--darkPink)",
    color: "var(--darkPink)",
    WebkitTextFillColor: "var(--darkPink)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--darkPink)",
    color: "var(--darkPink)",
    WebkitTextFillColor: "var(--darkPink)",
  },
  mt: 1,
  "& legend": { display: "none" },
  "& fieldset": {
    top: 0,
    border: "none",
    color: "var(--darkPink)",
  },
  "& input": {
    color: "var(--darkPink)",
    "&: disabled": {
      WebkitTextFillColor: "var(--darkGray) !important",
    },
  },
  "&: disabled": {
    WebkitTextFillColor: "var(--darkGray) !important",
  },
  "#location-select-disabled": {
    WebkitTextFillColor: "var(--darkGray) !important",
  },
};
