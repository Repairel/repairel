import styled, { css } from "styled-components";
import Link from "next/link";
import {  StyledLink } from "../../styles/global";
import Facebook from "../../public/facebook.svg";
import Instagram from "../../public/instagram.svg";
import Twitter from "../../public/twitter.svg";
import LinkedIn from "../../public/linkedin.svg";
import { FooterSection,FooterSplit,Headerfooter,Item,Row,Line} from "./Footer.style";


const Footer = () => {
  return (
    <Item style={{textAlign:"left", width:"100%"}}>
    <FooterSplit style={{marginTop: "50px"}}>
    <Row>
    <FooterSection>
    <Headerfooter style={{paddingLeft: "1rem",paddingRight: "3rem", fontSize:"14px", textAlign:"left"}}>INFORMATION</Headerfooter>
    </FooterSection>
    <FooterSection>
    </FooterSection>
    <FooterSection>
    <Headerfooter style={{paddingRight: "3rem", fontSize:"14px", textAlign:"left"}}>CONNECT WITH US</Headerfooter>
    </FooterSection>

    </Row>
<Row>
    <FooterSection style={{paddingLeft: "1rem",paddingRight: "4rem", textAlign:"left"}}>
    <Item>
            <StyledLink style={{ fontWeight: 400, fontSize:"12px", align:"left", textAlign: "left"}} href={`/about`}>About</StyledLink>
            </Item><Line></Line>
    <Item>
            <StyledLink style={{ fontWeight: 400, fontSize:"12px", align:"left", textAlign: "left"}} href={`/T&Cs`}>Terms and Conditions</StyledLink>
            </Item><Line></Line>
            <Item>
            <StyledLink style={{ fontWeight: 400, fontSize:"12px", align:"left", textAlign: "left"}} href={'/gdpr' }>GDPR</StyledLink>
            </Item>
    </FooterSection>
    <FooterSection>
    </FooterSection>
    <FooterSection style={{paddingRight: "4rem", textAlign:"left"}}>

        <Link href={"https://www.facebook.com/RepairelHub"}>

          <a target="_blank">
            <Item>
            <img style={{ height: "24px", paddingRight: "0.6rem" }} src={Facebook}></img>
            </Item>
          </a>

        </Link>

        <Link
          href={
            "https://www.instagram.com/repairelhub/?igshid=bersqmakpku6&hl=en"
          }
        >
          <a target="_blank">
            <img style={{ height: "24px", paddingRight: "0.6rem" }} src={Instagram}></img>
          </a>
        </Link>

        <Link href={"https://twitter.com/repairelhub?lang=en"}>
          <a target="_blank">
            <img style={{ height: "24px", paddingRight: "0.6rem" }} src={Twitter}></img>
          </a>
        </Link>
        <Link href={"https://www.linkedin.com/company/repairel-cic/"}>
          <a target="_blank">
            <img style={{ height: "24px", paddingRight: "0.6rem" }} src={LinkedIn}></img>
          </a>
        </Link>


    </FooterSection>
    </Row>
  </FooterSplit>
<Line></Line>
      <Headerfooter style={{paddingLeft: "1rem",paddingRight: "3rem", fontSize:"12px", textAlign:"left", fontWeight: 400}}>©2021 REPAIREL. All Rights Reserved</Headerfooter>
  <Line></Line>
    <Line></Line>
    <Line></Line>
      <Line></Line>
  </Item>
  );
};
export default Footer;
