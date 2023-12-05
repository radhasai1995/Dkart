import {
  Card,
  Grid,
  TableContainer,
  TableRow,
  Typography,
  styled,
  Button,
  ButtonProps,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(theme => ({
  customTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: "var(--lightPink)",
    color: "var(--white)",
    padding: "10px 20px",
    fontSize: "14px",
  },
  customArrow: {
    color: "var(--lightPink)",
    marginTop: "0px",
  },
}));
export const StyledCard = styled(Card)`
  background: var(--white);
  height: 100%;
  border-radius: 10px;
  max-height: 100vh;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  column-gap: 0px;
  & .MuiCardContent-root {
    padding: 0px !important;
  }
  grid-template-areas:
    "header header header header"
    ". main main ."
    "footer footer footer footer";
  @media (orientation: portrait) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    height: 100%;
  }
  .cls-reloadkit-icon {
    animation: rotating 2s linear infinite;
    animation-direction: reverse;
  }
`;

export const StyledCartSubMainGrid = styled(Grid)`
  padding: 5px 10px;
  height: calc(100% - 25px);
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

export const StyledCartRightPage = styled(Grid)`
  width: 65%;
  @media (orientation: portrait) {
    width: 100%;
    // margin: 60px 0;
  }
`;

export const StyledCartLeftPage = styled(Grid)`
  width: 35%;
  @media (orientation: portrait) {
    width: 100%;
    margin-bottom: 50px;
    margin-top: 50px;
  }
`;

export const StyledTimerBox = styled(Grid)`
  width: calc(65% - 50px);
  position: absolute;
  bottom: 50px;
  margin-top: -20px;
  right: 50px;
  .cls-dkph-payment-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: auto;
  }
  @media (orientation: portrait) {
    width: 100%;
    right: 0;
  }
`;

export const StyledCartMainGrid = styled(Grid)`
  padding: 5px 10px;
  height: calc(100% - 84px);
  width: 100%;
  @media (orientation: portrait) {
    height: 60vh;
  }
  @media screen and (min-height: 3000px) and (max-height: 3000px) {
    height: 72vh;
  }
`;

export const TypographyWrapperLeft = styled(Typography)`
  color: #848484;
  font-weight: 600;
  padding: 4px 8px 4px 20px;
  margin: 0;
  font-size: 20px;
  @media (orientation: portrait) {
    font-size: 20px;
  }
  // @media screen and (min-height: 3000px) and (max-height: 3000px) {
  //   font-size: 26px;
  // }
`;

export const TypographyWrapperRight = styled(Typography)`
  color: #0a0a0a;
  padding: 4px 20px 4px 8px;
  text-align: right;
  font-size: 16px;
  font-weight: 900;
  margin: 0;
  font-size: 22px;
  @media (orientation: portrait) {
    font-size: 22px;
  }
  // @media screen and (min-height: 3000px) and (max-height: 3000px) {
  //   font-size: 30px;
  // }
`;

export const StyledRightGrid = styled(Grid)`
  width: 50vw;
  height: 68vh;
  border-radius: 10px;
  @media (orientation: portrait) {
    width: 50vw;
    height: 30vh;
    border-radius: 10px;
  }
`;

export const StyledPayGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  img {
    max-width: 23%;
    min-width: 150px;
  }
  @media (orientation: portrait) {
    margin-top: 12px;
  }
  // @media screen and (min-height: 800px) and (max-height: 3000px) {
  //   margin-top: 12vh;
  // }
`;

