import {
  Typography,
  styled,
  Table,
  TableContainer,
  Card,
  Paper,
  Grid,
  Toolbar,
} from "@mui/material";

export const StyledCard = styled(Card)`
  background: var(--white);
  height: calc(100% - 90px);
  borderradius: 10px;
`;

export const StyledDiv = styled("div")`
  margin-top: 10px;
`;

export const StyledRowGrid = styled(Grid)`
  background-color: #e8f2fe;
  padding: 8px 15px 3px 20px;
`;

export const TypographyWrapper = styled(Typography)`
  color: #0a0a0a;
  padding: 5px 25px 0px 8px;
`;
export const TypographysubtitleWrapper = styled(Typography)`
  padding: 0px 25px 0px 8px;
  color: var(--darkGray);
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
`;

export const StyledTableContainer = styled(TableContainer)`
  //max-height: 380px;
  background: var(--white);
  color: var(--black);
  max-height: calc(100vh - 360px);
`;

export const StyledTransactionTable = styled(Table)`
  .coloum_cell {
    background-color: #f7f7f7;
    color: var(--black);
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
