import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import React from 'react';
import { Care } from '../types';

function CareCircleInfoComponent(care: Care) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <div className="w-14 h-14 rounded-full bg-primary/40"></div>
          <p>{care.nomeApresentacao}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{care.nome}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default CareCircleInfoComponent;
