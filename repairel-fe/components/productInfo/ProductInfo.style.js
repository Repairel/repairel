import styled from 'styled-components';

const ProductInfoList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const ProductInfoListItem = styled.li`
  list-style: none;
  padding: 0.1rem;
  font-size: 1.2rem;
`;
const ProductPrice = styled.p`
  margin: 0;
`;
const Rating = styled.span`
  min-height: 40px;
  min-width: 40px;
  cursor: default;
  border-radius: 50%;
  color: ${({ rating, theme }) =>
    rating < 60
      ? theme.colors.bad
      : rating >= 60 && rating < 80
      ? theme.colors.medium
      : theme.colors.good};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.3rem;
`;

export { ProductInfoList, ProductInfoListItem, Rating, ProductPrice };
