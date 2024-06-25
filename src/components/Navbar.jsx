import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Container = styled.div`
  width: 100%;
  height: 65px;
  background-color: #171a32;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    height: 55px;
    padding: 0 10px;
  }
`;

const Logo = styled.div`
  font-size: 17px;
  margin-left: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-left: 10px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.isLogin ? '#f8d87c' : 'white')};

  @media (max-width: 768px) {
    font-size: 16px;

  }
`;

const Lists = styled.div`
  font-size: 14px;
  display: flex;
  gap: 40px;
  margin-right: 40px;

  @media (max-width: 768px) {
    display: none;
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

  @media (max-width: 768px) {
    font-size: 12px;

    &:hover {
      font-size: 13px;
    }
  }
`;

const MenuIcon = styled.div`
  cursor: pointer;
  display: none;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    margin-right: 30px;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    border-radius: 10px;
   
  }

   &.div:line1 {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.div:line2 {
    opacity: 0;
  }

  &.div:line3 {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
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
        <MenuIcon onClick={toggleSidebar} className={isSidebarOpen ? 'open' : ''}>
          <div></div>
          <div></div>
          <div></div>
        </MenuIcon>
      </Container>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default Navbar;