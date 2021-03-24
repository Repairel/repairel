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
<<<<<<< HEAD
  let menu = ['login', 'register', 'shop', 'about', 'faq', 'method'];
  let welcomeMessage = '';
  if (user) {
    menu = ['edit details', 'shop', 'about', 'faq', 'method'];
=======
  let menu = ['shop','engage','about', 'faq', 'login'];
  let welcomeMessage = '';
  if (user) {
    menu = [ 'shop','engage','about', 'faq', 'profile' ];
>>>>>>> 1934c03bd6e90cc957e04730ae6ffa823bf5fa72
    welcomeMessage = `Hey ${user.first_name}!`;
  }

  function linkDecider(item) {
    if (item === 'shop') {
      return `/`;
    } else if (item === 'edit details') {
      return `/edit`;
<<<<<<< HEAD
    } else if (item == 'method'){
      return '/scoring'


    } else {
=======
    }
    // else if (item === 'profile') {
    //   return `/wishlist`
    // }
    else {
>>>>>>> 1934c03bd6e90cc957e04730ae6ffa823bf5fa72
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
