import { Badge } from '@/src/shared/modules/components/ui/badge';
import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import { Mail, MapPin } from 'lucide-react';
import { ClientResponse } from '../types';

export default function ProfileHeader({
  profile,
}: {
  profile: ClientResponse;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{profile.nome}</h1>
              <Badge variant="secondary">Cliente</Badge>
            </div>

            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {profile.endereco.cidade}, {profile.endereco.estado}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
