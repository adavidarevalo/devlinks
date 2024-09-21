import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Link {
  platform: string;
  link: string;
}

interface LinksState {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: File;
  links?: Link[];
}

const initialState: LinksState = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  avatar: undefined,
  links: [],
};

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<LinksState>) => {
      return { ...state, ...action.payload };
    },
    addLink: (state, action: PayloadAction<Link>) => {
      state.links?.push(action.payload);
    },
    removeLink: (state, action: PayloadAction<number>) => {
      state.links = state.links?.filter((_, index) => index !== action.payload);
    },
    updateLink: (state, action: PayloadAction<{ index: number; link: Link }>) => {
      if (state.links && state.links[action.payload.index]) {
        state.links[action.payload.index] = action.payload.link;
      }
    },
  },
});

export const { setLinks, addLink, removeLink, updateLink } = linksSlice.actions;

export default linksSlice.reducer;
