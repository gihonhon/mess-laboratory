const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cards = document.querySelectorAll(".plant-card");

const ROWS = 5;
const COLS = 9;
const CELL_WIDTH = 100;
const CELL_HEIGHT = 100;

const grid = new Grid(ROWS, COLS, CELL_WIDTH, CELL_HEIGHT);
const zombies = [];
const bullets = [];
let sun = 150;
const floatingSuns = [];

// Wave variables
let wave = 1;
let zombiesPerWave = 3;
let waveInProgress = false;
let timeBetweenWaves = 7000; // jeda antar wave 7 detik
let waveTimer = 0;
let showWaveText = false;
let waveTextTimer = 0;

let isGameOver = false;
let gameOverSoundPlayed = false;

const images = {};

function loadImage(name, src) {
  const img = new Image();
  img.src = src;
  images[name] = img;
}

loadImage("peashooter", "assets/plants/peashooter.png");
loadImage("sunflower", "assets/plants/sunflower.png");
loadImage("zombie", "assets/plants/zombie.png");
loadImage("conehead", "assets/plants/conehead.png");
loadImage("buckethead", "assets/plants/buckethead.png");
loadImage("pea", "assets/plants/pea.png");
loadImage("sun", "assets/plants/sun.png");

const sounds = {};

function loadSound(name, src) {
  const audio = new Audio(src);
  sounds[name] = audio;
}

loadSound("shoot", "assets/sounds/pea_shooting_sound.mp3");
loadSound("sun", "assets/sounds/collect_sun.mp3");
loadSound("zombie_groan", "assets/sounds/zombie_moan.mp3");
loadSound("game_over", "assets/sounds/gameover.mp3");
loadSound("plant", "assets/sounds/soft_plant.mp3");

function playSound(name, volume = 1) {
  if (sounds[name]) {
    const clone = sounds[name].cloneNode(); // supaya bisa overlap
    clone.volume = volume;
    clone.play();
  }
}

// Tanaman disimpan di array 2d
const plants = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

// Render Plant
function drawPlant(row, col) {
  const plant = plants[row][col];
  const { x, y } = grid.getCellCoords(row, col);
  const img = images[plant.type];
  if (img && img.complete) {
    ctx.drawImage(img, x + 10, y + 10, 80, 80);
  } else {
    // fallback (kotak)
    ctx.fillStyle = "#228B22";
    ctx.fillRect(x + 10, y + 10, CELL_WIDTH - 20, CELL_HEIGHT - 20);
  }
}

// Event click untuk tanaman atau penanaman
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Ambil sun dulu
  for (let i = floatingSuns.length - 1; i >= 0; i--) {
    const sunObj = floatingSuns[i]; // ubah nama supaya tidak menimpa global 'sun'
    const dist = Math.hypot(sunObj.x - x, sunObj.y - y);

    if (dist < 30) {
      playSound("sun", 0.7);
      floatingSuns.splice(i, 1);
      sun += 25; // tambah global sun
      return;
    }
  }

  const { row, col } = grid.getCell(x, y);

  //cek jika belum ada tanaman di sel itu
  const type = selectedPlant;
  const cost = plantTypes[type].cost;

  if (sun >= cost && plantCD[type] === 0 && !plants[row][col]) {
    sun -= cost;
    plantCD[type] = 100; // ~1.6 detik cooldown
    playSound("plant", 0.6);

    if (type === "peashooter") {
      plants[row][col] = {
        type,
        shootTimer: 0,
      };
    } else if (type === "sunflower") {
      plants[row][col] = {
        type,
        sunTimer: 0,
      };
    }
  }
});

const plantTypes = {
  peashooter: {
    cost: 100,
    shootCooldown: 60,
  },
  sunflower: {
    cost: 50,
    sunCooldown: 300, // ~5 detik
  },
};

let selectedPlant = "peashooter";

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedPlant = card.dataset.type;
  });
});

let plantCD = {
  peashooter: 0,
  sunflower: 0,
};

function spawnFallingSun() {
  const x = Math.random() * (canvas.width - 80) + 40;
  const sunObj = {
    x: x,
    y: -40,
    speed: 1,
    collected: false,
  };
  floatingSuns.push(sunObj);
}

