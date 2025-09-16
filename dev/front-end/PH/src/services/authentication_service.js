// src/services/authService.js

// This function sends the Keycloak authorization code to your backend
export async function sendAuthCodeToBackend(code) {
  try {
    const response = await fetch('YOUR_BACKEND_URL/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received tokens from backend:', data);
    
    // The tokens are returned here
    return data;

  } catch (error) {
    console.error('Error sending code to backend:', error);
    // Re-throw the error so the component can catch it
    throw error;
  }
}