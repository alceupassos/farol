import React from 'react';
import aphPagesConfig from '@/modules/aph/data';
import { AphPageKey } from '@/modules/aph/types';
import AphPageRenderer from './AphPageRenderer';

export const createAphPage = (pageKey: AphPageKey) => {
  const AphPage: React.FC = () => <AphPageRenderer config={aphPagesConfig[pageKey]} />;
  AphPage.displayName = `AphPage_${pageKey}`;
  return AphPage;
};

export type CreateAphPage = ReturnType<typeof createAphPage>;