export const StyledTableContainer = styled(TableContainer)`
  height: calc(100vh - 400px);
  color: var(--black);
  margin-top: 10px;
  margin-bottom: 10px;
  grid-area: main;
  background-color: var(--white);
  border-radius: 10px;
  ::-webkit-scrollbar {
  height: 12px;
  width: 12px;
  background: #969696;
  -webkit-border-radius: 1ex;
}

::-webkit-scrollbar-thumb {
  background: var(--darkPink);
  -webkit-border-radius: 1ex;
  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

::-webkit-scrollbar-corner {
  background: #1A1A1A;
}
  & .MuiTableCell-root {
    border-bottom: 0px;
    color: var(--black);
    font-weight: 700;
    font-size: 16px;
  }
  @media (orientation: portrait) {
 
  height: calc(100vh - 67.5vh);
    & .MuiTableCell-root {
      font-size: 20px;
    }
  }
   @media screen and (max-width: 800px) {
    height: calc(100vh - 75vh);
  }

  @media screen and (min-height: 3000px) and (max-height: 3000px) {
    & .MuiTableCell-root {
      font-size: 26px; 
    }
`;
export const StyledTableRow = styled(TableRow)`
  .cls-dkph-table-data {
    position: relative;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cls-dkph-table-data .cls-dkph-table-data-title {
    max-width: calc(100% - 200px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cls-dkph-table-data p {
    position: absolute;
    top: 0px;
    right: 130px;
  }
`;
export const StyledImg = styled("img")`
  border: #00ffff 1px solid;
  border-radius: 12px;
  padding: 10px;
  @media (max-width: 1920px) {
    max-height: 480px;
    width: auto;
  }

  @media (max-width: 1280px) {
    max-height: 350px;
    width: auto;
  }
  @media (max-width: 1080px) {
    max-height: 440px;
    width: auto;
  }

  @media (max-width: 800px) {
    max-height: 300px;
    width: auto;
  }

  @media (orientation: portrait) {
    max-height: 100% !important;
    width: 100% !important;
    height: auto !important;
    max-width: 850px !important;
  }
`;
export const StyledUnknownProduct = styled("img")`
  transform: scaleX(-1);
  object-fit: contain;
  width: auto;
  height: 82%;
  max-height: 350px;
  border-radius: 10px;
  margin-top: 12px;
  padding: 5px;
  border: 2px solid var(--red);
  @media (max-width: 1920px) {
    max-height: 480px;
    width: auto;
  }

  @media (max-width: 1280px) {
    max-height: 350px;
    width: auto;
  }
  @media (max-width: 1080px) {
    max-height: 440px;
    width: auto;
  }

  @media (max-width: 800px) {
    max-height: 300px;
    width: auto;
  }
  @media (orientation: portrait) {
    max-height: 100% !important;
    width: 100% !important;
    height: auto !important;
    max-width: 850px !important;
  }
`;

export const StyledPayButton = styled(Button)`
  width: 13%;
  height: 10%;
  border: none;
  font-size: 25px;
  font-weight: bolder;
  background-color: var(--grassGreen);
  color: #ffffffd1;
  margin-right: 50px;
  margin-bottom: -5px;
  border-radius: 18px;
  &:hover {
    background-color: var(--grassGreen);
  }
  @media (orientation: portrait) {
    width: 200px !important;
    height: 60px !important;
  }
`;

export const StyledMainGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  @media (orientation: portrait) {
    height: 40vh;
  }
`;

export const StyledMainWrapper = styled(Grid)`
  height: calc(100% - 84px);
  width: 100%;
  display: flex;
  margin: auto;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
export const StyledProductImg = styled("img")`
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  padding: 3px;
  @media screen and (min-height: 1920px) and (max-height: 3000px) {
    max-width: 50px;
    max-height: 50px;
  }
`;

export const StyledSyncButton = styled(LoadingButton)<ButtonProps>(
  ({ theme }: any) => ({
    color: "var(--white)",
    background: "var(--blue)",
    width: "30%",
    margin: "auto",
    display: "flex",
    border: "1px solid var(--blue)",
    borderRadius: "20px",
    boxShadow: "none",
    fontSize: "16px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "var(--blue)",
    },
    "&.Mui-disabled": {
      backgroundColor: "var(--blue)",
      color: "var(--white)",
    },
  })
);

