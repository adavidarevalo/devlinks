import React, { createContext, useReducer, ReactNode, useContext } from 'react';

interface Link {
  platform: string;
  link: string;
}

interface LinksState {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: File;
  links: Link[];
}

type LinksAction =
  | { type: 'SET_LINKS'; payload: LinksState }
  | { type: 'ADD_LINK'; payload: Link }
  | { type: 'REMOVE_LINK'; payload: number }
  | { type: 'UPDATE_LINK'; payload: { index: number; link: Link } };

const initialState: LinksState = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  avatar: undefined,
  links: [],
};

const LinksContext = createContext<{
  state: LinksState;
  dispatch: React.Dispatch<LinksAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const linksReducer = (state: LinksState, action: LinksAction): LinksState => {
  switch (action.type) {
    case 'SET_LINKS':
      return { ...state, ...action.payload };
    case 'ADD_LINK':
      return { ...state, links: [...state.links, action.payload] };
    case 'REMOVE_LINK':
      return { ...state, links: state.links.filter((_, index) => index !== action.payload) };
    case 'UPDATE_LINK':
      return {
        ...state,
        links: state.links.map((link, index) =>
          index === action.payload.index ? action.payload.link : link
        ),
      };
    default:
      return state;
  }
};

export const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(linksReducer, initialState);

  return (
    <LinksContext.Provider value={{ state, dispatch }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => useContext(LinksContext);
