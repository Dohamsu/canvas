import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { DrawOption } from '../store/type';
import {OPTION_LIST} from '../store/CONST';
import { saveFigure, clearFigure,  allFigures, firgureSlice } from '../store/figureSlice';
import { useDispatch } from 'react-redux';

const DrawMenu: React.FC<DrawOption> = ({ drawOption, setDrawOption }) => {
  const dispatch = useDispatch();

const handleOptionClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    let option = e.currentTarget.getAttribute('data-option');
    if(option){
        setDrawOption(option);
    }
  }, []);

  const handleClearBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(clearFigure(''));
  };

  return (
    <>
    <Box className="drawOptionBox">
      { OPTION_LIST.map((option,index)=>(
        <Button
          key={index}
          onClick={handleOptionClick}
          data-option={option.value}
        > {option.name} </Button>
      ))}
      <Button onClick={handleClearBtn}>
        지우기
      </Button>
    </Box>
    </>
  );
};

export default DrawMenu;
