import styled from 'styled-components';

const Wrapper = styled.nav`
  display: flex;
  text-align:center;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.dark};
  padding: 1rem;
`;

export default Wrapper;
