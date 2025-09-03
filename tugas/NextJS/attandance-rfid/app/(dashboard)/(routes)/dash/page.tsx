import { Pegawai, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getData(): Promise<Pegawai[]> {
  //TODO : Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      namaPegawai: "Agung Gihon",
      rfid: "1392002428",
      email: "m@example.com",
      jobTitle: "Pegawai Divisi A",
      status: false,
      workHour: 12,
    },
    {
      id: "728ef52d",
      namaPegawai: "Kaela",
      rfid: "1292003428",
      email: "kaela@example.com",
      jobTitle: "Pegawai Divisi B",
      status: true,
      workHour: null,
    },
    // ...
  ];
}

export default async function PegawaiPage() {
  const data = await getData();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
