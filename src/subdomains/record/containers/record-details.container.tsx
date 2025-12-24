import React from 'react'
import { RecordDetailsInterface } from '../interfaces/record-details.interface'
import { getProposalById } from '@/src/subdomains/proposal/actions'
import { notFound } from 'next/navigation'

interface RecordDetailsContainerProps {
    params: Promise<{
        id: string
    }>
}

export default async function RecordDetailsContainer({ params }: RecordDetailsContainerProps) {
    const { id } = await params
    
    const { error, data: proposal, message } = await getProposalById(id)
    
    if (error || !proposal) {
        notFound()
    }
    
    return (
        <RecordDetailsInterface proposal={proposal} />
    )
}
