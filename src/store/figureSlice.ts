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
    initFigure: (state,action) => {
      let savedFigures = localStorage.getItem('test');
      if(savedFigures){
        let elem = savedFigures.split('drawing');
        elem.map((x)=> 
        // console.log(x)
          state.figureList.push(x)
        )
      }
    },
    saveFigure: (state,action) => {
      state.figureList.push(action.payload);
      localStorage.setItem('test',(state.figureList.join('drawing')));
    },
    clearFigure: (state,action) => {
      state.figureList=[];
      localStorage.setItem('test','');

    },
  },
});

export const { initFigure, saveFigure, clearFigure } = firgureSlice.actions;
export const allFigures = (state: RootState) => state.figure.figureList;
export default firgureSlice.reducer;
