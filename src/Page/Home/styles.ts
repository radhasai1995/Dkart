import { Typography, styled, Grid } from "@mui/material";

export const StyledMainWrapper = styled(Grid)`
  height: calc(100% - 84px);
  width: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  .cls-StyledSubMainWrapper-kit {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: auto;
  }
  .cls-hp-title-kit {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .cls-hp-title-1-kit {
      display: flex;
    }
  }

  @media (orientation: portrait) {
    .cls-hp-title-kit {
      flex-direction: column;
      justify-content: center;

      .cls-hp-title-1-kit {
        display: flex;
        margin: auto;
        text-align: center;
      }
    }
  }
`;
export const TypographyTouchWrapper = styled(Typography)`
  margin-left: 10px;
  @media (orientation: portrait){ {
    margin-left: 15px;
    font-size: 55px;
  }
`;

export const TypographySeparatedWrapper = styled(Typography)`
 @media (orientation: portrait){{
   font-size: 25px; 
  }
`;

export const StyledImg = styled("img")`
  width: 50vw;
  height: auto;
  border-radius: 10px;
  @media (orientation: portrait){ {
    width: 80vw;
    height: auto;
    border-radius: 10px;
    margin-bottom: 50px;
  }
`;
