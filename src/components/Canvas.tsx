import { Box } from '@mui/material';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { DrawOption } from '../store/type';
import {FIGURE_LINE_WIDTH, FIGURE_MINIMUM_SIZE} from '../store/CONST';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { saveFigure, clearFigure,  allFigures, firgureSlice } from '../store/figureSlice';
import * as DOMPurify from 'dompurify';

const Canvas: React.FC<DrawOption>= ({drawOption}) => {

  const [startXY, setStartXY]        = useState({ x : 0, y : 0});
  const [endXY, setEndXY]            = useState({ x : 0, y : 0});
  const [isDrawing, setIsDrawing]    = useState(false);
  const [fitgureList, setFigureList] = useState<any>([]);
  const allFigures = useSelector((state: RootState) => state.figure.figureList);
  const dispatch = useDispatch();

  const mouseRef     = useRef<HTMLDivElement>(null);
  const firgureRef   = useRef<HTMLDivElement[]>([]);
  
  const figureWith   = endXY.x - startXY.x;
  const figureHeight = endXY.y - startXY.y;
  
  const figureX = startXY.x - endXY.x < 0 ? startXY.x : endXY.x;
  const figureY = startXY.y - endXY.y < 0 ? startXY.y : endXY.y;
  
  
  const stringToHTML = (element : string) => {
    let result = <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element)}} />;
    return result;
  }

  //전체 도형 추적
  useEffect(()=> {
    setFigureList(allFigures.map((x)=> stringToHTML(x)));
  },[allFigures]);


  const testIsFigure = ()=>{
    console.log( 'test');
    console.log(figureHeight , figureWith);
    if(Math.abs(figureHeight) < FIGURE_MINIMUM_SIZE && Math.abs(figureWith) < FIGURE_MINIMUM_SIZE){
      return false;
    }else{
      return true;
    }
  }

  const mouseClickHandler: MouseEventHandler = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    const svgLength = mouseRef.current?.getElementsByClassName('svgTest').length || 0;
    const targetSvg = mouseRef.current?.getElementsByClassName('svgTest')[svgLength-1];

    switch(e.type){
      case 'mousedown' :   
        setStartXY({x,y});
        setEndXY({x,y});
        setIsDrawing(true);
      break;

      case 'mouseup' : 
        setIsDrawing(false);
        if(testIsFigure()){
          let figure = targetSvg as Element;
          dispatch(saveFigure(figure.outerHTML));
        }
      break;

      case 'mousemove' : 
        if(isDrawing){
          setEndXY({x,y});
        }
      break;
      default: ;
    }
  }


  return (
    <>
      <Box
      width={'100%'} 
      height={'50vh'}
      textAlign='center' 
      >
          <Box 
          className='svgBox'
          ref={mouseRef}
          onMouseDown={mouseClickHandler}
          onMouseMove={mouseClickHandler}
          onMouseUp={mouseClickHandler}
          width={'100%'} 
          height={800} 
          border='1px solid'
          sx={{
          cursor:'pointer'
          }}
          >
          <>
            {fitgureList.map((figure: any,index: any)=>
            <div key={index}>
              {figure}
            </div>

            )}
          </>
            <svg className='svgTest' 
            width={Math.abs(figureWith) }
            height={Math.abs(figureHeight)}
            style={{
              position:'absolute',
              top: figureY,
              left: figureX,
              display: isDrawing===true?  'block': 'none',
            }}>
              {drawOption==='circle'&&(
                <ellipse 
                  cx={Math.abs(figureWith)/2} 
                  cy={Math.abs(figureHeight)/2} 
                  rx={Math.abs(figureWith/2) - FIGURE_LINE_WIDTH} 
                  ry={Math.abs(figureHeight/2) - FIGURE_LINE_WIDTH} 
                  stroke="black" 
                  strokeWidth= {FIGURE_LINE_WIDTH} 
                  fill="none" 
                />
              )}
              {drawOption==='rec'&&(
                <rect x={0} y={0} width={Math.abs(figureWith)} height={Math.abs(figureHeight)}  stroke="black" strokeWidth={FIGURE_LINE_WIDTH +1} fill="none" />
              )}
            
            </svg>
          </Box>

      </Box>
    </>
  );
};

export default Canvas;
