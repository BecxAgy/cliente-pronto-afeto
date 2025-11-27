import { getAllPatologies } from '@/src/shared/modules/actions/patology.actions';
import ProposalFormComponent from '../components/proposal-form.component';
import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import { getAllDispositives } from '@/src/shared/modules/actions/dispositive.actions';

async function ProposalRequestInterface() {
  const patologies = await getAllPatologies();
  const dispositives = await getAllDispositives();

  return (
    <main className="px-6 py-4 ">
      <Card>
        <CardContent className="">
          <ProposalFormComponent
            patologies={patologies.data}
            dispositives={dispositives.data}
          />
        </CardContent>
      </Card>
    </main>
  );
}

export default ProposalRequestInterface;
