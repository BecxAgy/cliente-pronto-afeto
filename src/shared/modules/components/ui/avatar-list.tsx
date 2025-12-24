import Image from 'next/image'
import React from 'react'
import { Caregiver } from '../../types/caregiver.types'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export const AvatarList = ({ avatars, size = "md" }: { avatars: Caregiver[], size?: "sm" | "md" | "lg" }) => {
    return (

        <div className="flex items-center justify-between">
            {/* Team Avatars */}
            <div className="flex -space-x-2">
                {avatars.map((member, index) => (
                    <Popover key={`${member.cuidadorId}-${index}`}>
                        <PopoverTrigger>

                            <div
                                key={`${member.cuidadorId}-${index}`}
                                className={`overflow-hidden rounded-full border-2 border-white ${size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : "h-12 w-12"}`}
                                style={{ zIndex: avatars.length - index }}
                            >
                                <Image
                                    src={'/images/profile.png'}
                                    alt={`Team member ${member.cuidadorId}`}
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                        </PopoverTrigger>
                        <PopoverContent side="right" align="center"><p className="text-sm font-medium">{member.nome}</p></PopoverContent>
                           
                                
                    </Popover>
                ))}
            </div>
        </div>
    )
}
