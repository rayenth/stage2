// This file will cause your app to redirect to Keycloak automatically on page load.
export const authConfig = {
    clientId:'PolicyHub-Backend', 
    authorizationEndpoint:'http://localhost:8080/realms/PolicyHub-Realm/protocol/openid-connect/auth',
    tokenEndpoint:'http://localhost:8080/realms/PolicyHub-Realm/protocol/openid-connect/token',
    redirectUri:'http://localhost:5173/', // Change this to your actual redirect URI
    scope:'openid profile email offline_access',
    onRefreshTokenExpire :(event) => {event.logIn()},
    // skipOpenidConnect is not included here
};