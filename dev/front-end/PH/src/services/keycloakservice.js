// src/services/keycloakService.js
const keycloakUrl = "http://localhost:8080/realms/PolicyHub-Realm/protocol/openid-connect";
const clientId = "PolicyHub-Frontend";
const redirectUri = "http://localhost:5173/callback"; // must match Keycloak config

export const login = () => {
  window.location.href = `${keycloakUrl}/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;
};

export const exchangeCodeForToken = async (code) => {
  const res = await fetch("http://localhost:8080/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  return res.json();
};
