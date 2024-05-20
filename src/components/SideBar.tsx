import { Box, Button, Checkbox } from '@mui/material';
import React from 'react';
import { SideBarProps } from '../store/type';

const SideBar: React.FC<SideBarProps>= ({figureList, figureButtonRef, checkedList, checkHandler}) => {

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
        <Button>일괄 삭제</Button>
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
