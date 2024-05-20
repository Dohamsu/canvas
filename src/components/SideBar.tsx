import { Box, Button, Checkbox } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { SideBarProps } from '../store/type';
import { eidtFigure } from '../store/figureSlice';
import { useDispatch } from 'react-redux';

const SideBar: React.FC<SideBarProps>= ({figureList, figureButtonRef, figureListRef}) => {
    const [isChecked, setIsChecked]     = useState(false);
    const [checkedList, setCheckedList] = useState<number[]>([]);
    const dispatch = useDispatch();

    const checkedItemHandler = (value: number, isChecked: boolean) => {
        let targetSVG = figureListRef.current[value]?.querySelector('svg');
        
        if (isChecked) {
          setCheckedList((prev) => [...prev, value]);
          if(targetSVG){
            targetSVG.style.border='dotted  blue';
          }
          return;
        }
        if (!isChecked && checkedList.includes(value)) {
          setCheckedList(checkedList.filter((item) => item !== value));
          if(targetSVG){
            targetSVG.style.border='black';
          }
          return;
        }
        return;
      };
    
    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
    };

  const deleteSelects = ()=>{

    
    dispatch(eidtFigure(checkedList));
    setCheckedList([]);
    console.log(checkedList);
  }

return (
    <>
        <Box
            sx={{
            position:'absolute',
            top:'105px',
            right:'25px',
            height:'500px',
            width:'120px',
            overflow:'scroll',
            border:'1px solid black'
            }}      
        >
        <Button
            onClick={deleteSelects}
        >
            선택 삭제
        </Button>
        <div>
            {figureList.map((figure: any,index: number)=>
                <div 
                    key={index}
                    ref={(ref)=> 
                    figureButtonRef.current[index]= ref}
                    >
                    <Checkbox
                    checked={checkedList.includes(index)}
                    onChange={(e) => checkHandler(e, index)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <label>  layer {index}</label>
                </div>
            )}
        </div>
        </Box>
    </>
)
};

export default SideBar;
