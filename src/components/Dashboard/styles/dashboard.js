import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  background-color: #152029;
  display: inline-block;
  min-width: 220px;
  height: 100vh;
  color: #fff;
  padding-right: 20px;
  position: relative;
  transition: all 0.3s ease;
  display: inline-block;

  .fa-chevron-right {
    font-size: 2rem;
    position: absolute;
    right: 0px;
    top: 40%;
    display: none;
    color: #28bd8b;

    &:hover {
      color: rgba(255,255,255,0.8);
    }

    @media(max-width: 415px) {
      display: block;
    }
  }

  .fa-times-circle {
    font-size: 1.2rem;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #28bd8b;

    &:hover {
      color: rgba(255,255,255,0.8);
    }
  }

  @media(max-width: 415px) {
    transform: ${props => !props.show ? 'translate(-200px)' : 'translate(0)'};
  }
`;

export const Inner = styled.div`
   
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

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


export const Route = styled.p`
display: block;
padding: 17px 15px;
color: rgba(255,255,255,0.8);
text-transform: capitalize;
font-size: 1rem;
border-left: 4px solid transparent;
margin: 0;

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