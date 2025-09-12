// components/KeycloakLoginButton.jsx
import React from 'react';

const KeycloakLoginButton = () => {
  const redirectToKeycloak = () => {
    const keycloakUrl = "http://localhost:8080/auth/realms/PolicyHub-Realm/protocol/openid-connect/auth";
    const clientId = "PolicyHub-Frontend";
    const redirectUri = "http://localhost:3000/callback";

    const authUrl = `${keycloakUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid`;
    window.location.href = authUrl;
  };

  return (
    <button onClick={redirectToKeycloak}>
      Login with Keycloak
    </button>
  );
};

export default KeycloakLoginButton;
