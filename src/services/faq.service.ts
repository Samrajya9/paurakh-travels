import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateFaqInput } from "@/schemas/create-faq.schema"
import type { UpdateFaqInput } from "@/schemas/update-faq.schema"
import { faqSelect } from "@/types/faq.type"

// ------------------------------------------------------------------ helpers

async function findFaqByIdOrThrow(id: string) {
  const faq = await prismaClient.faq.findUnique({
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
  return prismaClient.faq.create({
    data: {
      question: dto.question,
      answer: dto.answer,
    },
    select: faqSelect,
  })
}

// ----------------------------------------------------------------- findAll

export async function getAllFaqs() {
  return prismaClient.faq.findMany({
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

  return prismaClient.faq.update({
    where: { id },
    data: dto,
    select: faqSelect,
  })
}

// ------------------------------------------------------------------ remove

export async function deleteFaqById(id: string) {
  await findFaqByIdOrThrow(id)

  return prismaClient.faq.delete({
    where: { id },
    select: faqSelect,
  })
}
