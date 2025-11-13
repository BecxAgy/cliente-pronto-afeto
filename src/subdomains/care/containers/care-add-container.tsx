'use client';

import React from 'react';
import CareAddInterface from '../interfaces/care-add-interface';
import { CareFormProvider } from '../contexts/care-form.context';
import { useCareForm } from '../hooks/use-care-form';

function CareAddContainer() {
  const form = useCareForm();

  return (
    <CareFormProvider form={form}>
      <CareAddInterface />
    </CareFormProvider>
  );
}

export default CareAddContainer;
