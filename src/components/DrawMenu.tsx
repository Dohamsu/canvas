import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { DrawOption } from '../store/type';
import {OPTION_LIST} from '../store/CONST';

const DrawMenu: React.FC<DrawOption> = ({ drawOption, setDrawOption }) => {

const handleOptionClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    let option = e.currentTarget.getAttribute('data-option');
    if(option){
        setDrawOption(option);
    }
  }, []);

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
    </Box>
    </>
  );
};

export default DrawMenu;
