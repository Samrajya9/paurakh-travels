import { CompanyContactType } from "@prisma/client"

export const COMPANY = {
  companyName: "Paurakh Travels",
  tagline: "Discover the Himalayas, Your Way.",
  address: "Thamel, Kathmandu 44600, Nepal",
}

export const CONTACTS: { type: CompanyContactType; value: string }[] = [
  { type: CompanyContactType.PHONE, value: "+977-01-4700000" },
  { type: CompanyContactType.EMAIL, value: "info@paurakhtravels.com" },
  { type: CompanyContactType.WHATSAPP, value: "+977-9800000000" },
  { type: CompanyContactType.VIBER, value: "+977-9800000000" },
  {
    type: CompanyContactType.FACEBOOK,
    value: "https://facebook.com/paurakhtravels",
  },
  {
    type: CompanyContactType.INSTAGRAM,
    value: "https://instagram.com/paurakhtravels",
  },
]
