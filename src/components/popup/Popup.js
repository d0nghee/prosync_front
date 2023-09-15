import { ModalBackground, ModalContent, ModalTitle, RedButton, BlueButton, ModalButton } from '../../css/popupStyle';




function Popup(props) {
  const { isOpen, message, buttons } = props;

  const modalStyle = {
    width : '400px'
  }

  return (
    isOpen && (
      <ModalBackground>
        <ModalContent style={modalStyle}>

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
