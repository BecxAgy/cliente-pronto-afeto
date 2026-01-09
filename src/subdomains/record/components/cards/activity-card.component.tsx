/* eslint-disable react-hooks/static-components */
import {
  Card,
  CardContent,
  CardHeader,
} from '@/src/shared/modules/components/ui/card';
import { ActivityEnum } from '../../types';
import {
  getActivityIconClasses,
  getActivityLabel,
  getActivityIcon,
} from '../../helpers/activity-styles.helper';
import { cn } from '@/src/shared/modules/lib/utils';

interface ActivityCardComponentProps {
  children: React.ReactNode;
  type: ActivityEnum;
  timestamp?: string;
  className?: string;
}

export const ActivityCardComponent = ({
  children,
  type,
  timestamp,
  className,
}: ActivityCardComponentProps) => {
  const Icon = getActivityIcon(type);
  const label = getActivityLabel(type);

  return (
    <Card
      className={cn(
        'bg-card border border-border/50 rounded-2xl shadow-sm',
        'transition-all duration-200 ease-out',
        'hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      <CardHeader className="flex flex-row items-center gap-2 sm:gap-3 p-4 sm:p-6 pb-3 sm:pb-4">
        <div className={getActivityIconClasses(type)}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-foreground truncate">
            {label}
          </h3>
          {timestamp && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {timestamp}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
        {children}
      </CardContent>
    </Card>
  );
};
