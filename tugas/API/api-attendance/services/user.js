const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllUsers() {
  try {
    const rows = await db.query(`SELECT * FROM user`);

    const data = helper.emptyOrRows(rows);

    return { data };
  } catch (error) {
    console.error("Error getting all users:", error);
    return { message: "Error getting all users" };
  }
}

async function createUser(user) {
  try {
    const result = await db.query(
      `INSERT INTO user (nama_user, rfid_id) VALUES ('${user.nama_user}', '${user.rfid_id}')`
    );

    let message = "Error in creating user";

    if (result.affectedRows) {
      message = "User created successfully";
    }

    return { message };
  } catch (error) {
    console.error("Error creating user:", error);
    return { message: "Error creating user" };
  }
}

async function updateUser(userId, updatedUserData) {
  try {
    const result = await db.query(
      `UPDATE user 
        SET nama_user = '${updatedUserData.nama_user}', rfid_id = '${updatedUserData.rfid_id}' 
        WHERE id = ${userId}`
    );

    let message = "Error in updating user";

    if (result.affectedRows) {
      message = "User updated successfully";
    }

    return { message };
  } catch (error) {
    console.error("Error updating user:", error);
    return { message: "Error updating user" };
  }
}

async function deleteUser(userId) {
  try {
    const result = await db.query(`DELETE FROM user WHERE id = ${userId}`);

    let message = "Error in deleting user";

    if (result.affectedRows) {
      message = "User deleted successfully";
    }

    return { message };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { message: "Error deleting user" };
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
