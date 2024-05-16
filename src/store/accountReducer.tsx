import { REGISTER, LOGIN, LOGOUT } from './actions';

// Define interfaces for action payloads
interface UserPayload {
  user: any; // Define the type of user accordingly
}

// Define action types
type AuthAction =
  | { type: typeof REGISTER; payload: UserPayload }
  | { type: typeof LOGIN; payload: UserPayload }
  | { type: typeof LOGOUT };

// Define initial state interface
interface AuthState {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: any | null; // Define the type of user accordingly
}

// Initial state
export const initialState: AuthState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
