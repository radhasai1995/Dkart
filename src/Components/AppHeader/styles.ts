import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

export const StyledAppBarWrapper = styled(Grid)`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    min-width:200px;
    min-height:80px;
    width:100%
    height:auto;
    justify-content:space-between;
    align-items:center;
    
  .cls-app-bar-left-container {
    display:flex;
    flex-direction:row;
    min-height:75px;
    width: auto;
    justify-content:space-around;
    align-items:center;

  }
  .cls-app-bar-right-container {
    display:flex;
    flex-direction:row;
    width:fit-content;
    min-height:75px;
    justify-content:space-around;
    align-items:center;
  }
  .cls-app-bar-right-icons {
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    // min-width:250px;
    // min-height:70px;
    width:auto;
    height:auto;
    padding:10px;
  }
  .cls-app-bar-right-action-icons {
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    align-items:center;
    min-width:100px;
    min-height:70px;
    padding-left:0;
    
  }
  .cls-app-bar-date-time{
    font-size: 18px;
    font-weight: bold;
    color: var(--white);
    padding:5px;
  }
  
  
   @media screen and (min-width: 100px) and (max-width:  650px) {
    flex-direction:column;
    .cls-app-bar-left-container { 
        width:100%;
        height:auto;
        margin:3px;
    }
    .cls-app-bar-right-container {
        width:100%;
        height:auto;
        margin:3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
   }
}
`;

export const StyledAppBarLeftContainer = styled(Grid)`
  .cls-header-image {
    width: auto;
    height: 42px;
    margin-left: 20px;
  }
  .cls-apphdr-backicn {
    width: 30px;
    height: 40px;
  }
  .cls-back-button-show {
    visibility: auto;
    padding-right: 0;
  }
  .cls-back-button-hide {
    visibility: hidden;
    padding-right: 0;
  }
  @media screen and (min-width: 100px) and (max-width: 1700px) {
  }
`;
export const StyledAppBarRightContainer = styled(Grid)`
  .cls-menu-icon {
    width: 36px;
    height: 36px;
  }
`;
