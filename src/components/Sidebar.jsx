import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  background-color: #1F2141;
  height: 100%;
  width: 55%;
  right: -55%;
  top: 0;
  color: white;
  font-style: bold;
  position: fixed;
  transition: right 0.5s ease;
  &.open {
    right: 0;
  }
   
`;

const Menu = styled.li`
  margin: 30px 8px;
  list-style: none;

   &: hover {
    color: #F3CC4F;
    font-weight:bold;
   
    }
`;

const CloseButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
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

  @media (max-width: 1024px) {
    display: flex;
  }

  div {
    width: 24px;
    height: 3px;
    background-color: white;
    border-radius: 10px;
    transition: 0.3s;
  }

  &.open div:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const outside = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (outside.current && !outside.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  const handleMenuClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <SideBarWrap ref={outside} className={isOpen ? 'open' : ''}>
      <MenuIcon
        onClick={() => setIsOpen(false)}
      />
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
