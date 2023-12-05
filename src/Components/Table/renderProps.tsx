import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import * as IconGallery from "@iconsGallery";
import * as GlobalFixture from "@globalFixture";

const { NO_RECORDS_FOUND } = GlobalFixture.TOTAL_CONTENTS;

export const renderHeader = ({ columns = [] }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          {columns.map((column: any) => (
            <>
              <TableCell
                key={column?.id}
                align={column?.align}
                style={{ minWidth: column?.minWidth }}
                className="coloum_cell"
              >
                {column?.label}
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};

export const renderTableBody = (props: any) => {
  const { list = [], columns = [], onHandleEdit = () => '', t = () => '' } = props;
  let colSpan = columns && columns.length ? columns.length : 1;
  return (
    <>
      <TableBody >
        {list && list.map((row: any) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1}>
              {columns.map((column: any) => {
                let value = row[column?.id];
                if (column.id === 'phoneNumber') {
                  const { number = '', countryCode = '' } = row[column?.id] || {}
                  value = `${countryCode}${number}`;
                }

                return (
                  <TableCell className="body_cell" key={column.id}>
                    {column?.id === "actions" ? (
                      <IconGallery.EditIcon
                        onClick={() => onHandleEdit(row)}
                      />
                    ) : (
                      value || '-'
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
        {list && list.length === 0 && (
          <TableRow>
            <TableCell className="body_cell" colSpan={colSpan} align="center">
              {t('NO_RECORDS_FOUND')}

            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export const renderPagination = ({
  rowsPerPage = 10,
  page = 1,
  onHandleChangePage = () => "",
  onHandleChangeRowsPerPage = () => "",
  rowsPerPageOptions = [10, 20, 40, 80, 100],
  totalDocs = 0,
  minTableRecordCount = 10
}) => {
  return (
    <>
      {" "}
      {totalDocs > minTableRecordCount ? (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalDocs}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={onHandleChangePage}
          onRowsPerPageChange={onHandleChangeRowsPerPage}
          className="pagination"
        />
      ) : (
        <div className="cls-empty-pagination"></div>
      )}
    </>
  );
};
