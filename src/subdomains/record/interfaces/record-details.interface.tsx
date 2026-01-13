'use client';
import React, { useState } from 'react';
import { DateSelectorProvider } from '../contexts/date-selector.context';
import { DateWeekSelector } from '../components/date-week-selector.component';
import { DaySelector } from '../components/day-selector.component';
import { Proposal } from '@/src/subdomains/proposal/types';
import { RecordDetailsCard } from '../components/record-details-card.component';
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper';
import { ActivitiesGrid } from '../components/activities-grid.component';
import { RecordResponse } from '../types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/shared/modules/components/ui/sheet';
import { Button } from '@/src/shared/modules/components/ui/button';
import { FileText } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/shared/modules/components/ui/tooltip';
import Link from 'next/link';

interface RecordDetailsInterfaceProps {
  proposal: Proposal;
  record: RecordResponse;
  selectedDate: string;
  id: string;
}

export const RecordDetailsInterface = ({
  proposal,
  record,
  selectedDate,
  id,
}: RecordDetailsInterfaceProps) => {
  const startDate = parseBackendDate(proposal.plantao.dataHoraInicioPlantao);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <DateSelectorProvider
      startDate={startDate}
      initialSelectedDate={selectedDate}
    >
      <div className="p-4 md:p-6">
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 truncate">
                Prontuário
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <DateWeekSelector />

              {/* Botão Sheet para Mobile/Tablet */}
              <Link href={`/proposal/${id}/record/evaluate`}>
                <Button>Avaliar Atendimento</Button>
              </Link>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="lg:hidden h-9 w-9"
                        >
                          <FileText className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Detalhes do prontuário</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <SheetContent
                  side="right"
                  className="w-full sm:max-w-md overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Detalhes do Prontuário</SheetTitle>
                  </SheetHeader>
                  <RecordDetailsCard proposal={proposal} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full py-4 gap-4">
            <div className="lg:col-span-2 space-y-6">
              <DaySelector />
              <ActivitiesGrid activities={record.atividades} />
            </div>
            {/* RecordDetailsCard visível apenas em desktop */}
            <div className="hidden lg:block">
              <RecordDetailsCard proposal={proposal} />
            </div>
          </div>
        </section>
      </div>
    </DateSelectorProvider>
  );
};
