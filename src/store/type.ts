import { ReactElement } from "react";

export interface DrawOption  {
    drawOption : string,
    setDrawOption : React.Dispatch<React.SetStateAction<string>>;
};
  

export interface SideBarProps  {
    figureList : ReactElement[],
    figureButtonRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
    checkedList: number[],
    checkHandler: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void;
};
  