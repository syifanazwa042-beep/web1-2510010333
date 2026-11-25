const ID_KOTA = "2113";
const wadahSalat = document.querySelector("#daftar-salat");
const teksTanggal = document.querySelector("#tanggal-salat");

const DAFTAR_WAKTU = [
    { kunci: "subuh", nama: "Subuh" },
    { kunci: "dzuhur", nama: "Dzuhur" },
    { kunci: "ashar", nama: "Ashar" },
    { kunci: "maghrib", nama: "Maghrib" },
    { kunci: "isya", nama: "Isya" }
];

function tampilkanPesanSalat(pesan) {
    if (!wadahSalat) return;
    const p = document.createElement("p");
    p.className = "pesan-salat";
    p.textContent = pesan;
    wadahSalat.replaceChildren(p);
}

async function muatJadwalSalat() {
    if (!wadahSalat) return;

    const sekarang = new Date();
    const tahun = sekarang.getFullYear();
    const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
    const tanggal = String(sekarang.getDate()).padStart(2, "0");

    const url = `https://api.myquran.com/v2/sholat/jadwal/${ID_KOTA}/${tahun}/${bulan}/${tanggal}`;

    try {
        const respon = await fetch(url);
        if (!respon.ok) throw new Error("Gagal mengambil jadwal salat");

        const hasil = await respon.json();
        if (!hasil.status || !hasil.data || !hasil.data.jadwal) {
            throw new Error("Format data jadwal salat tidak sesuai");
        }

        const jadwal = hasil.data.jadwal;
        if (teksTanggal) {
            teksTanggal.textContent = jadwal.tanggal || `${tanggal}/${bulan}/${tahun}`;
        }

        const kartuWaktu = DAFTAR_WAKTU.map((item) => {
            const kartu = document.createElement("div");
            kartu.className = "kartu-salat";

            const nama = document.createElement("span");
            nama.className = "nama-salat";
            nama.textContent = item.nama;

            const jam = document.createElement("strong");
            jam.className = "jam-salat";
            jam.textContent = jadwal[item.kunci] || "-";

            kartu.append(nama, jam);
            return kartu;
        });

        wadahSalat.replaceChildren(...kartuWaktu);
    } catch (galat) {
        console.error(galat);
        if (teksTanggal) teksTanggal.textContent = "";
        tampilkanPesanSalat("Jadwal salat tidak dapat dimuat saat ini.");
    }
}

muatJadwalSalat();