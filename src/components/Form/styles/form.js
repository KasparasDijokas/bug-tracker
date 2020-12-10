import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
`;

export const Inner = styled.div`
  width: 960px;
  height: 90vh;
  z-index: 2;
  background: #fff;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
`;

export const FormContainer = styled.div`
  width: 735px;
  height: 468px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

export const PictureContainer = styled.div`
  width: 316px;
  display: flex;
  align-items: center;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const DetailsContainer = styled.div`
  width: 290px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #333;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 54px;
  margin: 0;
`;

export const Input = styled.input`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  color: #666;
  display: block;
  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
  outline: none;
  border: none;
  width: 100%;
`;

export const Button = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: none;
  background: #57b846;
  transition: all 0.4s;
  margin: 20px 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #333;
  }
`;

export const Span = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: #999;
  padding-right: 8px;
`;

export const LinkEl = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: #666;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    color: #57b846;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  position: relative;
`;

export const Icon = styled.span`
  font-size: 15px;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666;
  transition: all 0.4s;
`;

export const Frame = styled.div`
  width: 100%;
  text-align: center;
`;

export const AccountWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 290px;
  text-align: center;
`;

export const Message = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => (props.error ? "red" : "#57b846")};
  text-decoration: none;
  width: 100%;
  text-align: center;
  margin: 0;
`;
