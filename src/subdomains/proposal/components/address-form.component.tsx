import { TextField } from '@/src/shared/modules/components/ui/form-field.component';
import { Home, MapPin } from 'lucide-react';

const AddressFormComponent = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold">Local de Atendimento</h2>
        <p className="text-muted-foreground">
          Informe o endereço onde o paciente receberá o atendimento.
        </p>
      </section>

      <section className="space-y-4">
        <TextField
          name="address.cep"
          label="CEP"
          placeholder="00000-000"
          icon={MapPin}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField name="address.estado" label="Estado" placeholder="Bahia" />

          <TextField
            name="address.cidade"
            label="Cidade"
            placeholder="Salvador"
          />
        </div>

        <TextField name="address.bairro" label="Bairro" placeholder="Pituba" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TextField
              name="address.rua"
              label="Rua"
              placeholder="Rua das Flores"
              icon={Home}
            />
          </div>

          <TextField name="address.numero" label="Número" placeholder="123" />
        </div>

        <TextField
          name="address.complemento"
          label="Complemento (opcional)"
          placeholder="Apto 101, Bloco A"
        />
      </section>
    </div>
  );
};

export default AddressFormComponent;
