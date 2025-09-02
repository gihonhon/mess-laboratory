async function loadStaff() {
  try {
    const response = await fetch("staff.json");
    const staffData = await response.json();
    const tbody = document.getElementById("staff-body");

    staffData.forEach((staff) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="name-cell">
          <i class="fa-solid fa-user"></i>
          <div>
            ${staff.name}
            <span class="role">${staff.role}</span>
          </div>
        </td>
        <td>${staff.age}</td>
        <td>
        <img src="${staff.nat.flag}" alt="${staff.nat.alt}"/>
        </td>
        <td>${staff.appointed}</td>
        <td>${staff.contract}</td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading staff data:", error);
  }
}
loadStaff();
