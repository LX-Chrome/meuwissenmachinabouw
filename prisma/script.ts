'use server'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const hasDb = !!process.env.DATABASE_URL

type poiDataType = {
    positionX: number
    positionY: number
    imageSrc: string
    header: string
    text: string
}

export const getPois = async () => {
    if (!hasDb) return []
    return prisma.pOI.findMany()
}

export const getPois2 = async () => {
    if (!hasDb) return []
    return prisma.pOI2.findMany()
}

export const getSecret = async () => {
    if (!hasDb) return []
    return prisma.secret.findMany()
}

export const updateSingleSecret = async (id: number | undefined, data: {text: string}) => {
    if(!id) {
        return {error: 'No id provided'}
    }

    if (!data.text) {
        return {error: 'No content provided'}
    }

    if (!hasDb) return {error: 'Database not configured'}

    return prisma.secret.update({
        where: {id},
        data,
    })
}

export const getReferee = async () => {
    if (!hasDb) return []
    return prisma.referee.findMany()
}

export const updateSingleReferee = async (id: number | undefined, data: {text: string, TOU: string}) => {
    if(!id) {
        return {error: 'No id provided'}
    }

    if (!data.text || !data.TOU) {
        return {error: 'No content provided'}
    }

    if (!hasDb) return {error: 'Database not configured'}

    return prisma.referee.update({
        where: {id},
        data,
    })
}

export const updateSinglePoi = async (id: number, data: poiDataType | undefined, type: string) => {
    if (!data) {
        return {error: 'No data provided'}
    }

    if (!hasDb) return {error: 'Database not configured'}

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
    if (!hasDb) return []
    return prisma.dynamicText.findMany()
}

export const updateDynamicData = async (id: number | undefined, data: {content: string | undefined}) => {
    if(!id) {
        return {error: 'No id provided'}
    }

    if (!data.content) {
        return {error: 'No content provided'}
    }

    if (!hasDb) return {error: 'Database not configured'}

    return prisma.dynamicText.update({
        where: {id},
        data,
    })
}