import {
  Typography,
  styled,
  Table,
  TableContainer,
  Paper,
  Toolbar,
  Card,
  Button,
  Grid,
  Avatar,
} from "@mui/material";

export const StyledCard = styled(Card)`
  background: var(--white);
  height: calc(100vh - 150px);
  width: calc(100vw - 50px);
  border-radius: 16px;
  margin: 22px;
`;

export const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: "#e6b0d5",
  height: "110px",
  position: "relative",
}));

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
  max-height: 438px;
  background: var(--white);
  color: var(--black);
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

export const StyledStoreTypography = styled(Typography)(({ theme }) => ({
  flex: "1 1 100%",
  color: "var(--black)",
  fontStyle: "italic",
  position: "absolute",
  left: "248px",
  [theme.breakpoints.up("xs")]: {
    left: "175px",
  },
  [theme.breakpoints.up("sm")]: {
    left: "226px",
  },
}));

export const StyledLabelTypography = styled(Typography)`
  color: #00000091;
  font-weight: 600;
`;

export const StyledValueTypography = styled(Typography)`
  color: #00000091;
  font-weight: 600;
`;

export const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
  flex: "1 1 100%",
  color: "rgb(66 60 60 / 90%)",
  position: "absolute",
  bottom: "-5px",
  fontWeight: "600",
  fontSize: "45px !important",
  left: "222px",
  [theme.breakpoints.up("xs")]: {
    left: "172px",
    bottom: "-10px",
  },
  [theme.breakpoints.up("sm")]: {
    bottom: "-13px",
    left: "222px",
  },
}));

export const StyledButton = styled(Button)`
  background: var(--darkPink);
  color: var(--white);
  width: 150px;
  borderradius: 10px;
`;

export const StyledGrid = styled(Grid)`
  color: var(--black);
`;

export const RowGrid = styled(Grid)`
  margin: 10px 0px;
`;

export const AvatarGrid = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#F3F7FC",
  color: "#1E88E5",
  height: "120px",
  width: "120px",
  cursor: "pointer",
  position: "absolute",
  [theme.breakpoints.up("xs")]: {
    left: "40px",
    top: "9%",
  },
  [theme.breakpoints.up("sm")]: {
    left: "90px",
    top: "7%",
  },
  [theme.breakpoints.up("md")]: {
    left: "90px",
    top: "7%",
  },
}));
