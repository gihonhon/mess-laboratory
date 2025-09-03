import axios from "axios";
import { Pegawai, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

interface ApiResponse {
  data: Pegawai[];
  meta: {
    page: string;
  };
}

async function getData(): Promise<Pegawai[]> {
  //TODO : Fetch data from your API here.
  try {
    const response = await axios.get("http://iot.panti.my.id/attendance");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function AbsensiPage() {
  const data = await getData();
  console.log(data);
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl py-4">Data Absensi</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