// Spawn setiap 7 detik
setInterval(spawnFallingSun, 7000);

const zombieTypes = {
  basic: {
    health: 100,
    speed: 0.3,
    color: "#8B0000",
  },
  conehead: {
    health: 250,
    speed: 0.25,
    color: "#d2691e",
  },
  buckethead: {
    health: 400,
    speed: 0.2,
    color: "#a9a9a9",
  },
};

function spawnZombie() {
  if (!waveInProgress) return;
  if (zombiesSpawned >= zombiesPerWave) return;

  const row = Math.floor(Math.random() * ROWS);

  // Tentukan jenis zombie berdasarkan wave
  let type = "basic";
  const rand = Math.random();
  if (wave >= 2 && rand > 0.6) type = "conehead";
  if (wave >= 3 && rand > 0.85) type = "buckethead";

  const zType = zombieTypes[type];

  const zombie = {
    x: canvas.width,
    y: row * CELL_HEIGHT,
    width: 60,
    height: 90,
    speed: zType.speed + Math.random() * 0.1,
    row: row,
    health: zType.health,
    type: type,
    color: zType.color,
  };

  zombies.push(zombie);
  playSound("zombie_groan", 0.4);
  zombiesSpawned++;
}

// START WAVE: spawn zombie tiap 2 detik sampai jumlah wave terpenuhi
function startWave() {
  if (isGameOver) return;
  waveInProgress = true;
  zombiesSpawned = 0;

  const spawnInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(spawnInterval);
      return;
    }
    if (zombiesSpawned >= zombiesPerWave) {
      clearInterval(spawnInterval);
      return;
    }
    spawnZombie();
  }, 2000); // spawn setiap 2 detik
}

// (Hapus/disable pemanggilan spawnZombie global; kita memakai startWave)

// Gambar zombie (pakai gambar jika ada)
function drawZombie(zombie) {
  const img = images[zombie.type] || images.zombie;
  if (img && img.complete) {
    ctx.drawImage(img, zombie.x, zombie.y + 5, 80, 90);
  } else {
    ctx.fillStyle = zombie.color || "#8B0000";
    ctx.fillRect(zombie.x, zombie.y + 5, zombie.width, zombie.height);
  }

  // Health bar (optional)
  const zStats = zombieTypes[zombie.type];
  const hpPercent = zombie.health / zStats.health;
  ctx.fillStyle = "red";
  ctx.fillRect(zombie.x, zombie.y, 80, 5);
  ctx.fillStyle = "lime";
  ctx.fillRect(zombie.x, zombie.y, 80 * hpPercent, 5);
}

function updateZombies() {
  for (let zombie of zombies) {
    zombie.x -= zombie.speed;

    // TODO: Nanti tambahkan tabrakan dengan tanaman
    // Game over jika melewati sisi kiri
    if (zombie.x < -zombie.width) {
      isGameOver = true;
    }
  }
}

function createBullet(row, col) {
  const { x, y } = grid.getCellCoords(row, col);
  const bullet = {
    x: x + CELL_WIDTH - 20,
    y: y + CELL_HEIGHT / 2 - 30,
    width: 10,
    height: 10,
    speed: 1,
    row: row,
    damage: 20,
  };
  playSound("shoot", 0.5);
  bullets.push(bullet);
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.speed;

    // Cek tabrakan dengan zombie
    for (let j = zombies.length - 1; j >= 0; j--) {
      const z = zombies[j];
      if (z.row === b.row && b.x + b.width > z.x && b.x < z.x + z.width) {
        // Tabrakan!
        z.health -= b.damage;
        bullets.splice(i, 1); // Hapus peluru
        if (z.health <= 0) {
          zombies.splice(j, 1); // Hapus zombie
        }
        break;
      }
    }

    // Hapus peluru jika keluar layar
    if (b.x > canvas.width) {
      bullets.splice(i, 1);
    }
  }
}

