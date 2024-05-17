import { Box } from '@mui/material';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { DrawOption } from '../store/type';
import {FIGURE_LINE_WIDTH} from '../store/CONST';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { saveFigure, clearFigure,  allFigures, firgureSlice } from '../store/figureSlice';
import * as DOMPurify from 'dompurify';

const Canvas: React.FC<DrawOption>= ({drawOption}) => {

  const [startXY, setStartXY]        = useState({ x : 0, y : 0});
  const [endXY, setEndXY]            = useState({ x : 0, y : 0});
  const [isDrawing, setIsDrawing]    = useState(false);
  const [fitgureList, setFigureList] = useState<any>([]);

  const mouseRef     = useRef<HTMLDivElement>(null);
  
  const figureWith   = endXY.x - startXY.x;
  const figureHeight = endXY.y - startXY.y;
  
  const figureX = startXY.x - endXY.x < 0 ? startXY.x : endXY.x;
  const figureY = startXY.y - endXY.y < 0 ? startXY.y : endXY.y;
  
  const allFigures = useSelector((state: RootState) => state.figure.figureList);
  const dispatch = useDispatch();
  
  const stringToHTML = (element : string) => {
    let result = <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element)}} />;
    return result;
  }

  useEffect(()=> {
    setFigureList(allFigures.map((x)=> stringToHTML(x)));
  },[allFigures]);

  const mouseClickHandler: MouseEventHandler = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    
    switch(e.type){
      case 'mousedown' :   
        setStartXY({x,y});
        setEndXY({x,y});
        setIsDrawing(true);
      break;

      case 'mouseup' : 
      setIsDrawing(false);
      let figure = e.target as Element;
      dispatch(saveFigure(figure.outerHTML));
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
          {/* { stringToHTML(allFigures[0])} */}
            {fitgureList.map((figure: any,index: any)=>
            figure
            )}
          {/* {figureList.map((figure,index)=>
                stringToHTML(figure)
            )} */}
          </>
            <svg className='svgTest' 
            width={Math.abs(figureWith) + 10}
            height={Math.abs(figureHeight) + 10}
            style={{
              position:'absolute',
              top: figureY,
              left: figureX,

            }}>
              {drawOption==='circle'&&(
                <ellipse 
                cx={Math.abs(figureWith)/2} 
                cy={Math.abs(figureHeight)/2} 
                rx={Math.abs(figureWith/2)} 
                ry={Math.abs(figureHeight/2)} 
                stroke="black" 
                strokeWidth= {FIGURE_LINE_WIDTH} 
                fill="none" />
              )}
              {drawOption==='rec'&&(
                <rect x={0} y={0} width={Math.abs(figureWith)} height={Math.abs(figureHeight)}  stroke="black" strokeWidth={FIGURE_LINE_WIDTH} fill="none" />
              )}
            
            </svg>
          </Box>

      </Box>
    </>
  );
};

export default Canvas;
