import { Grid, TextField, Typography, styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";

export const StyledImg = styled("img")`
  border: #de1380 1.5px solid;
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

export const StyledMainWrapper = styled("div")`
  height: calc(100% - 84px);
  width: 100%;
  display: flex;
  flex-direction: column;

  .cls-icon-camera {
    transition: all 400ms ease;
    transform: scale(1);
    &:active {
      transform: scale(0.8);
    }
  }

  .cls-image-set-prd {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }

  .cls-image-set-container {
    display: flex;
    border: 1px solid var(--lightDarkPink);
    position: relative;
  }
  .cls-image-set-container-child {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
  .img-bg-loading {
    background: transparent
      url("http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif")
      center no-repeat;
  }
  .cls-dkph-training-gif-container {
    margin: 20px;
    text-align: center;
  }
  .cls-dkph-training-gif-item {
    width: 80%;
    padding: 10px 0px 5px 0px;
    justify-content: center;
    text-align: center;
    background-color: var(--darkShadePink);
    border-radius: 10px;
    margin: 30px auto;
  }
  .cls-dkph-img-count {
    background-color: transparent;
    color: var(--lightDarkPink);
    margin: 2px 20px 2px 20px;
    font-size: 20px;
    font-weight: 600;
    text-align: end;
    padding: 2px 40px 2px 0px;
  }
  .cls-dkph-rm {
    position: absolute;
    top: 20px;
    right: 30px;
    width: 25px;
    height: 25px;
    text-align: center;
    padding: 2px;
    line-height: 20px;
    cursor: pointer;
    font-weight: bold;
    background-color: rgb(189 49 152);
    border: 2px solid #fff;
  }
  @media screen and (min-width: 100px) and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (orientation: portrait) {
    .cls-image-set-container {
      display: flex;
      width: 100%;
      padding: 50px 0px 0px 0px;
      margin: 0px 0px 15px 0px;
      border-radius: 20px;
    }
    .cls-image-set-container-child {
      grid-template-columns: repeat(3, 1fr);
      margin: 0px 30px 10px 35px;
      grid-gap: 30px;
    }
  }
`;

export const StyledToolbarTypography = styled(Typography)`
  margin: 0px 0px 0px;
  border-bottom: 2px solid #b42a6d;
  padding: 0px 0px 12px 25px;
`;

export const StyledTextField = styled(TextField)`
  background: var(--lightDarkPink);
  & .MuiOutlinedInput-notchedOutline {
    border-color: var(--white) !important;
  }
  & .MuiInputLabel-root {
    color: var(--white) !important;
  }
  & .Mui-focused {
    border-color: var(--white) !important;
  }
`;

export const StyledCancelButton = styled(Button)`
  width: 130px !important;
  height: 40px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  border-color: #641a4a !important;
  color: var(--white) !important;
  font-weight: 600 !important;
  font-size: 16px !important;
`;

export const StyledCreateButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "var(--white)",
  width: "130px",
  height: "40px",
  marginLeft: "10px",
  borderRadius: "10px",
  backgroundColor: "var(--lightDarkPink)",
  fontWeight: 600,
  fontSize: "16px",
  textAlign: "center",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "var(--lightDarkPink)",
  },
  "&.Mui-disabled": {
    backgroundColor: "var(--lightGray)",
    color: "var(--darkGray)",
  },
}));

export const StyledProductImg = styled("img")`
  border: 1px solid #ccc;
  border-radius: 15px;
  max-width: 100%;
  margin: 8px;

  @media screen and (min-height: 1920px) and (max-height: 3000px) {
  }
`;

export const StyledMiddleContainer = styled(Grid)`
  margin-top: "10px",
  max-height: "40vh",
  overflow: "auto",
  @media (orientation: portrait) {
    max-height: 70vh;
  }
`;
export const StyledImagesSetContainer = styled(Grid)`
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
    background: #1a1a1a;
  }
`;
