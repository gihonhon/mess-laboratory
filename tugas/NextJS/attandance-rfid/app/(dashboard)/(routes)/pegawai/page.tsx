import { Pegawai, columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import axios from "axios";

interface ApiResponse {
  data: Pegawai[];
  meta: {
    page: string;
  };
}

async function getData(): Promise<Pegawai[]> {
  try {
    const response = await axios.get("http://iot.panti.my.id/users");
    // console.log(response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function PegawaiPage() {
  const data = await getData();
  // console.log(data);
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl py-4">Daftar Pegawai</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
