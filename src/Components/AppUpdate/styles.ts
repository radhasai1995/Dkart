import { styled } from "@mui/material/styles";
import { Box, Slide, Button, Grid, Typography } from "@mui/material";

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow: hidden;
  padding: 4px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
`;
export const StyledSlide = styled(Slide)`
  background-color: rgba(220, 18, 128, 0.1);
`;
export const StyledWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  .cls-dkph-update-now {
    background-color: var(--darkPink);
    color: var(--white);
    margin: 0px 10px 0px 0px;
  }
  .cls-dkph-update-later {
    background-color: var(--white);
    color: var(--darkPink);
    margin: 0px 5px 0px 0px;
  }
`;
export const StyledBoxWrapper = styled(Box)`
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 5px 0px 10px;
  .cls-dkph-flex-end {
    justify-content: flex-end;
    margin: 0px 10px 0px 0px;
  }
`;
export const StyledTypography = styled(Typography)`
  color: var(--white);
  text-align: center;
  width: 180px;
  font-weight: 700;
`;
export const StyledButton = styled(Button)`
  text-transform: capitalize;
  font-weight: 700;
  border-radius: 20px;
  width: 40%;
  height: auto;
`;

export const PaperStyles = {
  m: 6,
  width: 470,
  height: 60,
  borderRadius: 30,
  border: "1px solid var(--darkPink)",
  backgroundColor: "rgba(220, 18, 128, 0.1)",
};
