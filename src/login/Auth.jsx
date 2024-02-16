import { useNavigate } from 'react-router-dom';

const Auth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    // Check for login status here, e.g., by accessing local storage or global state
    const isLoggedIn = localStorage.getItem('loginData') || localStorage.getItem('loginData') !== null;

    if (!isLoggedIn) {
      // If the user is not logged in, redirect to the login page
      navigate('/login');
      return null; // Optionally, you can return a loading indicator or other UI while redirecting
    }

    // If the user is logged in, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default Auth;