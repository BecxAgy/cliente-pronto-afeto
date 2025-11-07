import { MessageCircleWarning } from 'lucide-react';
import React from 'react';

export const ErrorMessage = ({
  name,
  errors,
}: {
  name: string;
  errors: string[];
}) => {
  return (
    errors && (
      <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
        {errors.map((err: string) => (
          <p key={err} className="text-destructive text-xs flex">
            <MessageCircleWarning className="mr-2" size={15} />
            {err}
          </p>
        ))}
      </div>
    )
  );
};
