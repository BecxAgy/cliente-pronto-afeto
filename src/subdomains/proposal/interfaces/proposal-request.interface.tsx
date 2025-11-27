import { getAllPatologies } from '@/src/shared/modules/actions/patology.actions';
import ProposalFormComponent from '../components/proposal-form.component';
import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import { getAllDispositives } from '@/src/shared/modules/actions/dispositive.actions';
import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { getCuidadosByCliente } from '@/src/subdomains/care/actions';

async function ProposalRequestInterface() {
  const patologies = await getAllPatologies();
  const dispositives = await getAllDispositives();
  const session = await getUserSession();

  let cares = null;
  if (session?.client) {
    const caresResult = await getCuidadosByCliente();
    if (!caresResult.error) {
      cares = caresResult.data;
    }
  }

  return (
    <main className="px-6 py-4 ">
      <Card>
        <CardContent className="">
          <ProposalFormComponent
            client={session?.client}
            cares={cares ?? undefined}
            patologies={patologies.data}
            dispositives={dispositives.data}
          />
        </CardContent>
      </Card>
    </main>
  );
}

export default ProposalRequestInterface;
