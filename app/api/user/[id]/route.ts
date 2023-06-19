import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient()

export const GET = async (req: Request, res: NextApiResponse) => {
    try {
        const id = req.url.split("/user/")[1]

        await main()
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });

        if (!user) {
            return NextResponse.json({
                message: 'Not Found'
            }, {
                status: 404
            })
        }
        return NextResponse.json({
            message: 'success', user
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

export const PATCH = async (req: Request, res: NextApiResponse) => {
    try {
        const { name, email, age } = await req.json()
        const id = req.url.split('/user/')[1]

        await main()
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name, email, age
            }
        });

        if (!user) {
            return NextResponse.json({
                message: 'Not Found'
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            message: 'success', user
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

export const DELETE = async (req: Request, res: NextApiResponse) => {
    try {
        const id = req.url.split('/user/')[1]

        await main()
        const user = await prisma.user.delete({
            where: {
                id
            }
        });

        if (!user) {
            return NextResponse.json({
                message: 'Not Found'
            }, {
                status: 404
            })
        }
        return NextResponse.json({
            message: 'succcessfully deleted', user
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