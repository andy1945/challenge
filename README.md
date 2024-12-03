## Introduction

We do not want you to spend more than a couple of hours of your time on this challenge, so don't worry if you leave some tasks incomplete! In case it takes too long you can consider task 1 to be mandatory, task 2 optional and task 3 a bonus.

## Project Structure

- `/backend` - Backend code
- `/frontend` - Frontend code

To run the frontend and backend, use the following commands from the root folder:

- `npm run start:front` - Starts the frontend server
- `npm run start:back` - Starts the backend server

Both processes will automatically reload when code is modified.

### Frontend

Several components are pre-implemented to maintain styling consistency — feel free to use them. You may install additional packages if you find them necessary or beneficial (e.g., for state management, routing, etc.), but please keep dependencies reasonable.

### Backend

Only two backend endpoints are currently implemented:

- `GET /clients` - Returns the list of clients.
- `POST /auth` - Accepts basic auth credentials in the Authorization header and returns a JWT if the credentials are valid.

## Task 1: Authentication

- Implement a login screen. The authentication mechanism and endpoint are already set up on the backend, refer to the code for details. A few pre-registered users are available — see `/backend/data/users.json` for credentials.
- Ensure that the backend endpoint for retrieving clients is accessible only to logged-in users. The authentication endpoint returns a JWT that should be used for protecting other endpoints.
- Likewise, ensure that the frontend app (which currently consists only of the Clients screen) is accessible only to logged-in users.
- Cache the JWT token and automatically log in if it is still valid. Also, implement logout functionality.

## Task 2: UI & Data Access

- Add loading indicators to the frontend for API requests.
- Create an endpoint that returns aggregated revenue by country, and ensure it is accessible only to admin-level users.
- Create an admin page to display data from the above endpoint, again allowing access only to admin-level users. Include functionality to download this data in CSV format.
- Implement navigation between pages.

## Task 3: Improvements

- Congratulations on completing the challenge! Before we launch it to production, what improvements would you suggest? Feel free to add any features, optimizations, or best practices you believe would enhance the app's performance, security, or user experience. Please justify your choices bellow:

# Improvements

// TODO: Write your suggestions here 😁

# Suggestions

### Backend

- Make sure your API is served over HTTPS in production.
- Token Expiry: Right now, your token expires after 2 minutes this can inconvenience for users.
- Revoke Tokens: There's no mechanism in place for revoking JWT tokens, meaning once a token is issued, it remains valid until it expires. I would consider add a refresh token into the db and user experience better.
- jwtSecret we should use environment variables for the JWT secrets.
- To prevent brute-force attacks and limit the number of login attempts a user can make, we can implement rate-limiting and lockout mechanisms on the authentication endpoint.

### FrontEnd

- Error Handling in Frontend: In the frontend, there should be proper handling of failed authentication (e.g., redirecting to login when a 401 or 403 error is received) this has been done. But we need to handle errors in a better way.
- User Experience: We need to Handle errors gracefully, provide role-specific UI feedback, and ensure users know why they can't access certain features.
- To optimize API calls and improve frontend performance, we can implement batching, caching and pagination.
- I would also add more time on UI responsiveness use Flexbox or Material UI
