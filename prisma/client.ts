import { PrismaClient } from "@prisma/client";

declare global {
    namespace NodeJS {
        interface Global { }
    }
}
interface CustomNodejsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}

declare const global: CustomNodejsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma

// https://www.youtube.com/watch?v=PabMVyF9vUg