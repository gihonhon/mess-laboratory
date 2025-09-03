import VideoPlayer from "@/components/VideoPlayer";
import prisma from "@/lib/prisma";

const getVideoList = async (id: string) => {
  const res = await prisma.video.findMany({
    where: {
      MateriID: id,
    },
    select: {
      MateriID: true,
      VideoID: true,
      Title_Video: true,
      Url_path: true,
      Short_Desc: true,
    },
  });
  return res;
};

const DetailMateri = async ({ params }: { params: { materis: string } }) => {
  const [videoList] = await Promise.all([getVideoList(params.materis)]);
  return <VideoPlayer videoList={videoList} />;
};

export default DetailMateri;
