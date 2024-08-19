// src/components/CookieConsentBanner.js
import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => {
  const handleAccept = () => {

    document.cookie = `login_token=your_token_value; domain=odeaura-api.vercel.app; SameSite=None; Secure; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  };

  return (
    <CookieConsent
      buttonText="Understand"
      onAccept={handleAccept}
      cookieName="cookie-consent"
      expires={365}
      enableDeclineButton
      declineButtonText="Decline"
      onDecline={() => console.log('Cookies declined')}
    >
      This website uses cookies to enhance the user experience. By clicking "Understand", you consent to the use of cookies.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
