import styled from "styled-components/macro";

export const Btn = styled.button`
  height: min-content;
  padding: ${(props) => (props.gray ? "4px 12px" : "5px 20px")};
  background-color: ${(props) =>
    props.btnState
      ? "#b6b6b6"
      : props.error || props.transparent || props.gray
      ? "transparent"
      : "#28bd8b"};
  border-radius: 4px;
  border: ${(props) =>
    props.error
      ? "1px solid #e87878"
      : props.transparent
      ? "1px solid #28bd8b"
      : "1px solid transparent"};
  cursor: pointer;
  outline: none 0;
  transition: all 0.3s ease-in-out;
  font-size: ${(props) => (props.gray ? "0.875rem" : "1rem")};
  color: ${(props) =>
    props.btnState
      ? "#fff"
      : props.error
      ? "#e87878"
      : props.transparent || props.gray
      ? "#28bd8b"
      : "#fff"};

  &:hover {
    background-color: ${(props) =>
      props.error ? "#e87878" : props.gray ? "#b6b6b6" : "#1f936c"};
    color: ${(props) =>
      props.error || props.transparent || props.btnState ? "#fff" : "#28bd8b"};
  }

  &:disabled {
    background: gray;
    cursor: default;

    &:hover {
      color: #fff;
    }
  }

  @media (max-width: 1100px) {
    width: 100%;
    text-align: center;
    margin: 14px 0;
  }
`;
