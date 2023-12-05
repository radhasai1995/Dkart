import { Grid, Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as IconGallery from "@iconsGallery";
import {
  TypographySeparatedWrapper,
  TypographyTouchWrapper,
  StyledImg,
  StyledMainWrapper,
} from "./styles";
import { getTransactionID } from "./api";
import { useHomeStates } from "./useHomeStates";
import * as GlobalFixture from "@globalFixture";
import * as PageConfiguration from "@pageConfiguration";
const { API_SUCCESS_STATUS } = GlobalFixture.API_FIXTURE_CONTENTS;
const { TOUCH_TO_START_GIF } = GlobalFixture.MEDIA_FIXTURE_CONTENTS;
const { ACCESS_TOKEN } = GlobalFixture.STORAGE_FIXTURE_CONTENTS;
const Home = (props: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isHomeScreenLoading, setIsHomeScreenLoading } = useHomeStates();
  return (
    <StyledMainWrapper
      onClick={() => {
        if (
          localStorage.getItem(ACCESS_TOKEN) === null ||
          localStorage.getItem(ACCESS_TOKEN) === undefined
        ) {
          navigate("/");
        } else {
          setIsHomeScreenLoading(true);
          getTransactionID({
            cbk: (responseProps: any) => {
              const { status = "" } = responseProps;
              if (status === API_SUCCESS_STATUS) {
                navigate(PageConfiguration?.pathParams?.cart);
              }
              setIsHomeScreenLoading(false);

            },
          });
        }
      }}
    >
      <Grid className="cls-StyledSubMainWrapper-kit">
        {isHomeScreenLoading && (
          <Backdrop
            sx={{ color: "var(--white)", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={isHomeScreenLoading}
          >
            <IconGallery.CircleLoading />
          </Backdrop>
        )}
        <Grid container rowSpacing={1}>
          <StyledImg src={TOUCH_TO_START_GIF} />
        </Grid>
        <Grid className="cls-hp-title-kit" style={{ display: "flex" }}>
          <Grid className="cls-hp-title-1-kit">
            <IconGallery.CodeScannerIcon />
            <TypographyTouchWrapper variant="h3" gutterBottom>
              {t("HOME_LITERAL_TOUCH_TO_START")}
            </TypographyTouchWrapper>
          </Grid>
          <Grid className="cls-hp-title-1-kit">
            <TypographySeparatedWrapper variant="h6" gutterBottom>
              {t("HOME_LITERAL_MAKE_SURE_YOUR")}
              <br />
              {t("HOME_LITERAL_ITEMS_ARE")} <b>{t("HOME_LITERAL_SEPARATED")}</b>
            </TypographySeparatedWrapper>
          </Grid>
        </Grid>
      </Grid>
    </StyledMainWrapper>
  );
};

export default Home;
export { Home };
