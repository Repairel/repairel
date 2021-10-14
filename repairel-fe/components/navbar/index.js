import PropTypes from 'prop-types';
import Link from 'next/link';
import HamburgerMenu from 'react-hamburger-menu';
import AppContext from "../../context/AppContext";
import { useContext } from "react";

import { RequestStyledButton, Subtitle, RepairelLinkHeader, SurveyStyledButton ,StyledButton } from '../../styles/global';

import Wrapper from '@components/navbar/Navbar.style';
import Bag from '../../public/bag.svg';
import Person from '../../public/person.png';

const Navbar = ({ open, setOpen }) => {
  const appContext = useContext(AppContext);
  
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
      <div>
      <h1>
        <Link href='/'>
          <RepairelLinkHeader style={{}}>REPAIREL</RepairelLinkHeader>
        </Link>
      </h1>
      <Subtitle style={{}}>The one stop shop for sustainable footwear</Subtitle>
      </div>
      <div>
        <a href={"https://www.instagram.com/"} target="_blank">
          <SurveyStyledButton style={{  }}>Help Us!</SurveyStyledButton>
        </a>
      </div>
      <div>
        <a href={"/product_request"} target="_blank">
          <RequestStyledButton style={{} }>Request
          {/* <img src={Person} style={{ height: "0.8em", width: "0.8em" }}></img> */}
          </RequestStyledButton>
        </a>
      </div>
      <div stle={{ zIndex: '2' }}>
        <a
          href={appContext.isAuthenticated ? '/profile' : '/login'}
          style={{ cursor: 'pointer', paddingRight: "1em" }}
        >
          <img src={Person} style={{ height: "32px", width: "32px" }}></img>
        </a>
        <a
          className='header__summary snipcart-checkout snipcart-summary'
          style={{ cursor: 'pointer' }}
        >
          <img src={Bag}></img>
        </a>
      </div>
    </Wrapper>
    
  );
};
Navbar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default Navbar;
