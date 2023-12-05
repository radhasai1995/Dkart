import { StyledTransactionWrapper } from "./styles";
import TransactionApproved from "./TransactionApproved";
import TransactionDeclined from "./TransactionDeclined";
import { useLocation } from "react-router-dom";

const Payment = (props: any) => {
    const location = useLocation();
    const { state = {} } = location;
    const { paid: isSuccessfulTransaction = false, require_capture = false } = state;

    return (
        <StyledTransactionWrapper className="cls-dkph-payment-screen">
            {isSuccessfulTransaction ? (
                <TransactionApproved requireCapture={require_capture} />
            ) : (
                <TransactionDeclined />
            )}
        </StyledTransactionWrapper>
    );
};
export { Payment };
export default Payment;
