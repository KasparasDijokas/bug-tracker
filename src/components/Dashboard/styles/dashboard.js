import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  background-color: #152029;
  width: 200px;
  height: 100vh;
  color: #fff;
`;

export const Inner = styled.div`
    
`;

export const Header = styled.div`
  background-color: #0f181e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;

  img {
    width: 45px;
    height: 45px;
  }

  span {
    font-family: "opensans light", sans-serif;
    font-size: 1.375rem;
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }

  h1 {
    margin: 15px 0 10px;
    font-size: 1.125rem;
    color: rgba(255,255,255,0.8);
    margin-bottom: 0;
  }

  p {
    font-weight: 300;
    font-size: 0.875rem;
    margin-bottom: 34px;
    color: rgba(255,255,255,0.8);
  }

  span {
    font-weight: 700;
    text-transform: capitalize;
  }
`;

export const Link = styled(NavLink)`
display: block;
padding: 17px 15px;
color: rgba(255,255,255,0.8);
text-transform: capitalize;
font-size: 1rem;
border-left: 4px solid transparent;

&.active {
    background-color: #243746;
    border-left: 4px solid #28bd8b;
}

&:hover {
    background-color: #243746;
    border-left: 4px solid #28bd8b;
}

span {
    padding-right: 15px;
}
`;
