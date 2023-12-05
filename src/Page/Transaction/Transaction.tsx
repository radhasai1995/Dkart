import { Grid, CardContent, CardHeader } from "@mui/material";
import useTransactionStates from "./useTransactionPage";
import * as IconGallery from "@iconsGallery";
import {
  StyledCard,
  StyledDiv,
  StyledRowGrid,
  StyledToolbar,
  StyledToolbarTypography,
  TypographyWrapper,
  TypographysubtitleWrapper,
} from "./styles";
import * as Utils from "@utils";
import * as Fixture from "./fixtures";
import * as ComponentLib from "@componentLib";
import { useTranslation } from "react-i18next";

const Transaction = (props: any) => {
  const TransactionPageStates = useTransactionStates();
  const { t } = useTranslation();
  const { columns = [] } = Fixture.useTransactionFixture({ t });
  const {
    getTransactionPageDetails,
    transactionData,
    totalTransactionRecords,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCloseTransactions,
    isLoading,
  } = TransactionPageStates;

  const transactionProps = {
    rowsPerPage: getTransactionPageDetails?.rowsPerPage,
    page: getTransactionPageDetails?.currentTransactionPage,
    totalDocs: totalTransactionRecords,
    list: transactionData,
    onHandleChangePage: handleChangePage,
    onHandleChangeRowsPerPage: handleChangeRowsPerPage,
    handleCloseTransactions,
    columns: columns,
    isLoading: isLoading,
    isTransaction: true,
  };

  const { userRole = "", userName: name = "" } = Utils?.getStorage() || {};

  return (
    <>
      <StyledCard>
        <CardHeader
          action={
            <>
              <IconGallery.PrinterIcon />
              <IconGallery.CloseIcon
                onClick={() => {
                  handleCloseTransactions();
                }}
              />
            </>
          }
          title=""
          subheader=""
        />
        <CardContent>
          <StyledRowGrid container>
            <Grid item xs={1} md={1} lg={0.5} xl={0.5}>
              <IconGallery.DefaultUser />
            </Grid>
            <Grid item xs={11} md={11} lg={11.5} xl={11.5}>
              <TypographyWrapper variant="h6">{name}</TypographyWrapper>
              <TypographysubtitleWrapper variant="subtitle2">
                {userRole}
              </TypographysubtitleWrapper>
            </Grid>
          </StyledRowGrid>
          <StyledDiv>
            <StyledToolbar>
              <StyledToolbarTypography variant="h5">
                {t("TRANSACTIONS_PAGE_TITLE")}
              </StyledToolbarTypography>
            </StyledToolbar>
            <ComponentLib.Table {...transactionProps} />
          </StyledDiv>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default Transaction;
export { Transaction };
