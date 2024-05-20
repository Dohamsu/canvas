import { Box } from '@mui/material';
import React, { MouseEventHandler, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { DrawOption } from '../store/type';
import {FIGURE_LINE_WIDTH, FIGURE_MINIMUM_SIZE} from '../store/CONST';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { saveFigure, initFigure } from '../store/figureSlice';
import * as DOMPurify from 'dompurify';
import SideBar from './SideBar';

const Canvas: React.FC<DrawOption>= ({drawOption}) => {

  const [startXY, setStartXY]         = useState({ x : 0, y : 0});
  const [endXY, setEndXY]             = useState({ x : 0, y : 0});
  const [isDrawing, setIsDrawing]     = useState(false);
  const [figureList, setFigureList]   = useState<ReactElement[]>([]);
  const allFigures = useSelector((state: RootState) => state.figure.figureList);
  const dispatch = useDispatch();

  const mouseRef         = useRef<HTMLDivElement>(null);
  const figureRef        = useRef<(SVGSVGElement | null)>(null);
  const figureListRef    = useRef<(HTMLDivElement | null)[]>([]);
  const figureButtonRef  = useRef<(HTMLDivElement | null)[]>([]);
  
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
    setFigureList(allFigures.map((x)=> stringToHTML(x)
    ));
  
    if(figureList.length<1){
      figureListRef.current = [];
    }
    console.log(figureListRef.current[0]?.querySelector('svg'));
  },[allFigures]);

    //init
    useEffect(()=> {
      dispatch(initFigure(''));
    },[]);
  

  const testIsFigure = ()=>{
    if(Math.abs(figureHeight) < FIGURE_MINIMUM_SIZE && Math.abs(figureWith) < FIGURE_MINIMUM_SIZE){
      return false;
    }else{
      return true;
    }
  }

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
        if(testIsFigure()){
 
          let figure = figureRef.current as Element;
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
          {figureList.map((figure: any,index: number)=>
          <div 
            key={index}
            ref={(ref)=> 
              figureListRef.current[index]= ref}
              >
            {figure}
          </div>

          )}
        </>
          <svg className='svgElem' 
          width={Math.abs(figureWith) }
          height={Math.abs(figureHeight)}
          ref={figureRef}
          style={{
            position:'absolute',
            top: figureY,
            left: figureX,
            display: isDrawing===true?  'block': 'none',
          }}>
            {drawOption==='circle'&&(
              <ellipse 
                cx={Math.abs(figureWith)/2 } 
                cy={Math.abs(figureHeight)/2} 
                rx={Math.abs(figureWith/2) > 1 ? Math.abs(figureWith/2) - FIGURE_LINE_WIDTH : Math.abs(figureWith/2)} 
                ry={Math.abs(figureHeight/2) > 1 ? Math.abs(figureHeight/2) - FIGURE_LINE_WIDTH : Math.abs(figureHeight/2)} 
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
        <SideBar 
          figureList={figureList}
          figureListRef={figureListRef}
          figureButtonRef={figureButtonRef}
        />
      </Box>
    </>
  );
};

export default Canvas;
