import Link from 'next/link';
import PropTypes from 'prop-types';
import Logo from '../../public/repairel-logo.svg';

import { Wrapper, MenuList, MenuListItem, MenuLogo, WelcomeUser, Logout } from './Menu.style';
import { StyledLink } from '../../styles/global';
import Socials from '@components/socials';
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { logout } from "../../lib/auth"

const Menu = ({ open, setOpen }) => {
  const handleLinkClick = () => {
    setOpen(!open);
  };

  const { user, setUser } = useContext(AppContext);
  let menu = ['shop','engage','method', 'faq', 'login'];
  let welcomeMessage = '';
  if (user) {
    menu = [ 'shop','engage','method', 'faq', 'profile' ];
    welcomeMessage = `Hey ${user.first_name}!`;
  }

  function linkDecider(item) {
    if (item === 'shop') {
      return `/`;
    } else if (item === 'edit details') {
      return `/edit`;
    } else if (item == 'method'){
      return '/scoring'


    } else {
      return `/${item}`
    }
  }

  const menuItems = menu.map((item, index) => {
    return (
      <MenuListItem key={index}>
        <Link key={index} href={linkDecider(item)}>
          <StyledLink onClick={() => handleLinkClick()}>{item}</StyledLink>
        </Link>
      </MenuListItem>
    );
  });

  function hasDivider() {
    if (user) {
      return <hr />
    }
    return
  }

  function hasLogout() {
    if (user) {
      return <Logout onClick={() => {logout(); setUser(null);}}>logout</Logout>
    }
  }

  return (
    <Wrapper open={open}>
      <MenuLogo src={Logo}></MenuLogo>
      <MenuList>
        <WelcomeUser>{welcomeMessage}</WelcomeUser>
        {hasDivider()}
        {menuItems}
      </MenuList>
      {hasLogout()}
      <Socials />
    </Wrapper>
  );
};

Menu.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default Menu;
