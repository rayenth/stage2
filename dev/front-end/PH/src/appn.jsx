import { AuthContext } from "react-oauth2-code-pkce";
import { useContext } from "react";

export default function AppName() {
    const { token, tokenData, isAuthenticated, logIn, logOut } = useContext(AuthContext);

    return (
        <div>
            <h1>My Application</h1>
            {isAuthenticated ? (
                // When authenticated, show the user's name and a Log out button.
                <div>
                    <p>Welcome, {tokenData?.preferred_username}</p>
                    <button onClick={() => logOut()}>Log out</button>
                </div>
            ) : (
                // When NOT authenticated, show a Log in button.
                <div>
                    <button onClick={() => logIn()}>Log in</button>
                </div>
            )}
        </div>
    );
}