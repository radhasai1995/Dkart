import {
  Typography,
  styled,
  Table,
  TableContainer,
  Paper,
  Toolbar,
  Card,
  Button,
  ButtonProps,
} from "@mui/material";

export const StyledCard = styled(Card)`
  background: var(--white);
  height: calc(100% - 84px);
  width: 100%;
  borderradius: 10px;
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
`;

export const StyledTableContainer = styled(TableContainer)`
  background: var(--white);
  color: var(--black);
  border: 1px solid #f00;
  max-height: calc(100% - 260px);
`;

export const StyledProductsTable = styled(Table)`
  .coloum_cell {
    background-color: #f7f7f7;
    color: var(--black);
    text-align: center;
    border: 1px solid #e3e3e3;
  }
  .body_cell {
    background: var(--white);
    color: var(--black);
    border: 1px solid #e3e3e3;
    text-align: center;
  }
`;

export const StyledToolbarTypography = styled(Typography)`
  flex: 1 1 100%;
  color: #b62a6e;
`;

export const StyledButton = styled(Button)`
  background: var(--darkPink);
  color: var(--white);
  width: 150px;
  borderradius: 10px;
`;
export const StyledCreateButton = styled(Button)<ButtonProps>(({ theme }) => ({
  background: "var(--darkPink)",
  color: "var(--white)",
  width: "150px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "var(--primaryColor)",
  },
}));
