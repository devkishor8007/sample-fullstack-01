import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function main() {
    try {
        await prisma.$connect()
    } catch (error) {
        return Error('database connection unsuccessfull')
    }
}

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await main()
        const users = await prisma.user.findMany();
        return NextResponse.json({
            message: 'success', users
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'error', error
        }, {
            status: 500
        })
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (req: any, res: NextApiResponse) => {
    try {
        const { name, email, age } = await req.json();
        await main()

        const user = await prisma.user.create({
            data: {
                name, email, age
            }
        })

        return NextResponse.json({
            message: 'successfully created', user
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: 'error', error
        }, {
            status: 500
        })
    } finally {
        await prisma.$disconnect()
    }
}