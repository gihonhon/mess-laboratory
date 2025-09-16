document.addEventListener("DOMContentLoaded", function () {
  // Edit book by id and update localStorage
  // Usage: editBook(id, { title, author, year, isComplete, image })
  function editBook(id, updatedFields) {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) return false;
    // Only update provided fields
    books[index] = {
      ...books[index],
      ...updatedFields,
      year:
        updatedFields.year !== undefined
          ? parseInt(updatedFields.year)
          : books[index].year,
    };
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
    return true;
  }
  //? Initial Variable
  const inputBookTitle = document.getElementById("inputBookTitle");
  const inputBookAuthor = document.getElementById("inputBookAuthor");
  const inputBookYear = document.getElementById("inputBookYear");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  const inputBookImage = document.getElementById("inputBookImage");
  const bookSubmit = document.getElementById("bookSubmit");
  const searchBookTitle = document.getElementById("searchBookTitle");
  const searchSubmit = document.getElementById("searchSubmit");
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  //! local storage
  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Helper: Render a list of books (used for both all books and search results)
  const renderBooks = (bookList = books) => {
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    bookList.forEach((book) => {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");

      const actionDiv = document.createElement("div");
      actionDiv.classList.add("action");

      const buttonMove = document.createElement("button");
      const iconMove = document.createElement("i");

      iconMove.classList.add(
        book.isComplete ? "fas" : "far",
        "fa-check-circle"
      );
      buttonMove.appendChild(iconMove);
      buttonMove.addEventListener("click", () => moveBook(book.id));

      const buttonDelete = document.createElement("button");
      const iconDelete = document.createElement("i");

      iconDelete.classList.add("fas", "fa-trash-alt");
      buttonDelete.appendChild(iconDelete);
      buttonDelete.addEventListener("click", () => deleteBook(book.id));

      // Edit button
      const buttonEdit = document.createElement("button");
      const iconEdit = document.createElement("i");
      iconEdit.classList.add("fas", "fa-edit");
      buttonEdit.appendChild(iconEdit);
      buttonEdit.title = "Edit Buku";
      buttonEdit.addEventListener("click", () => openEditModal(book));

      actionDiv.appendChild(buttonMove);
      actionDiv.appendChild(buttonEdit);
      actionDiv.appendChild(buttonDelete);

      const bookImage = document.createElement("img");
      bookImage.src = book.image;
      bookImage.classList.add("book_image");

      const bookInfo = document.createElement("div");
      bookInfo.classList.add("book_info");

      bookInfo.innerHTML = `
          <h3>${book.title}</h3>
          <p>Penulis: ${book.author}</p>
          <p>Tahun: ${book.year}</p>
        `;

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookInfo);
      bookItem.appendChild(actionDiv);

      if (book.isComplete) {
        completeBookshelfList.appendChild(bookItem);
      } else {
        incompleteBookshelfList.appendChild(bookItem);
      }
    });
  };
  // Modal for editing book
  let editModal = null;
  function createEditModal() {
    editModal = document.createElement("div");
    editModal.id = "editModal";
    editModal.innerHTML = `
      <form id="editBookForm">
        <h2>Edit Buku</h2>
        <input type="text" id="editTitle" placeholder="Judul Buku" required />
        <input type="text" id="editAuthor" placeholder="Penulis" required />
        <input type="number" id="editYear" placeholder="Tahun" required />
        <label class="edit-label">Selesai dibaca? <input type="checkbox" id="editIsComplete" /></label>
        <label class="edit-label">Ganti Gambar (opsional): <input type="file" id="editImage" accept="image/*" /></label>
        <div class="edit-modal-btns">
          <button type="submit" class="edit-save-btn">Simpan</button>
          <button type="button" id="cancelEditBtn" class="edit-cancel-btn">Batal</button>
        </div>
      </form>
    `;
    document.body.appendChild(editModal);
  }

  function openEditModal(book) {
    if (!editModal) createEditModal();
    editModal.style.display = "flex";
    // Fill form with book data
    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editYear").value = book.year;
    document.getElementById("editIsComplete").checked = book.isComplete;
    // Remove previous event listeners by cloning
    const oldForm = document.getElementById("editBookForm");
    const newForm = oldForm.cloneNode(true);
    oldForm.parentNode.replaceChild(newForm, oldForm);
    // Add submit event
    newForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const updatedTitle = document.getElementById("editTitle").value.trim();
      const updatedAuthor = document.getElementById("editAuthor").value.trim();
      const updatedYear = document.getElementById("editYear").value.trim();
      const updatedIsComplete =
        document.getElementById("editIsComplete").checked;
      const updatedImageFile = document.getElementById("editImage").files[0];
      if (!updatedTitle || !updatedAuthor || !updatedYear) {
        alert("Semua field wajib diisi!");
        return;
      }
      if (isNaN(parseInt(updatedYear))) {
        alert("Tahun harus berupa angka!");
        return;
      }
      // If user uploads a new image, read it
      if (updatedImageFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
          editBook(book.id, {
            title: updatedTitle,
            author: updatedAuthor,
            year: updatedYear,
            isComplete: updatedIsComplete,
            image: event.target.result,
          });
          editModal.style.display = "none";
        };
        reader.onerror = function () {
          alert("Gagal membaca file gambar!");
        };
        reader.readAsDataURL(updatedImageFile);
      } else {
        editBook(book.id, {
          title: updatedTitle,
          author: updatedAuthor,
          year: updatedYear,
          isComplete: updatedIsComplete,
        });
        editModal.style.display = "none";
      }
    });
    // Cancel button
    document.getElementById("cancelEditBtn").onclick = function () {
      editModal.style.display = "none";
    };
  }

  //! Kriteria 1 Menambahkan Data Buku
  const addBook = (title, author, year, isComplete, imageFile) => {
    // Basic validation
    if (!title || !author || !year) {
      alert("Semua field wajib diisi!");
      return;
    }
    if (isNaN(parseInt(year))) {
      alert("Tahun harus berupa angka!");
      return;
    }
    // If no image file, use default image
    if (!imageFile) {
      const newBook = {
        id: +new Date(),
        title,
        author,
        year: parseInt(year),
        isComplete,
        image: "image/default_book.png",
      };
      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      const newBook = {
        id: +new Date(),
        title,
        author,
        year: parseInt(year),
        isComplete,
        image: event.target.result,
      };

      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    };

    reader.onerror = function () {
      alert("Gagal membaca file gambar!");
    };

    reader.readAsDataURL(imageFile);
  };

  //! Kriteria 3 Memindahkan Buku antar Rak
  const moveBook = (id) => {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) return;
    books[index].isComplete = !books[index].isComplete;
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  };

  //! Kriteria 4 Menghapus Data Buku
  const deleteBook = (id) => {
    books = books.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  };

  // button text submit base on checkbox
  inputBookIsComplete.addEventListener("change", function () {
    const isComplete = this.checked;

    const buttonText = isComplete
      ? "Masukkan Buku ke rak <span>Selesai dibaca</span>"
      : "Masukkan Buku ke rak <span>Belum selesai dibaca</span>";

    bookSubmit.innerHTML = buttonText;
  });

  // submit button function
  bookSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const title = inputBookTitle.value.trim();
    const author = inputBookAuthor.value.trim();
    const year = inputBookYear.value.trim();
    const isComplete = inputBookIsComplete.checked;
    const imageFile = inputBookImage.files[0];
    addBook(title, author, year, isComplete, imageFile);

    // clear input value
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
    inputBookImage.value = "";
  });

  // filter buku dari pencarian
  searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = searchBookTitle.value.toLowerCase();

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );

    renderBooks(filteredBooks);
  });

  // Initial render all list buku
  renderBooks();

  // Background music play/pause logic
  const bgMusic = document.getElementById("bgMusic");
  const toggleMusicBtn = document.getElementById("toggleMusicBtn");
  let isMusicPlaying = false;

  function updateMusicBtn() {
    toggleMusicBtn.innerHTML = isMusicPlaying
      ? '<i class="fas fa-pause"></i>'
      : '<i class="fas fa-play"></i>';
  }

  toggleMusicBtn.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play();
      isMusicPlaying = true;
    } else {
      bgMusic.pause();
      isMusicPlaying = false;
    }
    updateMusicBtn();
  });

  // Optional: auto-play if allowed by browser
  bgMusic.addEventListener("play", function () {
    isMusicPlaying = true;
    updateMusicBtn();
  });
  bgMusic.addEventListener("pause", function () {
    isMusicPlaying = false;
    updateMusicBtn();
  });

  updateMusicBtn();
});
