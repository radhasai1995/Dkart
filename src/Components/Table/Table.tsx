import { renderHeader, renderPagination, renderTableBody } from "./renderProps";
import { StyledPaper, StyledTableContainer, StyledTable } from "./styles";
import * as IconGallery from "@iconsGallery";
import { useTranslation } from "react-i18next";

const Table = (props: any) => {
  const {
    columns = [],
    rowsPerPage = 10,
    page = 0,
    onHandleChangePage = () => "",
    onHandleChangeRowsPerPage = () => "",
    rowsPerPageOptions = [10, 20, 40, 80, 100],
    totalDocs = 0,
    list = [],
    onHandleEdit = () => "",
    isLoading = false,
    isTransaction
  } = props;

  const { t } = useTranslation();
  return (
    <StyledPaper>
      {isLoading ? (
        <IconGallery.CircleLoading />
      ) : (
        <>
          <StyledTableContainer
            style={{
              maxHeight: isTransaction
                ? " calc(100vh - 440px)"
                : " calc(100vh - 310px)",
            }}
          >
            <StyledTable stickyHeader aria-label="sticky table">
              {renderHeader({ columns })}
              {renderTableBody({ list, columns, onHandleEdit, t })}
            </StyledTable>
          </StyledTableContainer>
          {renderPagination({
            rowsPerPage,
            page,
            onHandleChangePage,
            onHandleChangeRowsPerPage,
            rowsPerPageOptions,
            totalDocs,
          })}
        </>
      )}
    </StyledPaper>
  );
};

export default Table;
export { Table };
