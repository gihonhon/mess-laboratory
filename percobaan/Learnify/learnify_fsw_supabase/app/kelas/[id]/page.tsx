import prisma from "@/lib/prisma";
import Link from "next/link";
import { FaList } from "react-icons/fa";

const getKelasId = async (id: string) => {
  try {
    const res = await prisma.kelas.findMany({
      where: {
        KelasID: id,
      },
      select: {
        Kelas: true,
        materis: {
          include: {
            Subject: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const KelasListpage = async ({ params }: { params: { id: string } }) => {
  const [kelas] = await Promise.all([getKelasId(params.id)]);

  const kelasTitle = kelas?.map((item) => (
    <h1 className="text-2xl py-2 my-2" key={item.Kelas}>
      Kelas: {item.Kelas}
    </h1>
  ));

  const countMateri = kelas?.map((kelas) => (
    <h1 key={kelas.Kelas} className="text-xl mt-4 mb-2 mx-4">
      Materi({kelas.materis.length})
    </h1>
  ));

  return (
    <div className="flex justify-center my-4 lg:my-20 w-full">
      <div className="flex flex-col w-[70%]">
        {kelasTitle}
        <div className="flex flex-col border-2 mb-8">
          {countMateri}
          <div className="grid grid-cols-1 mx-4 mb-1 divide-y">
            {kelas?.map((item) => (
              <div key={item.Kelas}>
                {item.materis.map((materi) => (
                  <Link
                    key={materi.MateriID}
                    href={`/materi/${materi.Materi_Title}`}
                    className="flex items-center gap-x-4 my-2 py-2 hover:cursor-pointer"
                  >
                    <span className="text-5xl">
                      <FaList />
                    </span>
                    <div className="flex flex-col">
                      <h3 className="font-medium text-lg px-2 mb-1">
                        {materi.Materi_Title}
                      </h3>
                      <div className="mt-1">
                        <span className="px-4 py-2 rounded-full text-sm w-auto bg-[#D9D9D9]">
                          {materi.Subject.Subject}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelasListpage;