export const StyledCartSummaryWrapper = styled(Grid)`
  width: 100%;
  height: 100%;
  .cls-default-border-style {
    border-bottom: 1px dashed var(--darkGray);
  }
`;
export const StyledCartSummaryHeaderWrapper = styled(Grid)`
  width: 100%;
  background-color: white;
  border-bottom: 2px dashed var(--darkGray);
  .cls-dkph-header-title {
    font-size: 20px;
    color: var(--darkPink);
    text-transform: uppercase;
    font-weight: 900;
    padding: 20px 10px 10px 20px;
    position: relative;
    width: 240px;
  }
`;
export const StyledCartSummaryHeader = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
export const StyledCartSummaryHeaderContents = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 0px 20px 5px 20px;
  .cls-dkph-header-contents {
    font-size: 14px;
    color: var(--darkGray);
    text-transform: uppercase;
    padding: 5px;
    font-weight: 600;
  }
  .cls-dkph-right-alignment {
    text-align: right;
  }
  .cls-dkph-left-alignment {
    text-align: left;
  }
`;
export const StyledCartSummaryHeaderTypo = styled(Typography)`
  color: var(--black);
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
`;
export const StyledCartSummaryListWrapper = styled(Grid)`
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  height: 540px;

  ::-webkit-scrollbar {
    height: 12px;
    width: 4px;
    background: #969696;
    -webkit-border-radius: 1ex;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--darkPink);
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }

  ::-webkit-scrollbar-corner {
    background: #1a1a1a;
  }
`;
export const StyledCartSummaryListItemWrapper = styled("div")`
  border-bottom: 2px dashed #cfcaca;
  i {
    width: 30px;
    height: 30px;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: #fff;
  }
  .cls-dkph-i-left {
    float: left;
    margin-left: -20px;
    background-color: #000;
  }
  .cls-dkph-i-right {
    float: right;
    margin-right: -20px;
    background-color: #000;
  }
  .cls-dkph-i-top {
    margin-top: -20px;
    background-color: #000;
  }
  .cls-dkph-i-bottom {
    margin-top: -20px;
    margin-bottom: -22px;
    background-color: #000;
  }
  .cls-dkph-product-info {
    width: 65%;
  }
  .cls-dkph-product-qty {
    width: 15%;
  }
  .cls-dkph-product-price {
    width: 15%;
    margin: 0px 20px 0px 0px;
  }
`;

export const StyledCartSummaryListItem = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  min-height: 80px;
`;
export const StyleItemImage = styled("img")`
  width: 60px;
  height: 60px;
  border: 1px solid var(--darkGray);
  border-radius: 10px;
  object-fit: contain;
`;

export const StyleItemDetailWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-width: calc(100%-100px);
  max-width: calc(100%-20px);

  margin: 0px 0px 0px 25px;
  .cls-dkph-product-info-style {
    font-size: 18px;
    color: #403e3e;
    padding: 5px 5px 0px 5px;
    font-weight: normal;
    max-width: 385px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 5px 2px 10px;
  }
  .cls-dkph-product-qty-style {
    font-size: 18px;
    color: #403e3e;
    padding: 5px;
    font-weight: 900;
    text-align: center;
    width: 100%;
  }
  .cls-dkph-product-price-style {
    font-size: 18px;
    color: #403e3e;
    padding: 5px;
    font-weight: 900;
    width: 100%;
    text-align: right;
  }
  .cls-dkph-barcode-info-style {
    font-size: 12px;
    color: #454343;
    padding: 5px;
    font-weight: 900;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 0px 0px 20px;
  }
  .cls-dkph-barcode-info-wrapper {
    position: relative;
    width: 210px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 0px 5px;
    margin: 0px 0px 5px 10px;
    border-radius: 25px;
    background-color: #d8dbdd;
  }
  .cls-dkph-barcode-action-wrapper {
    position: relative;
    width: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 0px 5px;
    margin: 0px 0px 5px 5px;
    border-radius: 25px;
  }
  .cls-dkph-product-info-wrapper {
  }
  .cls-dkph-product-info-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .cls-dkph-product-info-container-hide{
    display: none;
    
  }
`;
export const StyledItemTypo = styled(Typography)`
  color: var(--black);
  font-size: 16px;
  padding: 10px;
`;
export const StyledIconButton = styled(IconButton)``;
