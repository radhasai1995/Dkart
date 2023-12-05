import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 500px;
  background-color: var(--white);
  overflow: hidden;
  padding: 4px;
  border-radius: 10px;

  .modal-buttons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;
