import { Grid, styled, Button } from "@mui/material";
export const StyledTransactionWrapper = styled(Grid)`
  .cls-dkph-transaction-cv {
    position: fixed;
    width: 200px;
    height: 200px;
    left: 0;
    top: 0;
  }
  .cls-dkph-transaction {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cls-dkph-transaction h3 {
    padding: 10px;
    font-weight: 600;
    text-align: center;
    width: 100%;
    height: auto;
    height: fit-content;
  }
  .cls-dkph-transaction h5 {
    padding: 10px;
    font-weight: 400;
    text-align: center;
    width: 400px;
    height: auto;
    height: fit-content;
  }
`;
export const StyledRetryPaymentButton = styled(Button)`
  width: 250px;
  height: 50px;
  margintop: 10px;
  color: var(--black);
`;
