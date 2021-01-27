import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  cursor: move;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 6px;
  width: 100%;
  background-color: ${({ headerColor }) =>
    headerColor === `Low`
      ? "#0277bd"
      : headerColor === "Medium"
      ? "#2e7d32"
      : headerColor === "High"
      ? "#ff8f00"
      : "#e57373"};
  font-size: 11px;
  color: #fff;

  span {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-size: 13px;
  min-height: 40px;
  padding: 10px 5px;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  color: #555;
  display: flex;
  justify-content: space-between;

  span {
    cursor: pointer;
  }
`;

export const User = styled.div`
  font-size: 13px;
  padding: 10px 5px;
  border-bottom: 1px solid #e2e2e2;
  color: #555;
  display: flex;
  align-items: center;
  background-color: #fff;
`;

export const Footer = styled.div`
  font-size: 13px;
  color: #555;
  background-color: ${({ footerColor }) =>
    footerColor === `Documentation`
      ? "#bdbdbd"
      : footerColor === "Task"
      ? "#64b5f6"
      : footerColor === "Feature"
      ? "#4db6ac"
      : footerColor === "Usability problem"
      ? "#9575cd"
      : footerColor === "Bug"
      ? "#e3af5b"
      : "#e57373"};
  text-align: center;
  padding: 2px 0;
`;
