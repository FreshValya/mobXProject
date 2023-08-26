import {useState} from 'react';

import Eye from '@assets/Eye.svg';
import EyeClosed from '@assets/EyeClosed.svg';

interface WatchedButtonProps {
  isWatched: boolean;
  onClick: VoidFunction;
  className: string;
}

export const WatchedButton = ({isWatched, onClick, className}: WatchedButtonProps) => {
  return (
    <div onClick={onClick} className={className}>
      {isWatched ? <Eye /> : <EyeClosed />}
    </div>
  );
};
