import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { contacts } from '../../../dtos/contact.type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse <Array<contacts>>
): Promise<void> {
    const prisma = new PrismaClient();
    try {
        const contactsData = await prisma.contacts.findMany();
        res.status(200).json(contactsData);
    } catch (error) {
        console.error('Error: ', error);
        
    }
};