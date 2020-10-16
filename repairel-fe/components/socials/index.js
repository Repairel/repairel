import Link from "next/link";

import Facebook from "../../public/facebook.svg";
import Instagram from "../../public/instagram.svg";
import Twitter from "../../public/twitter.svg";

import { SocialsList, SocialsListItem } from "./Socials.style";

const Socials = () => {
  return (
    <SocialsList>
      <SocialsListItem>
        <Link href={"https://www.facebook.com/RepairelHub"}>
          <a target="_blank">
            <img src={Facebook}></img>
          </a>
        </Link>
      </SocialsListItem>
      <SocialsListItem>
        <Link
          href={
            "https://www.instagram.com/repairelhub/?igshid=bersqmakpku6&hl=en"
          }
        >
          <a target="_blank">
            <img src={Instagram}></img>
          </a>
        </Link>
      </SocialsListItem>
      <SocialsListItem>
        <Link href={"https://twitter.com/repairelhub?lang=en"}>
          <a target="_blank">
            <img src={Twitter}></img>
          </a>
        </Link>
      </SocialsListItem>
    </SocialsList>
  );
};
export default Socials;
