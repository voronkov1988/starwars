import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/character';
import { getCharacters, getCharacter } from '../../services/swapi';

interface CharactersState {
  characters: Character[];
  currentCharacter: Character | null;
  loading: boolean;
  error: string | null;
  count: number;
  currentPage: number;
  searchTerm: string;
}

const initialState: CharactersState = {
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,
  count: 0,
  currentPage: 1,
  searchTerm: '',
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ page, search }: { page: number; search: string }) => {
    const response = await getCharacters(page, search);
    return response;
  }
);

export const fetchCharacter = createAsyncThunk(
  'characters/fetchCharacter',
  async (id: string) => {
    const response = await getCharacter(id);
    return response;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateCharacter: (state, action: PayloadAction<Partial<Character>>) => {
      if (state.currentCharacter) {
        state.currentCharacter = { ...state.currentCharacter, ...action.payload };
      }
    },
    clearCurrentCharacter: (state) => {
      state.currentCharacter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.results;
        state.count = action.payload.count;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch characters';
      })
      .addCase(fetchCharacter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCharacter = action.payload;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch character';
      });
  },
});

export const { setPage, setSearchTerm, updateCharacter, clearCurrentCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;