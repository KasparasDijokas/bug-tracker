import styled from "styled-components/macro";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const Inner = styled.div``;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  background: #fff;
  width: 90%;
  margin: 20px auto 0;
  height: 130px;
  display: flex;
  align-items: center;

  h1 {
    margin-top: 0;
    color: #333333;
    font-size: 1.125rem;
  }

  p {
    margin-top: 0;
    color: #666666;
    font-size: 0.875rem;
  }

  img {
    float: left;
    width: 90px;
    height: 90px;
    margin: 20px 20px 20px 30px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 164px;
  padding: 20px 3px;
  border-left: 1px solid #e0e0e0;
  text-align: center;

  span {
    color: #28bd8b;
    font-size: 2.625rem;
    font-weight: bold;
  }

  h2 {
    margin: 0 0 8px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-grow: 2;

  h1 {
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 0;
  width: 90%;
`;

export const ProjectCard = styled.div`
  height: 110px;
  margin: 10px 0;
  background-color: #f4f5f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto 10px;

  img {
    float: left;
    width: 90px;
    height: 90px;
    margin: 20px 20px 20px 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  h1 {
    margin: 0 0 6px;
    color: #333333;
    font-size: 1.125rem;
  }

  h2 {
    color: #666666;
    text-transform: uppercase;
    line-height: 40px;
    font-size: 0.75rem;
  }

  span {
    color: #333333;
    font-family: "opensans bold", sans-serif;
    font-weight: bold;
    line-height: 40px;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: #666666;
    font-size: 0.875rem;
  }
`;

export const Main = styled.div`
  background: #fff;
  margin: 20px auto 0;
  width: 90%;
`;
