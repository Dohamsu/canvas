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
  const [isMoving, setIsMoving]       = useState(false);
  const [figureList, setFigureList]   = useState<ReactElement[]>([]);
  const [movingFigure, setMovingFigure]   = useState<HTMLElement|null>();
  const allFigures = useSelector((state: RootState) => state.figure.figureList);
  const dispatch = useDispatch();

  const mouseRef         = useRef<HTMLDivElement>(null);
  const movingRef        = useRef<{x:any,y:any, width:any}>({x:0,y:0,width:0});
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
  },[allFigures]);

  //init
  useEffect(()=> {
    dispatch(initFigure());
  },[]);
  
  // 도형으로 인식할 최소 조건 확인
  const testIsFigure = ()=>{
    if(Math.abs(figureHeight) < FIGURE_MINIMUM_SIZE || Math.abs(figureWith) < FIGURE_MINIMUM_SIZE){
      return false;
    }else{
      return true;
    }
  }

  const mouseClickHandler: MouseEventHandler = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    
    console.log(e.type);
    switch(e.type){

      case 'contextmenu' : 
      e.preventDefault();

       console.log('dd');
       return null;
      break;
      case 'mousedown' :

        let targetElem = e.target as HTMLElement;
        setStartXY({x,y});
        setEndXY({x,y});
        if(targetElem.tagName === 'svg'){
          setMovingFigure(targetElem);
          movingRef.current.x = Number(window.getComputedStyle(targetElem).left.replace('px',''));
          movingRef.current.y = Number(window.getComputedStyle(targetElem).top.replace('px',''));
        }else{
          setIsDrawing(true);
        }
      break;

      case 'mouseup' : 
      if(isDrawing){
        setIsDrawing(false);
        if(testIsFigure()){
            let figure = figureRef.current as Element;
            dispatch(saveFigure(figure.outerHTML));
        }
      }else if(movingFigure){
        let figure = movingFigure as Element;
        console.log(movingRef.current);
        // dispatch(saveFigure(figure.outerHTML));
        setMovingFigure(null);
      }

      break;
      case 'mousemove' : 
        if(isDrawing){
          setEndXY({x,y});
        }else if(movingFigure){
          movingFigure.style.top=((movingRef.current.y + (e.clientY - startXY.y) )).toString();
          movingFigure.style.left=((movingRef.current.x + (e.clientX - startXY.x) )).toString();
        }
      break;
      case 'mouseleave' : 
      setIsDrawing(false);
      if(movingFigure){
        movingFigure.style.top=((movingRef.current.y )).toString();
        movingFigure.style.left=((movingRef.current.x)).toString();
      }
      setMovingFigure(null);   
    break;
      default: ;
    }
  }

  const mouseRightClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    console.log("dd");
    // alert('채팅방을 정말 삭제하시겠어요?')
  }
  return (
    <>
      <Box
        width={'80%'} 
        height={'90vh'}
        textAlign='center' 
        margin={'auto'}
      >
        <Box 
          className='svgBox'
          ref={mouseRef}
          onMouseDown={mouseClickHandler}
          onMouseMove={mouseClickHandler}
          onContextMenu={mouseClickHandler}
          onMouseLeave={mouseClickHandler}
          onMouseUp={mouseClickHandler}
          width={'80%'} 
          height={800} 
          border='1px solid'
          sx={{
          cursor:'crosshair',
          zIndex:'9999'
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
            cursor:'move'
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
