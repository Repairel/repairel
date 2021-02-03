import CookieConsent from "react-cookie-consent";

const CookiePopup = () => {
    return (
        <CookieConsent style = {{ background: "black"}} buttonStyle = {{ background: "white"}}>
            Repairel uses cookies to improve user experience.{" "}<a href = {`/gdpr`} style = {{color: "white"}}>Find out more about our privacy policy.</a>
        </CookieConsent>
    );
};

export default CookiePopup;

