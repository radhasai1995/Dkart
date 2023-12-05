interface Column {
  id:
    | "transactionId"
    | "createdAt"
    | "customerName"
    | "paymentType"
    | "amount"
    | "storeAssociateName";
  label: string;
  minWidth?: number;
}

export const useReportsFixture = (props: any) => {
  const { t = () => "" } = props;
  const columns: readonly Column[] = [
    {
      id: "transactionId",
      label: t("REPORTS_TABLE_TRANSACTION_ID"),
      minWidth: 170,
    },
    {
      id: "createdAt",
      label: t("REPORTS_TABLE_CREATE_DATE_TIME"),
      minWidth: 100,
    },

    {
      id: "paymentType",
      label: t("REPORTS_TABLE_PAYMENT_TYPE"),
      minWidth: 170,
    },
    {
      id: "amount",
      label: t("REPORTS_TABLE_AMOUNT"),
      minWidth: 170,
    },
    {
      id: "storeAssociateName", //"associateName",
      label: t("REPORTS_TABLE_ASSOCIATE_NAME"),
      minWidth: 170,
    },
  ];
  const daysBasedFilter = [
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
  ];
  return {
    columns,
    daysBasedFilter,
  };
};
