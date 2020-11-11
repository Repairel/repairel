import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-transform: uppercase;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  background-color: ${({ theme }) => theme.colors.light};
`;

const MenuList = styled.ul`
  padding: 0;
  text-align: center;
`;

const MenuListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
  font-size: 1.75rem;
`;

const WelcomeUser = styled.span`
  padding:0.5rem;
  font-size: 2rem;
`;

const MenuLogo = styled.img`
  /* cursor: pointer; */
`;

const Logout = styled.a`
  font-weight: bold;
  font-size: 1.25em;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    opacity: 0.7;
  }
`;

export { Wrapper, MenuListItem, MenuList, MenuLogo , WelcomeUser, Logout };
