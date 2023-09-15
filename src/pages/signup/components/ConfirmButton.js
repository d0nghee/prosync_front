import { ConfirmEmail, DisableButton } from "../../../css/SignupStyle";

function ConfirmButton(props) {

    const { disabled, onClick } = props;
    
    const check = () => {
        if (disabled === true) {
            return (
                <DisableButton>중복 확인</DisableButton>
            );
        }
        if (disabled === false) {
            return (
                <ConfirmEmail onClick={onClick}>중복 확인</ConfirmEmail>
            )
        }
    }
    return (   
        <>
            {check()}
        </>
    )
}

export default ConfirmButton;