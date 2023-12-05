import { styled, Table, TableContainer, Paper } from "@mui/material";

export const StyledPaper = styled(Paper)`
  box-shadow: none !important;
  border: 1px solid var(--lightGray);
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
  .cls-empty-pagination {
    height: 50px;
    background: var(--white);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;
export const StyledTableContainer = styled(TableContainer)`
  background: var(--white);
  color: var(--black);
  max-height: calc(100vh - 260px);
`;
export const StyledTable = styled(Table)`
  .coloum_cell {
    background-color: #f7f7f7;
    color: var(--black);
    text-align: center;
    border: 1px solid var(--lightGray);
    min-width: 170px;
    font-weight: 600;
    font-size: 1rem;
  }
  .body_cell {
    background: var(--white);
    color: var(--black);
    border: 1px solid var(--lightGray);
    text-align: center;
    font-size: 1rem;
  }
`;
