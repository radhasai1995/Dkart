export interface IPhoneNumberTyping {
  countryCode: string;
  number: string;
}
export interface IUserDetail {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: IPhoneNumberTyping;
  pin: string;
  userRole: string;
}
export interface IUsersStateTypings {
  page: number | string;
  rowsPerPage: number | string;
  usersData: IUserDetail[] | [];
  setPage: () => number;
  setUsersData: () => IUserDetail[] | [];
  setRowsPerPage: () => number;
  handleChangePage: () => any;
  handleChangeRowsPerPage: () => any;
  handleCreateUser: () => any;
}
