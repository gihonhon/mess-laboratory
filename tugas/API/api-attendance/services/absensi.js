const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllAbsensi(page = 1) {
  try {
    const rows = await db.query(
      `SELECT absensi.id, absensi.id_user, absensi.tanggal, user.nama_user, user.rfid_id
        FROM absensi
        JOIN user ON absensi.id_user = user.id`
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return { data };
  } catch (error) {
    console.error("Error getting all absensi entries:", error);
    return { message: "Error getting all absensi entries" };
  }
}

module.exports = {
  getAllAbsensi,
};
