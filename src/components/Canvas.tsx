import { Box } from '@mui/material';
import React, { MouseEventHandler, useRef, useState } from 'react';
import { DrawOption } from '../store/type';

const Canvas: React.FC<DrawOption>= ({drawOption}) => {

  const [startXY, setStartXY] = useState({ x : 0, y : 0});
  const [endXY, setEndXY] = useState({ x : 0, y : 0});
  const [isDrawing, setIsDrawing] = useState(false);
  const mouseRef     = useRef<HTMLDivElement>(null)
  
  const figureWith   = endXY.x - startXY.x;
  const figureHeight = endXY.y - startXY.y;
  
  const figureX = startXY.x - endXY.x < 0 ? startXY.x : endXY.x;
  const figureY = startXY.y - endXY.y < 0 ? startXY.y : endXY.y;
  
  const mouseClickHandler: MouseEventHandler = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    
    switch(e.type){
      case 'mousedown' :   
      console.log(x);
        setStartXY({x,y});
        setEndXY({x,y});
        setIsDrawing(true);
      console.log(startXY);
      break;

      case 'mouseup' : 
      setIsDrawing(false);

      // console.log(endXY);
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
          

          <svg className='svgTest' 
          width={Math.abs(figureWith)}
          height={Math.abs(figureHeight)}
          style={{
            position:'absolute',
            top: figureY,
            left: figureX,

          }}>
            {drawOption=='circle'&&(
              <ellipse cx={figureWith/2} cy={figureHeight/2} rx={Math.abs(figureWith/2)} ry={Math.abs(figureHeight/2)} stroke="black" strokeWidth="1" fill="white" />
            )}
            {drawOption=='rec'&&(
              <rect x={0} y={0} width={Math.abs(figureWith)} height={Math.abs(figureHeight)}  stroke="black" strokeWidth="3" fill="red" />
            )}
          
          </svg>




          </Box>

      </Box>
    </>
  );
};

export default Canvas;
