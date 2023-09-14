import { ModalBackground, ModalContent, ModalTitle, RedButton, BlueButton, ModalButton } from '../../css/popupStyle';


function Popup(props) {
  const { isOpen, message, buttons } = props;

  return (
    isOpen && (
      <ModalBackground>
        <ModalContent>

          <ModalTitle>{message}</ModalTitle>

          {buttons.map((button, index) => (
            <ModalButton 
              key={index} 
              onClick={button.onClick}
              className={index === 1 ? "modal-button-red" : ""}
            >
              {button.label}
            </ModalButton>
          ))}
        </ModalContent>
      </ModalBackground>
    )
  );
}

export default Popup;
