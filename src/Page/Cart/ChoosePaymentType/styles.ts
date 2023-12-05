import { Grid, styled, Typography } from "@mui/material";
export const StyledChoosePaymentMainWrapper = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  @media (orientation: portrait) {
    height: 40vh;
  }
`;
export const StyledChoosePaymentHeader = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
`;
export const StyledChoosePaymentHeaderRight = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: fit-content;
  padding: 5px 30px;
  .cls-dkph-header-title {
    font-size: 20px;
    font-weight: 700;
  }
  .cls-dkph-price-info {
    font-size: 50px;
    font-weight: 700;
    color: var(--grassGreen);
  }
  .cls-dkph-product-info {
    font-size: 18px;
  }
`;
export const StyledChoosePaymentFooter = styled(Grid)`
  display: flex;
  flex-direction: row;
  width: 500px;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  .cls-cancel {
    margin-right: 30px;
  }

  button {
    width: 250px;
    height: 86px;
    font-size: 28px;
    font-weight: bold;
    border-radius: 18px;
  }
`;
export const StyledChoosePaymentContentWrapper = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const StyledContentHeaderWrapper = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  .cls-dkph-payment-type-content-header {
    width: 100%;
    text-align: start;
    font-weight: 700;
    font-size: 30px;
    height: 50px;
    padding: 0px 0px 0px 245px;
  }
  @media (orientation: portrait) {
    .cls-dkph-payment-type-content-header {
      width: 100%;
      text-align: center;
      font-weight: 700;
      font-size: 30px;
      height: 50px;
      padding: 0px;
    }
  }
`;
export const StyledChoosePaymentContent = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

export const StyledCheckmarkImg = styled("img")`
  width:
  height: auto;
  border-radius: 10px;
  @media (orientation: portrait){ {

    height: auto;
    border-radius: 10px;
    margin-bottom: 50px;
  }
`;

export const StyledPaymentTypeImg = styled("img")`
  width: 300px;
  height: 150px;
  border-radius: 10px;
  @media (orientation: portrait) {
    height: auto;
    border-radius: 10px;
    margin-bottom: 50px;
  }
`;

export const StyledPaymentTypeGridWrapper = styled(Grid)`
  width: 30%;
  height: auto;
  border: 5px solid grey;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  min-height: 450px;
  max-width: 650px;
  &.active {
    // pointer-events: none;
    border: 5px solid var(--darkPink);
  }
  @media (orientation: portrait) {
    width: 65%;
    height: auto;
  }
`;
export const StyledSelectedPaymentTypeWrapper = styled(Grid)`
  width: 100%;
  min-height: 200px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 30px 100px 44px;
  .cls-dkph-later-pay-img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }
  @media (orientation: portrait) {
  }
`;
