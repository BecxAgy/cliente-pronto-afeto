import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { UserSession } from '@/src/shared/modules/types/session.types';

export const HomeInterface = async () => {
  const session: UserSession = await getUserSession();
  console.log('🚀 ~ HomeInterface ~ session:', session);
  return (
    <div className="p-6">
      <h1 className="text-2xl ">Olá {session.client?.nome || 'Cliente'}</h1>
    </div>
  );
};
