let katalog = [];

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

function tampilkanStatus(pesan, denganTombolUlang = false) {
    if (!daftarKatalog) return;

    const wadah = document.createElement("div");
    wadah.className = "keadaan-katalog";

    const teks = document.createElement("p");
    teks.textContent = pesan;
    wadah.append(teks);

    if (denganTombolUlang) {
        const tombol = document.createElement("button");
        tombol.type = "button";
        tombol.className = "tombol-ulang";
        tombol.textContent = "Muat Ulang";
        tombol.addEventListener("click", muatKatalog);
        wadah.append(tombol);
    }

    daftarKatalog.replaceChildren(wadah);
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
    const kataKunci = inputCari ? inputCari.value.trim().toLowerCase() : "";

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

async function muatKatalog() {
    if (infoJumlah) infoJumlah.textContent = "";
    tampilkanStatus("Memuat katalog produk...");

    try {
        const respon = await fetch("data/katalog.json");
        if (!respon.ok) {
            throw new Error(`HTTP ${respon.status}`);
        }

        const data = await respon.json();
        if (!Array.isArray(data)) {
            throw new Error("Format data katalog tidak valid");
        }

        katalog = data;
        saringKatalog();
    } catch (galat) {
        console.error(galat);
        tampilkanStatus("Gagal memuat data katalog. Periksa koneksi lalu coba lagi.", true);
    }
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

muatKatalog();