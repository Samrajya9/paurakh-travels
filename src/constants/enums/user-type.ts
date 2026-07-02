export const UserType = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
} as const

export type UserType = (typeof UserType)[keyof typeof UserType]
