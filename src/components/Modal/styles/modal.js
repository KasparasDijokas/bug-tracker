import styled from 'styled-components/macro';

export const ModalBody = styled.div`
    width: ${({ModalState}) => ModalState ? '100px' : '200px'};
    height: 200px;
    // background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${props => !props.ModalState ? 'block' : 'none'};
    background: ${props => props.ModalState ? 'red' : 'blue'};
`;