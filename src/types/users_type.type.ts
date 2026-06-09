import { UserType as PrismaUserType } from "@prisma/client"

export const UserType = PrismaUserType
export type UserType = PrismaUserType

// export const UserType = {
//   ADMIN: "ADMIN",
//   CUSTOMER: "CUSTOMER",
// } as const;

// export type UserType = (typeof UserType)[keyof typeof UserType];
