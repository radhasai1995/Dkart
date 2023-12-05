
interface Column {
    id:
    | "id"
    | "firstName" | "lastName" | "phoneNumber" | "actions";
    label: string;
    minWidth?: number;
}

export const usersFixture = (props: any) => {
    const { t = () => '' } = props;
    const userDetailColumns: readonly Column[] = [
        { id: "id", label: t("USERS_TABLE_USER_ID"), minWidth: 100 },
        { id: "firstName", label: t("USERS_TABLE_FIRST_NAME"), minWidth: 170 },
        { id: "lastName", label: t("USERS_TABLE_LAST_NAME"), minWidth: 170 },
        { id: "phoneNumber", label: t("USERS_TABLE_PHONE_NUMBER"), minWidth: 170 },
        //{ id: "pin", label: t("USERS_TABLE_PIN"), minWidth: 170 },

    ];
    return { userDetailColumns }
}