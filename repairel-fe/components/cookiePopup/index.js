import CookieConsent from "react-cookie-consent";

const CookiePopup = () => {
    return (
        <CookieConsent style = {{ background: "black"}} buttonStyle = {{ background: "white", color: "black", fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", width: "12rem", height: "2rem", letterSpacing: 1, padding: "0em 3em" }} buttonText = "I UNDERSTAND">
            REPAIREL uses cookies to improve user experience.{" "}<a href = {`/gdpr`} style = {{color: "white"}}>Find out more about our privacy policy.</a>
        </CookieConsent>
    );
};

export default CookiePopup;

