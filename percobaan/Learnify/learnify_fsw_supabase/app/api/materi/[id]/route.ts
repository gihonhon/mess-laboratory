import prisma from "@/lib/prisma";
import type { Materi } from "@prisma/client";
import { NextResponse } from "next/server";

// Get By Id
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const searchMateris = await prisma.materi.findFirst({
      where: {
        MateriID: params.id,
      },
      select: {
        MateriID: true,
        Materi_Title: true,
        Kelas: true,
        Subject: true,
        videos: true,
      },
    });
    return NextResponse.json(searchMateris, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json(error, { status: 500 });
  }
};
// Update
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Materi = await req.json();
    const updateMateri = await prisma.materi.update({
      where: {
        MateriID: params.id,
      },
      data: {
        Materi_Title: body.Materi_Title,
        KelasID: body.KelasID,
        SubjectID: body.SubjectID,
      },
    });
    return NextResponse.json(updateMateri, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 501 });
  }
};
