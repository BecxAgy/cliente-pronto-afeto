import React from 'react';
import ProfileHeader from '../components/profile-header.component';
import ProfileContent from '../components/profile-content.component';
import { getClientData } from '../actions';

export const ProfileInterface = async () => {
  const profile = await getClientData();

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <ProfileHeader profile={profile} />
      <ProfileContent profile={profile} />
    </div>
  );
};
