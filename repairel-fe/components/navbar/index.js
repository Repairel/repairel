import PropTypes from 'prop-types';
import Link from 'next/link';
import HamburgerMenu from 'react-hamburger-menu';

import { StyledLink } from '../../styles/global';

import Wrapper from '@components/navbar/Navbar.style';
import Bag from '../../public/bag.svg';

const Navbar = ({ open, setOpen }) => {
  const handleClick = () => {
    setOpen(!open);
  };

  const navStyles = {
    zIndex: '2',
    cursor: 'pointer',
  };

  return (
    <Wrapper>
      <div style={navStyles}>
        <HamburgerMenu
          isOpen={open}
          menuClicked={() => handleClick()}
          width={33}
          height={22}
          strokeWidth={2}
          rotate={0}
          color='black'
          borderRadius={0}
        />
      </div>
      <h1>
        <Link href='/'>
          <StyledLink>REPAIREL</StyledLink>
        </Link>
      </h1>
      <a
        style={navStyles}
        className='header__summary snipcart-checkout snipcart-summary'
      >
        <img src={Bag} style={{ display: 'block' }}></img>
      </a>
    </Wrapper>
  );
};
Navbar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default Navbar;
