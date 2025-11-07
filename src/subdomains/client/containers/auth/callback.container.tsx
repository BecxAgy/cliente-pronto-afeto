import React from 'react';
import { CallbackInterface } from '../../interfaces/auth/callback.interface';

export const CallbackContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  return <CallbackInterface searchParams={params} />;
};
