import React from 'react';
import { CareEditContainer } from './care-edit.container';

export const CareEditWrapperContainer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <CareEditContainer params={{ id }} />;
};
