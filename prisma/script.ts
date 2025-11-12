'use server'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type poiDataType = {
    positionX: number
    positionY: number
    imageSrc: string
    header: string
    text: string
}

export const getPois = async () => {
    return prisma.pOI.findMany()
}

export const getPois2 = async () => {
    return prisma.pOI2.findMany()
}

export const getSecret = async () => {
    return prisma.secret.findMany()
}

export const updateSingleSecret = async (id: number | undefined, data: {text: string}) => {
    if(!id) {
        return {error: 'No id provided'}
    }

    if (!data.text) {
        return {error: 'No content provided'}
    }

    return prisma.secret.update({
        where: {id},
        data,
    })
}

export const getReferee = async () => {
    return prisma.referee.findMany()
}

export const updateSingleReferee = async (id: number | undefined, data: {text: string, TOU: string}) => {
    if(!id) {
        return {error: 'No id provided'}
    }

    if (!data.text || !data.TOU) {
        return {error: 'No content provided'}
    }

    return prisma.referee.update({
        where: {id},
        data,
    })
}

export const updateSinglePoi = async (id: number, data: poiDataType | undefined, type: string) => {
    if (!data) {
        return {error: 'No data provided'}
    }

    if(type === 'poi') {
        return prisma.pOI.update({
            where: {id},
            data,
        })
    } else if(type === 'poi2') {
        return prisma.pOI2.update({
            where: {id},
            data,
        })
    } else {
        return {error: 'Invalid type'}
    }
}

export const getDynamicData = async () => {
    return prisma.dynamicText.findMany()
}

export const updateDynamicData = async (id: number | undefined, data: {content: string | undefined}) => {
    if(!id) {
        return {error: 'No id provided'}
    }

    if (!data.content) {
        return {error: 'No content provided'}
    }

    return prisma.dynamicText.update({
        where: {id},
        data,
    })
}