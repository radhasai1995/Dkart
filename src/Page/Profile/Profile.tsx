import { CardContent, Typography, Backdrop } from "@mui/material";
import useProfileStates from "./useProfilePage";
import {
  StyledCard,
  StyledDiv,
  StyledHeaderTypography,
  StyledStoreTypography,
  StyledGrid,
  RowGrid,
  StyledLabelTypography,
  AvatarGrid,
} from "./styles";
import * as IconGallery from "@iconsGallery";
import _ from "lodash";

const Profile = (props: any) => {
  const { profileDetails = {}, isLoading = false } = useProfileStates();

  const {
    address = {},
    firstName = "",
    lastName = "",
    profileImage = "",
    role = {},
    email = "",
    phoneNumber = {},
  } = profileDetails as any;
  const {
    line1 = "",
    line2 = "",
    region = "",
    country = "",
    postalcode = " ",
  } = address as any;

  const { number = "", countryCode = "" } = phoneNumber as any;
  let phoneNumberValue = number === undefined ? "" : (number as any);
  return (
    <>
      <StyledCard>
        <CardContent style={{ padding: 0, position: "relative" }}>
          {isLoading ? (
            <Backdrop
              sx={{
                color: "var(--white)",
                zIndex: theme => theme.zIndex.drawer + 1,
              }}
              open={isLoading}
            >
              <IconGallery.CircleLoading />
            </Backdrop>
          ) : (
            <>
              <StyledDiv>
                <StyledHeaderTypography variant="h2">
                  {_.upperCase(firstName)}
                  {_.upperCase(lastName)}
                </StyledHeaderTypography>
              </StyledDiv>
              <div>
                <AvatarGrid src={profileImage}>
                  <Typography style={{ fontSize: "52px" }}>
                    {_.upperCase(firstName[0] || "")}
                    {_.upperCase(lastName[0] || "")}
                  </Typography>
                </AvatarGrid>
              </div>
              <div>
                <StyledStoreTypography variant="h6">
                  {_.upperCase(role?.name || "")}
                </StyledStoreTypography>
              </div>
              <div style={{ margin: "80px 80px" }}>
                <RowGrid container spacing={2}>
                  <StyledGrid item xs={6} sm={4} md={3} lg={2} xl={2}>
                    <StyledLabelTypography>{`First Name:`}</StyledLabelTypography>
                    <StyledLabelTypography variant="h5">
                      {firstName}
                    </StyledLabelTypography>
                  </StyledGrid>
                  <StyledGrid item xs={6} sm={4} md={3} lg={2} xl={2}>
                    <StyledLabelTypography>{`Last Name:`}</StyledLabelTypography>
                    <StyledLabelTypography variant="h5">
                      {lastName}
                    </StyledLabelTypography>
                  </StyledGrid>
                </RowGrid>
                <RowGrid container spacing={2}>
                  <StyledGrid item xs={12}>
                    <StyledLabelTypography>{`Email:`}</StyledLabelTypography>
                    <StyledLabelTypography variant="h5">
                      {email}
                    </StyledLabelTypography>
                  </StyledGrid>
                </RowGrid>
                <RowGrid container spacing={2}>
                  <StyledGrid item xs={12}>
                    <StyledLabelTypography>
                      {`Contact Number:`}
                    </StyledLabelTypography>
                    <StyledLabelTypography variant="h5">
                      {`+${countryCode} (${phoneNumberValue?.substring(
                        0,
                        3
                      )}) ${phoneNumberValue?.substring(
                        3,
                        6
                      )}-${phoneNumberValue?.substring(6, 10)}`}
                    </StyledLabelTypography>
                  </StyledGrid>
                </RowGrid>
                <RowGrid container spacing={2}>
                  <StyledGrid item xs={12}>
                    <StyledLabelTypography>{`Address:`}</StyledLabelTypography>
                    <StyledLabelTypography variant="h5">
                      {_.isEmpty(address) ? (
                        <>Not Available</>
                      ) : (
                        <>
                          {line1},<br />
                          {line2 ? (
                            <>
                              {line2},<br />
                            </>
                          ) : null}
                          {region},<br />
                          {country},<br />
                          {postalcode}
                        </>
                      )}
                    </StyledLabelTypography>
                  </StyledGrid>
                </RowGrid>
              </div>
            </>
          )}
        </CardContent>
      </StyledCard>
    </>
  );
};

export default Profile;
export { Profile };
