import * as path from "path"
import { prisma } from "./client"

export function filenameToAltText(filename: string) {
  const base = filename.replace(path.extname(filename), "")
  return base
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ")
}

export async function upsertImageByUrl(url: string, altText?: string) {
  const existing = await prisma.image.findFirst({ where: { url } })
  if (existing) return existing

  return prisma.image.create({
    data: { url, altText },
  })
}

export async function upsertFaqByQuestion(question: string, answer: string) {
  const existing = await prisma.faq.findFirst({ where: { question } })
  if (existing) return existing

  return prisma.faq.create({
    data: { question, answer },
  })
}
