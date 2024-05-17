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
    clearFigure: (state,action) => {
      state.figureList=[];
      console.log(state.figureList);
    },
  },
});

export const { saveFigure, clearFigure } = firgureSlice.actions;
export const allFigures = (state: RootState) => state.figure.figureList;
export default firgureSlice.reducer;
