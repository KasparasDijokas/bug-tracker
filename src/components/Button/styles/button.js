import styled from 'styled-components/macro';

export const Btn = styled.button`
  height: min-content;
  padding: 5px 20px;
  background-color: ${(props) => (props.error || props.transparent ? "transparent" : "#28bd8b")};
  border-radius: 4px;
  border: ${(props) =>
    props.error ? "1px solid #e87878" : props.transparent ? '1px solid #28bd8b' : "1px solid transparent"};
  cursor: pointer;
  outline: none 0;
  transition: all 0.3s ease-in-out;
  font-size: 1rem;
  color: ${(props) => (props.error ? "#e87878" : props.transparent ? '#28bd8b' : "#fff")};

  &:hover {
    background-color: ${(props) => (props.error ? "#e87878" : "#1f936c")};
    color: ${(props) => props.error || props.transparent ? "#fff" : '#28bd8b'};
  }

  @media (max-width: 1100px) {
    width: 100%;
    text-align: center;
    margin: 14px 0;
  }
`;