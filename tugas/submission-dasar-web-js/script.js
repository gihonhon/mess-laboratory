// Menunggu hingga seluruh konten halaman (DOM) selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  // --- LOGIKA UNTUK SLIDER GAMBAR ---
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".slider-button.prev");
  const nextButton = document.querySelector(".slider-button.next");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    // Cek batasan index
    if (index >= totalSlides) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - 1;
    } else {
      currentIndex = index;
    }

    // Menggeser wrapper sejauh lebar satu slide dikali index saat ini
    const offset = -currentIndex * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
  }

  // Event listener untuk tombol next dan previous
  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  // Inisialisasi slider di slide pertama
  showSlide(currentIndex);

  // --- LOGIKA UNTUK MENU NAVIGASI MOBILE (DROPDOWN) ---
  const hamburgerButton = document.getElementById("hamburger-button");
  const navList = document.getElementById("nav-list");

  hamburgerButton.addEventListener("click", () => {
    // Toggle kelas 'active' pada daftar navigasi
    navList.classList.toggle("active");
  });

  // --- LOGIKA UNTUK GENERATE KONTEN DINAMIS DENGAN LOOPING ---
  const popularPostsContainer = document.getElementById(
    "popular-posts-container"
  );

  // Data dummy untuk postingan populer (bisa diambil dari API di aplikasi nyata)
  const popularPostsData = [
    {
      title: "Pesona Kawah Ijen",
      imageUrl:
        "https://images.unsplash.com/photo-1598160472355-6d0a424a1b0b?q=80&w=1470&auto=format&fit=crop",
    },
    {
      title: "Menyapa Senja di Bromo",
      imageUrl:
        "https://images.unsplash.com/photo-1590132338686-35079a408759?q=80&w=1471&auto=format&fit=crop",
    },
    {
      title: "Keajaiban Candi Borobudur",
      imageUrl:
        "https://images.unsplash.com/photo-1596731383214-a95473173a4d?q=80&w=1471&auto=format&fit=crop",
    },
    {
      title: "Pulau Dewata, Bali",
      imageUrl:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1338&auto=format&fit=crop",
    },
  ];

  // Menggunakan loop 'forEach' untuk menampilkan setiap postingan
  popularPostsData.forEach((post) => {
    // 1. Membuat elemen HTML baru
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

    // 2. Mengisi konten HTML untuk kartu postingan
    postCard.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}">
            <div class="post-card-content">
                <h4>${post.title}</h4>
            </div>
        `;

    // 3. Menambahkan kartu postingan yang sudah dibuat ke dalam kontainer
    popularPostsContainer.appendChild(postCard);
  });
});
