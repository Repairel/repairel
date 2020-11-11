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
  let menu = ['login', 'register', 'shop', 'about', 'faq'];
  let welcomeMessage = '';
  if (user) {
    menu = ['shop', 'about', 'faq'];
    welcomeMessage = `Hey ${user.first_name}!`;
  }

  const menuItems = menu.map((item, index) => {
    return (
      <MenuListItem key={index}>
        <Link key={index} href={item === 'shop' ? '/' : `/${item}`}>
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
