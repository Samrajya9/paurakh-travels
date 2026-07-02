import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateFaqInput } from "@/schemas/create-faq.schema"
import type { UpdateFaqInput } from "@/schemas/update-faq.schema"

const faqSelect = {
  id: true,
  question: true,
  answer: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.FaqSelect

export type Faq = PrismaClient.FaqGetPayload<{
  select: typeof faqSelect
}>

// ------------------------------------------------------------------ helpers

async function findFaqByIdOrThrow(id: string) {
  const faq = await prisma.faq.findUnique({
    where: { id },
    select: faqSelect,
  })

  if (!faq) {
    throw new AppError(`Faq "${id}" not found.`, 404)
  }

  return faq
}

// ------------------------------------------------------------------ create

export async function createFaq(dto: CreateFaqInput) {
  return prisma.faq.create({
    data: {
      question: dto.question,
      answer: dto.answer,
    },
    select: faqSelect,
  })
}

// ----------------------------------------------------------------- findAll

export async function getAllFaqs() {
  return prisma.faq.findMany({
    select: faqSelect,
    orderBy: { createdAt: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getFaqById(id: string) {
  return findFaqByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateFaqById(id: string, dto: UpdateFaqInput) {
  await findFaqByIdOrThrow(id)

  return prisma.faq.update({
    where: { id },
    data: dto,
    select: faqSelect,
  })
}

// ------------------------------------------------------------------ remove

export async function deleteFaqById(id: string) {
  await findFaqByIdOrThrow(id)

  return prisma.faq.delete({
    where: { id },
    select: faqSelect,
  })
}
