import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 65px;
  background-color: #171A32;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
`;

const Logo = styled.div`
  font-size: 17px;
  margin-left: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => (props.isLogin ? '#F8D87C' : 'white')};
`;

const Lists = styled.div`
  font-size: 14px;
  display: flex;
  gap: 40px;
  margin-right: 20px;
  ${NavLink}:hover {
    font-size: 15px;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Container>
      <Logo>
        <NavLink to="/">UMC Movie</NavLink>
      </Logo>
      <Lists>
        {isLoggedIn ? (
          <Button onClick={handleLogout}>로그아웃</Button>
        ) : (
          <>
            <NavLink to="/join" isLogin={false}>
              회원가입
            </NavLink>
            <NavLink to="/login" isLogin={false}>
              로그인
            </NavLink>
          </>
        )}
        <NavLink to="/popular" isLogin={false}>
          Popular
        </NavLink>
        <NavLink to="/nowplaying" isLogin={false}>
          Now Playing
        </NavLink>
        <NavLink to="/toprated" isLogin={false}>
          Top Rated
        </NavLink>
        <NavLink to="/upcoming" isLogin={false}>
          Upcoming
        </NavLink>
      </Lists>
    </Container>
  );
}