function drawBullets() {
  for (let b of bullets) {
    const img = images.pea;
    if (img && img.complete) {
      ctx.drawImage(img, b.x, b.y, 20, 20);
    } else {
      ctx.fillStyle = "#32CD32";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.width / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function updateSuns() {
  for (let sun of floatingSuns) {
    sun.y += sun.speed;
  }
}

function drawSuns() {
  for (let sun of floatingSuns) {
    const img = images.sun;
    if (img && img.complete) {
      ctx.drawImage(img, sun.x - 20, sun.y - 20, 40, 40);
    } else {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "orange";
      ctx.stroke();
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("sun-counter").innerText = "🌞 " + sun;
  for (let type in plantCD) {
    if (plantCD[type] > 0) {
      plantCD[type]--;
      const card = document.querySelector(`.plant-card[data-type="${type}"]`);
      card.classList.add("cooldown");
    } else {
      const card = document.querySelector(`.plant-card[data-type="${type}"]`);
      card.classList.remove("cooldown");
    }
  }
  // Gambar grid
  grid.draw(ctx);

  // Gambar & logic tanaman
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const plant = plants[r][c];
      if (plant) {
        drawPlant(r, c);

        if (plant.type === "peashooter") {
          const zombiesInRow = zombies.some((z) => z.row === r);
          if (zombiesInRow) {
            plant.shootTimer -= 1;
            if (plant.shootTimer <= 0) {
              createBullet(r, c);
              plant.shootTimer = plantTypes.peashooter.shootCooldown;
            }
          } else {
            plant.shootTimer = 0;
          }
        }

        if (plant.type === "sunflower") {
          plant.sunTimer -= 1;
          if (plant.sunTimer <= 0) {
            sun += 25;
            plant.sunTimer = plantTypes.sunflower.sunCooldown;
          }
        }
      }
    }
  }

  // Update & gambar zombie
  updateZombies();
  for (let zombie of zombies) {
    drawZombie(zombie);
  }

  updateBullets();
  drawBullets();
  updateSuns();
  drawSuns();

  // Cek wave selesai (ganti: saat wave selesai, mulai jeda 7s lalu startWave lagi)
  if (
    waveInProgress &&
    zombiesSpawned === zombiesPerWave &&
    zombies.length === 0
  ) {
    waveInProgress = false;
    waveTimer = Date.now();

    // Setelah jeda timeBetweenWaves, start wave berikutnya (jika belum game over)
    setTimeout(() => {
      if (!isGameOver) {
        wave++;
        zombiesPerWave += 3;
        zombiesSpawned = 0;
        startWave();
      }
    }, timeBetweenWaves);
  }

  // Tampilkan countdown next wave saat jeda
  if (!waveInProgress && !isGameOver && waveTimer > 0) {
    const elapsed = Date.now() - waveTimer;
    const remaining = Math.max(0, timeBetweenWaves - elapsed);
    const seconds = Math.ceil(remaining / 1000);
    if (seconds > 0) {
      ctx.fillStyle = "black";
      ctx.font = "20px sans-serif";
      ctx.fillText(`Next wave in: ${seconds}s`, canvas.width - 180, 30);
    }
  }

  if (isGameOver) {
    document.getElementById("game-over-screen").style.display = "flex";
    if (!gameOverSoundPlayed) {
      playSound("game_over", 0.8);
      gameOverSoundPlayed = true;
    }
    return; // Stop the game
  }

  requestAnimationFrame(gameLoop);
}

function resetGame() {
  // Reset semua data game
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      plants[r][c] = null;
    }
  }

  bullets.length = 0;
  zombies.length = 0;
  floatingSuns.length = 0;

  sun = 150;
  isGameOver = false;
  gameOverSoundPlayed = false;

  wave = 1;
  zombiesPerWave = 5;
  zombiesSpawned = 0;
  waveInProgress = false;
  waveTimer = 0;

  plantCD.peashooter = 0;
  plantCD.sunflower = 0;

  document.getElementById("game-over-screen").style.display = "none";

  startWave(); // mulai lagi
  requestAnimationFrame(gameLoop); // mulai ulang loop
}

document.getElementById("restart-btn").addEventListener("click", resetGame);

// start first wave + main loop
startWave();
requestAnimationFrame(gameLoop);
