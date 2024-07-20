import React from 'react';
import { useTranslation } from "react-i18next";
import { useAuth } from '../../hooks/useAuth';

function UserProfile() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className='container-sm'>
      <h2>{t('pages.userProfile.title')}</h2>
      <p>UID: {user.uid}</p>
      <p>Email: {user.email}</p>
      <p>Display Name: {user.displayName || 'Not set'}</p>
    </div>
  );
}

export default UserProfile;