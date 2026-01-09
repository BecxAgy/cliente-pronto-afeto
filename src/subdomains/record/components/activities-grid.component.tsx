import { mockRecordResponse } from '../record.mock';
import {
  ActivityUnion,
  ActivityEnum,
  DiuresisActivity,
  FeedingActivity,
  GeneralStateActivity,
  DefecationActivity,
  MobilityActivity,
  DrugAdministrationActivity,
  VitalSignsActivity,
  SleepActivity,
  HydrationSkinActivity,
} from '../types';
import { formatActivityTimestamp } from '../helpers/activity-styles.helper';
import { ActivityCardComponent } from './cards/activity-card.component';
import { DefecationActivityDetails } from './cards/defecation-activity-details.component';
import { DiuresisActivityDetails } from './cards/diuresis-activity-details.component';
import { DrugActivityDetails } from './cards/drug-activity-details.component';
import { FeedingActivityDetails } from './cards/feeding-activity-details.component';
import { GeneralActivityDetails } from './cards/general-activity-details.component';
import { MobilityActivityDetails } from './cards/mobility-activity-details.component';
import VitalSignsActivityDetails from './cards/vital-signs-activity-details.component';
import { SleepActivityDetails } from './cards/sleep-activity-details.component';
import { HydrationActivityDetails } from './cards/hydratation-activity-details';

export const ActivitiesGrid = ({
  activities,
}: {
  activities: ActivityUnion[];
}) => {
  // Para uso futuro quando activities vier de props
  const displayActivities = mockRecordResponse.atividades;

  const renderActivityContent = (activity: ActivityUnion) => {
    switch (activity.tipo) {
      case ActivityEnum.DIURESES:
        return (
          <DiuresisActivityDetails activity={activity as DiuresisActivity} />
        );
      case ActivityEnum.ALIMENTACAO:
        return (
          <FeedingActivityDetails activity={activity as FeedingActivity} />
        );
      case ActivityEnum.DEJECOES:
        return (
          <DefecationActivityDetails
            activity={activity as DefecationActivity}
          />
        );
      case ActivityEnum.MOBILIDADE:
        return (
          <MobilityActivityDetails activity={activity as MobilityActivity} />
        );
      case ActivityEnum.SINAIS_VITAIS:
        return (
          <VitalSignsActivityDetails
            activity={activity as VitalSignsActivity}
          />
        );
      case ActivityEnum.ESTADO_GERAL:
        return (
          <GeneralActivityDetails activity={activity as GeneralStateActivity} />
        );
      case ActivityEnum.SONO:
        return <SleepActivityDetails activity={activity as SleepActivity} />;
      case ActivityEnum.HIDRATACAO_PELE:
        return (
          <HydrationActivityDetails
            activity={activity as HydrationSkinActivity}
          />
        );
      case ActivityEnum.MEDICAMENTOS:
        return (
          <DrugActivityDetails
            activity={activity as DrugAdministrationActivity}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {displayActivities.map((activity, index) => (
        <ActivityCardComponent
          key={`activity-${activity.tipo}-${index}`}
          type={activity.tipo}
          timestamp={formatActivityTimestamp(activity.dataHora)}
        >
          {renderActivityContent(activity)}
        </ActivityCardComponent>
      ))}
    </div>
  );
};
