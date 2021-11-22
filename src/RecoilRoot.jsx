import React from 'react';
import { RecoilRoot } from 'recoil';

export const rootContainer = (element) => {
  return (
    <RecoilRoot>
      <span style={{ display: 'none' }}>RecoilRoot</span>
      {element}
    </RecoilRoot>
  );
};
