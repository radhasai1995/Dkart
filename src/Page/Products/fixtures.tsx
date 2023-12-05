
interface Column {
  id: "productName" | "barcode" | "actions";
  label: string;
  minWidth?: number;
}

export const useProductsFixture = (props: any) => {
  const { t = () => '' } = props;
  const productsList = [
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
    {
      itemName: "Coke",
      barCode: "CDE10254",
    },
  ];
  const columns: readonly Column[] = [
    { id: "productName", label: t('PRODUCT_TABLE_ITEM_NAME'), minWidth: 170 },
    {
      id: "barcode", label: t('PRODUCT_TABLE_BAR_CODE'), minWidth: 100
    },

  ];
  return {
    productsList,
    columns
  }
}

