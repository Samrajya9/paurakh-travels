export const EntityType = {
  PACKAGE: "PACKAGE",
  DESTINATION: "DESTINATION",
  REGION: "REGION",
} as const

export type EntityType = (typeof EntityType)[keyof typeof EntityType]
