import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse <object>,
): Promise<void> {
    const { id } = req.query;
    const prisma = new PrismaClient();
    try {
        await prisma.contacts.delete({where: { id: Number(id) }});
        res.status(200).json({
            msg: `contact with ${id} deleted`,
        })
    } catch (error) {
        console.error("Error: ", error);
    }
}