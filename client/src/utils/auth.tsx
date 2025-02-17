// Decode JWT token interface
interface DecodedToken {
    exp: number;
    data: {
      username: string;
      email: string;
      _id: string;
    };
  }
  
  // Token expiration checker
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };
  
  class Auth {
    // Get token from localStorage
    getToken(): string | null {
      return localStorage.getItem('id_token');
    }
  
    // Get user profile from token
    getProfile(): DecodedToken | null {
      const token = this.getToken();
      if (!token) return null;
      
      try {
        return JSON.parse(atob(token.split('.')[1])) as DecodedToken;
      } catch (err) {
        return null;
      }
    }
  
    // Check if user is logged in
    loggedIn(): boolean {
      const token = this.getToken();
      return !!token && !isTokenExpired(token);
    }
  
    // Login user - store token in localStorage
    login(idToken: string): void {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    }
  
    // Logout user - remove token and reload page to reset application state
    logout(): void {
      localStorage.removeItem('id_token');
      window.location.assign('/');
    }
  }
  
  export default new Auth();