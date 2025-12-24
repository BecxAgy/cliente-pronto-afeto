import React from 'react'
import { DateSelectorProvider } from '../contexts/date-selector.context'
import { DateWeekSelector } from '../components/date-week-selector.component'
import { DaySelector } from '../components/day-selector.component'
import { Proposal, ProposalDTOGet } from '@/src/subdomains/proposal/types'
import { RecordDetailsCard } from '../components/record-details-card.component'
import { AvatarList } from '@/src/shared/modules/components/ui/avatar-list'
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper'

interface RecordDetailsInterfaceProps {
    proposal: Proposal
}

export const RecordDetailsInterface = ({ proposal }: RecordDetailsInterfaceProps) => {
    const startDate = parseBackendDate(proposal.plantao.dataHoraInicioPlantao)
    
    return (
        <DateSelectorProvider startDate={startDate}>
            <div className='p-6'>
                <header className='flex flex-col gap-4'>
                    <div className='flex items-start justify-between'>
                        <div>
                            <h2 className='text-2xl font-bold mb-2'>Prontuário</h2>

                        </div>
                        <DateWeekSelector />
                    </div>
                </header>
                <section>
                   
                    <div className="grid grid-cols-3 w-full  py-4 gap-4">
                    <DaySelector />
                    <RecordDetailsCard proposal={proposal} />

                    </div>

                </section>
            </div>
        </DateSelectorProvider>
    )
}
