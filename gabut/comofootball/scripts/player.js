async function loadPlayer() {
  try {
    const response = await fetch("player.json");
    const playerData = await response.json();
    const tbody = document.getElementById("player-body");

    playerData.forEach((player) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td class="number">${player.number}</td>
        <td class="name-cell">
          <i class="fa-solid fa-user"></i>
          <div>
            ${player.name}
            <span class="role">${player.position}</span>
          </div>
        </td>
        <td class="age">${player.age}</td>
        <td class="nat">
        <img src="${player.nat.flag}" alt="${player.nat.alt}"/>
        </td>
        <td class="contract">${player.contract}</td>
        <td class="market-value">${player.market_value}</td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading player data:", error);
  }
}
loadPlayer();
