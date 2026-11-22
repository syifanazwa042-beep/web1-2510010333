const katalog = [
    {
        id: 1,
        nama: "Kain Sasirangan Motif Ombak Sinapur Karang",
        kategori: "kain",
        harga: 180000,
        gambar: "img/ombak-sinapur-karang.svg",
        deskripsi: "Kain katun satin 2 meter bermotif gelombang karang yang melambangkan keteguhan hati."
    },
    {
        id: 2,
        nama: "Kain Sasirangan Motif Gigi Haruan",
        kategori: "kain",
        harga: 170000,
        gambar: "img/gigi-haruan.svg",
        deskripsi: "Motif zig-zag khas Banjar dengan pewarnaan alami yang tajam dan tidak mudah pudar."
    },
    {
        id: 3,
        nama: "Kain Sasirangan Motif Kambang Kacang",
        kategori: "kain",
        harga: 165000,
        gambar: "img/kambang-kacang.svg",
        deskripsi: "Motif bunga kacang simbol kerukunan, berbahan katun primisima halus ukuran 2 x 1,15 meter."
    },
    {
        id: 4,
        nama: "Kain Sasirangan Motif Naga Balimbur",
        kategori: "kain",
        harga: 210000,
        gambar: "img/naga-balimbur.svg",
        deskripsi: "Kain eksklusif bermotif Naga Balimbur dengan detail jelujur tangan pengrajin Martapura."
    },
    {
        id: 5,
        nama: "Kain Sasirangan Motif Bayam Raja",
        kategori: "kain",
        harga: 195000,
        gambar: "img/bayam-raja.svg",
        deskripsi: "Motif klasik bernuansa elegan yang melambangkan martabat dan kehormatan."
    },
    {
        id: 6,
        nama: "Jaket Bomber Etnik Sasirangan",
        kategori: "pakaian",
        harga: 290000,
        gambar: "img/baju-pria.jpg",
        deskripsi: "Jaket kasual unisex dengan panel motif Sasirangan dan lapisan dalam katun yang nyaman."
    },
    {
        id: 7,
        nama: "Kebaya Modern Encim Sasirangan",
        kategori: "pakaian",
        harga: 275000,
        gambar: "img/baju-wanita.jpg",
        deskripsi: "Kebaya modern berpadu aksen kain Sasirangan khas Kalimantan Selatan untuk acara wisuda dan pesta."
    },
    {
        id: 8,
        nama: "Rompi Vest Etnik Sasirangan",
        kategori: "pakaian",
        harga: 215000,
        gambar: "img/outer-sasirangan.jpg",
        deskripsi: "Rompi tanpa lengan berlapis furing halus, cocok dipadukan dengan kemeja polos maupun manset."
    },
    {
        id: 9,
        nama: "Selendang Panjang Motif Iris Pudak",
        kategori: "aksesoris",
        harga: 115000,
        gambar: "img/iris-pudak.svg",
        deskripsi: "Selendang ringan dengan pinggiran rumbai rapi bermotif irisan daun pandan wangi."
    },
    {
        id: 10,
        nama: "Tas Selempang Slingbag Sasirangan",
        kategori: "aksesoris",
        harga: 125000,
        gambar: "img/tas-sasirangan.jpg",
        deskripsi: "Tas selempang ringkas berbahan kanvas tebal dengan kombinasi motif Sasirangan modern."
    },
    {
        id: 11,
        nama: "Sepatu Slip-On Kanvas Sasirangan",
        kategori: "aksesoris",
        harga: 225000,
        gambar: "img/sepatu-sasirangan.jpg",
        deskripsi: "Sepatu kasual model slip-on berbalut kain Sasirangan dengan sol karet anti-selip."
    }
];

const daftarKatalog = document.querySelector("#daftar-katalog");
const inputCari = document.querySelector("#cari");
const tombolFilter = document.querySelectorAll(".tombol-filter");
const infoJumlah = document.querySelector("#info-jumlah");

let kategoriAktif = "semua";

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}

function buatKartu(produk) {
    const kartu = document.createElement("article");
    kartu.className = "product-card";

    const gambar = document.createElement("img");
    gambar.src = produk.gambar;
    gambar.alt = produk.nama;
    gambar.width = 600;
    gambar.height = 400;
    gambar.loading = "lazy";

    const wadahGambar = document.createElement("div");
    wadahGambar.className = "product-image";
    wadahGambar.append(gambar);

    const isi = document.createElement("div");
    isi.className = "product-info";

    const label = document.createElement("span");
    label.className = "label-kategori";
    label.textContent = produk.kategori;

    const judul = document.createElement("h3");
    judul.textContent = produk.nama;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = produk.deskripsi;

    const harga = document.createElement("p");
    harga.className = "price";
    harga.textContent = formatRupiah(produk.harga);

    isi.append(label, judul, deskripsi, harga);
    kartu.append(wadahGambar, isi);

    return kartu;
}

function tampilkanKatalog(daftarProduk) {
    if (!daftarKatalog) return;
    daftarKatalog.replaceChildren();

    if (daftarProduk.length === 0) {
        const kosong = document.createElement("p");
        kosong.textContent = "Produk tidak ditemukan. Coba kata kunci lain.";
        daftarKatalog.append(kosong);
    }

    daftarProduk.forEach((produk) => {
        daftarKatalog.append(buatKartu(produk));
    });

    if (infoJumlah) {
        infoJumlah.textContent =
            `Menampilkan ${daftarProduk.length} dari ${katalog.length} produk`;
    }
}

function saringKatalog() {
    const kataKunci = inputCari.value.trim().toLowerCase();

    const hasil = katalog.filter((produk) => {
        const cocokKategori =
            kategoriAktif === "semua" ||
            produk.kategori === kategoriAktif;

        const cocokKata =
            produk.nama.toLowerCase().includes(kataKunci) ||
            produk.deskripsi.toLowerCase().includes(kataKunci);

        return cocokKategori && cocokKata;
    });

    tampilkanKatalog(hasil);
}

if (inputCari) {
    inputCari.addEventListener("input", saringKatalog);
}

tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", () => {
        kategoriAktif = tombol.dataset.kategori;

        tombolFilter.forEach((t) => {
            t.classList.remove("aktif");
            t.setAttribute("aria-pressed", "false");
        });

        tombol.classList.add("aktif");
        tombol.setAttribute("aria-pressed", "true");

        saringKatalog();
    });
});

tampilkanKatalog(katalog);