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
    initFigure: (state) => {
      let savedFigures = localStorage.getItem('test');
      if(savedFigures){
        let elem = savedFigures.split('drawing');
        elem.map((x)=>
          //저장된 테두리 삭제 
          state.figureList.push(x.replaceAll(/border:[a-zA-Z0-9\s]*[;]/g ,''))
        )
      }
    },
    saveFigure: (state,action) => {
      state.figureList.push(action.payload);
      localStorage.setItem('test',(state.figureList.join('drawing')));
    },
    //이동한 도형 저장
    editFigure: (state, action) => {
      let newData = action.payload.split('class:')[0];
      let newDataClass   = action.payload.split('class:')[1];
      console.log( action.payload);
      state.figureList.map((elem,i)=> 
        {
          let svgClass = elem.match(/class="[0-9]*["]/g);
          if(svgClass){
            let savedClass = svgClass[0].replaceAll('"','').replace('class=','');
            if(savedClass == newDataClass){
              state.figureList[i]= newData;
            }
          }          
        }      
      );
      localStorage.setItem('test',(state.figureList.join('drawing')));
    },
    //도형 선택 삭제
    deleteFigure: (state, action) => {
      console.log(action.payload);
      state.figureList= state.figureList.filter((v, i) => action.payload.indexOf(i)<0 );
      localStorage.setItem('test',(state.figureList.join('drawing')));
    },
    //도형 전체 삭제
    clearFigure: (state,action) => {
      state.figureList=[];
      localStorage.setItem('test','');

    },
  },
});

export const { initFigure, saveFigure, editFigure, deleteFigure, clearFigure } = firgureSlice.actions;
export const allFigures = (state: RootState) => state.figure.figureList;
export default firgureSlice.reducer;
