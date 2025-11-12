import {ReactNode} from 'react';
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {useEffect, useState} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ChevronRight} from "lucide-react";

interface POIProps {
    positionX: number;
    positionY: number;
    imageSrc: string;
    header: ReactNode;
    text: ReactNode;
    extraImageSrc: string | null;
}

const POI = ({positionX, positionY, imageSrc, header, text, extraImageSrc}: POIProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (positionX < 0 || positionY < 0) {
            console.error('PositionX and positionY must be greater than 0');
        } else {
            setLoading(false);
        }

    }, [positionX, positionY]);

    if (loading) {
        return null;
    }

    return (
        <div
            className={`h-[10vh] w-[5vw] absolute rounded-xl hover:cursor-pointer hover:z-[5]`}
            style={{top: `${positionY}%`, left: `${positionX}%`}}>
            <HoverCard>
                <HoverCardTrigger>
                    <div
                        className={'h-[16px] w-[16px] rotate-45 rounded-[10px] absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-yellow-400 shadow-md'}/>
                    <div className={'w-full h-full flex items-center justify-center select-none'}>
                        <Image src={imageSrc} alt={'POI hover image'} fill={true}
                               className={'object-cover rounded-[10px] z-[0] relative shadow-lg ring-1 ring-black/10 transition-transform duration-300 hover:scale-110'}/>
                    </div>
                </HoverCardTrigger>

                <HoverCardContent className={'mt-1 bg-yellow-400 border-yellow-300 shadow-xl rounded-md'}>
                    <h2 className={'text-xl font-semibold'}>{header}</h2>
                    <div className={'text-sm'}>
                        {text}
                    </div>
                    {extraImageSrc && (
                        <HoverCard>
                            <HoverCardTrigger>
                                <Button
                                    variant="outline"
                                    className="mt-2 bg-yellow-500 text-black hover:bg-yellow-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
                                >
                                    Bekijk meer
                                    <ChevronRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent
                                className={'-mb-[3.25rem] ml-[46.25rem] bg-yellow-400 border-yellow-300 w-96'}>
                                <div className={'grid grid-rows-1 grid-cols-[auto]'}>
                                    <Image src={extraImageSrc}
                                           alt={'POI hover image'}
                                           width={2339} height={1653}
                                           className={'hover:scale-150 rounded-md'}/>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    )}
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export default POI;