import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { contactData } from '../../../dtos/contact.type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse <contactData>): Promise<void> {
    const prisma = new PrismaClient();
    const { name, email, phone } = req.body;    
    try {
        await prisma.contacts.create({
            data: {
                name,
                email,
                phone,
            }
        });
        res.status(200).json({name, email, phone});
    } catch (error) {
        console.error('error: ', error);
        
    }

}