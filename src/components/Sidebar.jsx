import React, { useRef, useEffect, useState} from 'react';
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
  const outside = useRef(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (outside.current && !outside.current.contains(e.target)) {
        setIsOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  const handleMenuClick = (path) => {
    setIsOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setMenuOpen(!menuOpen);
  };
  return (
    <SideBarWrap isOpen={isOpen}>
      <Header>
        <Logo onClick={() => handleMenuClick('/')}>UMC Movie</Logo>
        <MenuIcon className={menuOpen ? 'open' : ''} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </MenuIcon>
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
