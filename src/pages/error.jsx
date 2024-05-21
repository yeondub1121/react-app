import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  color: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 255px;
`;

const BigText = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const SmallText = styled.div`
  font-size: 18px;
  font-style: ${props => (props.isEn ? 'italic' : 'normal')};
`;

const NavLink = styled(Link)`
  font-size: 23px;
  text-decoration: none;
  color: white;
`;

export default function ErrorPage() {
  return (
    <Container>
      <BigText>Oops!</BigText>
      <SmallText isEn={false}>예상치 못한 에러가 발생했습니다</SmallText>
      <SmallText isEn={true}>Not Found</SmallText>
      <NavLink to="/">메인으로 이동하기</NavLink>
    </Container>
  );
}