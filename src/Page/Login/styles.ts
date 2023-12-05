import { Button, ButtonProps, Grid, Typography, styled } from "@mui/material";

export const StyledGridWrapper = styled(Grid)`
  background: var(--white);
  color: var(--black);
  padding: 0px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  column-gap: 0px;

  @media only screen and (orientation: portrait) {
    grid-template-columns: repeat(1, 1fr);
    height: 100%;
    background: var(--white) !important;
  }
`;

export const ImageWrapper = styled("div")`
  background-position: left bottom, left top;
  background-repeat: no-repeat, repeat;
  background-size: cover, cover;
  height: 100%;
  width: 100%;
  grid-column: 1 / 3;
  @media only screen and (orientation: portrait) {
    grid-column: 1;
    height: 40vh;
    background-size: 50%, cover;
  }
`;

export const ButtonUI = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "var(--white)",
  backgroundColor: "var(--darkPink)",
  width: "100%",
  maxWidth: "350px",
  maxHeight: "45px",
  minHeight: "45px",
  borderRadius: "8px",
  boxShadow: "none",
  fontSize: "18px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "var(--lightRose)",
  },
  "&.Mui-disabled": {
    backgroundColor: "var(--disableColor)",
    color: "var(--white)",
  },
}));

export const StyledMainRTWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  width: 100%;
  height: 100%;
  @media only screen and (orientation: portrait) {
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    flex-direction: row;
  }
`;
export const StyledSubMainRTWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px;
  max-width: 600px;
  max-height: 550px;
  height: 500px;
  margin: auto;
`;

export const StyledVersionTypography = styled(Typography)`
  position: absolute;
  bottom: 10px;
  right: 288px;
  color: var(--white);
  @media screen and (min-width: 650px) and (max-width: 650px) and (min-height: 1280px) and (max-height: 1280px) {
    bottom: 35px;
    right: 370px;
  }

  @media screen and (min-width: 1080px) and (max-width: 1080px) and (min-height: 1920px) and (max-height: 1920px) {
    bottom: 55px;
    right: 490px;
    font-size: 25px;
  }

  @media screen and (min-width: 1080px) and (max-width: 1080px) and (min-height: 3000px) and (max-height: 3000px) {
    bottom: 85px;
    right: 500px;
    font-size: 35px;
  }
`;

export const StyledHeaderTypography = styled(Typography)`
  color: var(--black);
  text-align: left;
  font-size: 24;
  font-weight: bold;
  margino-top: 20;
  margin-bottom: 0;
`;

export const StyledSubHeaderTypography = styled(Typography)`
  color: var(--darkGray);
  font-size: 18;
  margin-top: 6;
  margin-bottom: 20;
`;
