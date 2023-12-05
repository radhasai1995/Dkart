import * as GlobalFixture from "@globalFixture";

const {
  TRANSACTION_ID,
  TRANSACTION_DATE_TIME,
  TRANSACTION_CUST_NAME,
  TRANSACTION_PAYMENT_TYPE,
  TRANSACTION_AMOUNT,
  TRANSACTION_SHIFT_TIME,
  TRANSACTION_ASSOCIATE_NAME,
} = GlobalFixture.TOTAL_CONTENTS;

interface Column {
  id:
    | "transactionId"
    | "createdAt"
    | "customerName"
    | "paymentType"
    | "cartPrice"
    | "shiftTime"
    | "soreAssociateName";
  label: string;
  minWidth?: number;
}

export const columns: readonly Column[] = [
  { id: "transactionId", label: "Transaction ID", minWidth: 170 },
  { id: "createdAt", label: "Created date, time", minWidth: 100 },
  {
    id: "customerName",
    label: "Customer Name",
    minWidth: 170,
  },
  {
    id: "paymentType",
    label: "Payment Type",
    minWidth: 170,
  },
  {
    id: "cartPrice",
    label: "Amount",
    minWidth: 170,
  },
  {
    id: "shiftTime",
    label: "Shift Time",
    minWidth: 170,
  },
  {
    id: "soreAssociateName",
    label: "Associate Name",
    minWidth: 170,
  },
];

export const transactionList = [
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
  {
    transactionId: 7054845,
    createdDateTime: "2023-05-31 07:23:37",
    customerName: "Lisa",
    paymentType: "Cash",
    amount: "$0",
    shiftTime: "2023-05-31 07:23:37",
    associateName: "Jhon Wus",
  },
];

export const NO_RECORDS_FOUND = "No Record(s) Found";
export const LATEST_TRANSACTIONS = "Latest Transactions";
export const useTransactionFixture = (props: any) => {
  const { t = () => "" } = props;
  const columns: readonly Column[] = [
    {
      id: "transactionId",
      label: t("TRANSACTIONS_TABLE_TRANSACTION_ID"),
      minWidth: 170,
    },
    {
      id: "createdAt",
      label: t("TRANSACTION_DATE_TIME"),
      minWidth: 100,
    },
    {
      id: "customerName",
      label: t("TRANSACTIONS_TABLE_CUSTOMER_NAME"),
      minWidth: 170,
    },
    {
      id: "paymentType",
      label: t("TRANSACTIONS_TABLE_PAYMENT_TYPE"),
      minWidth: 170,
    },
    {
      id: "cartPrice",
      label: t("TRANSACTIONS_TABLE_AMOUNT"),
      minWidth: 170,
    },
    {
      id: "shiftTime",
      label: t("TRANSACTIONS_TABLE_SHIFT_TIME"),
      minWidth: 170,
    },
    {
      id: "soreAssociateName",
      label: t("TRANSACTIONS_TABLE_ASSOCIATE_NAME"),
      minWidth: 170,
    },
  ];
  return { columns };
};
