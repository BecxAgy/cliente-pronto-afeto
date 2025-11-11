import React from 'react';
import ProposalFormComponent from '../components/proposal-form.component';
import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import StepProgressComponent from '../components/step-progress.component';

function ProposalRequestInterface() {
  return (
    <main>
      <Card>
        <CardContent className="">
          <ProposalFormComponent />
        </CardContent>
      </Card>
    </main>
  );
}

export default ProposalRequestInterface;
