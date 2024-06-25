import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  background-color: #1F2141;
  color: white;
  font-style: bold;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.5s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
 
  
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;

  padding: 10px 20px;
  cursor: pointer;  
`;

const CloseIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const Menu = styled.li`
  margin: 30px 8px;
  list-style: none;
  color: white;

  &:hover {
    color: #F3CC4F;
    font-weight: bold;
  }
`;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenuClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <SideBarWrap isOpen={isOpen}>
      <Header>
        <Logo onClick={() => handleMenuClick('/')}>UMC Movie</Logo>
        <CloseIcon onClick={() => setIsOpen(false)}>×</CloseIcon>
      </Header>
      <ul>
        <Menu onClick={() => handleMenuClick('/join')}>회원가입</Menu>
        <Menu onClick={() => handleMenuClick('/popular')}>Popular</Menu>
        <Menu onClick={() => handleMenuClick('/nowplaying')}>Now Playing</Menu>
        <Menu onClick={() => handleMenuClick('/toprated')}>Top Rated</Menu>
        <Menu onClick={() => handleMenuClick('/upcoming')}>Upcoming</Menu>
      </ul>
    </SideBarWrap>
  );
};

export default Sidebar;
