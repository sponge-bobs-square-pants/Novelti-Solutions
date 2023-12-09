import styled from 'styled-components';


const DeleteModal = ({ onCancel, onConfirm }) => {
    return (
        <ModalContainer>
            <ModalContent>
                <p>Are you sure you want to delete this user?</p>
                <ButtonContainer>
                    <CancelButton onClick={onCancel}>Cancel</CancelButton>
                    <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
                </ButtonContainer>
            </ModalContent>
        </ModalContainer>
    );
};
export default DeleteModal;
    
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const CancelButton = styled.button`
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    background: #ccc;
    color: #333;
`;

const ConfirmButton = styled.button`
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    background: #e44d26;
    color: #fff;
`;

