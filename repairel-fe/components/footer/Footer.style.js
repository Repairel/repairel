import styled, { css } from "styled-components";



const Line= styled.br`
`;

const FooterSection = styled.th`
&:hover {
  text-decoration: underline;
  opacity: 0.7;
}
`;

const FooterSplit = styled.table`
`;
const Row = styled.tr`
`;
const Headerfooter = styled.div`
paddingLeft: 1rem;
paddingRight: 3rem;
fontSize:14px;
textAlign:left;


`;

const Item = styled.span`
height:50%;
padding:35px 35px !important;

`

export { FooterSection,FooterSplit,Headerfooter,Item,Row,Line};
