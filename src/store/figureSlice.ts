import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';


interface FigureState {
  figureList: string[];
}

const initialState: FigureState = {
  figureList: [],
};

export const firgureSlice = createSlice({
  name: 'figure',
  initialState,
  reducers: {
    saveFigure: (state,action) => {
      state.figureList.push(action.payload);
    },
  },
});

export const { saveFigure } = firgureSlice.actions;
export const allFigures = (state: RootState) => state.figure.figureList;
export default firgureSlice.reducer;
