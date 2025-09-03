import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//Get Video By MateriID
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const getVideo = await prisma.video.findMany({
      where: {
        MateriID: params.id,
      },
      select: {
        VideoID: true,
        Title_Video: true,
        Url_path: true,
        Short_Desc: true,
      },
    });
    return NextResponse.json(getVideo, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json(error, { status: 500 });
  }
};
