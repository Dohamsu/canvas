import React, { useState } from 'react';
import { Typography, Link } from '@mui/material';
import Canvas from '../components/Canvas';
import DrawMenu from '../components/DrawMenu';

const Home: React.FC = () => {

    const [drawOption, setDrawOption] = useState<string>('circle');

  return (
    <div>
        <DrawMenu drawOption={drawOption} setDrawOption={setDrawOption}/>
        <Canvas drawOption={drawOption} setDrawOption={setDrawOption}/>
    </div>
  );
};

export default Home;
