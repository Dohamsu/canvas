import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import { OptionPopupProps } from '../store/type';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { editFigure } from '../store/figureSlice';

const emails = ['앞으로', '맨 앞으로', '뒤로', '맨 뒤로'];

export default function OptionPopup(props: OptionPopupProps) {
    const { onClose, open, figure} = props;
    const firgureZindexArray = useRef<number[]>([]); // 전체도형의 z-index Array
    const allFigures = useSelector((state: RootState) => state.figure.figureList);
    const dispatch = useDispatch();

    useEffect(()=> {
        allFigures.map((elem,i)=> 
        {
            let figureZindexs = elem.match(/z-index:[0-9\s]*[;]/g);
            if(figureZindexs){
            let elemZindex = figureZindexs[0].replace(';','').replace('z-index: ','');
            firgureZindexArray.current.push(Number(elemZindex));      
            }          
        });
        firgureZindexArray.current.sort((a, b) => a - b);
    },[]);

  const handleListItemClick = (value: string) => {
    onClose(value);
    if(figure){
        let targetZindex   = Number(figure.style.zIndex);
        let reviseIndex    = 0; // 수정 배열 index
        let reviseAmount   = 0; //z-index  수정치
        let targetIndex    = firgureZindexArray.current.indexOf(targetZindex);

        switch(value){
            case '앞으로':  ; 
                reviseAmount = 1; 
                reviseIndex  = targetIndex + 1;
                break;
            case '맨 앞으로': 
                reviseAmount = 1;
                reviseIndex  = firgureZindexArray.current.length -1;

                break;     
            case '뒤로':  
                reviseAmount = -1;
                reviseIndex  = targetIndex - 1;
                break;    
            case '맨 뒤로':  
                reviseAmount = -1;
                reviseIndex  = 0;
                break;    
        }

        figure.style.zIndex = (firgureZindexArray.current[reviseIndex]+reviseAmount).toString();
        let reviseFigure = figure as Element;
        let figureClass= reviseFigure.classList[0];
        dispatch(editFigure(reviseFigure.outerHTML +"class:"+ figureClass));
    }
};
  return (
    <Dialog open={open}>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>

              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>      
        </ListItem>
      </List>
    </Dialog>
  );
}