import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  background: #fff;
  color: #fff;
`;

export const Inner = styled.div`
  display: flex;
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;

  @media (max-width: 1100px) {
    flex-direction: column;
    background-color: #eaedf0;
    height: 100vh;
    justify-content: center;
    width: 200px;
    position: fixed;
    right: 0;
    padding: 0 30px;
    transition: all 0.5s ease-in-out;
    transform: ${({ showNav }) =>
      showNav ? "translate(170px)" : "translate(0)"};

      span {
        i {
          font-size: 1.5rem;
          color: #62687e;
          cursor: pointer;
          position: absolute;
          top: 5px;
          left: 5px;
          transition: all 0.2s ease-in-out;
          display: inline-block;
    
          &:hover {
            color: #28bd8b;
          }
        }
  }

`;

export const Header = styled.div`
  background-color: #0f181e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  min-width: 220px;

  img {
    width: 45px;
    height: 45px;
  }

  span {
    font-family: "opensans light", sans-serif;
    font-size: 1.375rem;
  }

  @media(max-width: 415px) {
    width: 100%;
  }
`;

export const TextLink = styled(Link)`
  height: min-content;
  color: #62687e;
  font-size: 1rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #2c2f3b;
  }

  a {
    text-align: center;
  }

  @media (max-width: 1100px) {
    width: 100%;
    text-align: center;
    margin: 14px 0;
  }
`;

export const Button = styled.button`
  height: min-content;
  padding: 5px 20px;
  background-color: ${(props) => (props.error ? "transparent" : "#28bd8b")};
  border-radius: 4px;
  border: ${(props) =>
    props.error ? "1px solid #e87878" : "1px solid transparent"};
  cursor: pointer;
  outline: none 0;
  transition: all 0.3s ease-in-out;
  font-size: 1rem;
  color: ${(props) => (props.error ? "#e87878" : "#fff")};

  &:hover {
    background-color: ${(props) => (props.error ? "#e87878" : "#1f936c")};
    color: ${(props) => props.error && "#fff"};
  }

  @media (max-width: 1100px) {
    width: 100%;
    text-align: center;
    margin: 14px 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 50%;
    object-fit: cover;
  }

  i {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eaedf0;
    width: 50px;
    height: 75px;
    font-size: 2rem;
    margin-left: 12px;
  }

  @media (max-width: 1100px) {
      img {
          display: none;
      }
  }
`;

export const TabletNav = styled.div`
  background-color: #eaedf0;
  widht: 200px;
`;

export const Btn = styled.button``;
