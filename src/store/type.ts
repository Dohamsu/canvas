import { ReactElement } from "react";

export interface DrawOption  {
    drawOption : string,
    setDrawOption : React.Dispatch<React.SetStateAction<string>>;
};
  

export interface SideBarProps  {
    figureList : ReactElement[],
    figureListRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
    figureButtonRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
};
  