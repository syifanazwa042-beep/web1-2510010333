const NOMOR_WA_TOKO = "+git init6287866211066";

const formPesan = document.querySelector("#form-pesan");
const hasilPesan = document.querySelector("#hasil-pesan");

function setGalat(idKolom, pesan) {
    const input = document.querySelector(`#${idKolom}`);
    const kotakGalat = document.querySelector(`#galat-${idKolom}`);
    if (!input || !kotakGalat) return;

    if (pesan) {
        kotakGalat.textContent = pesan;
        input.setAttribute("aria-invalid", "true");
    } else {
        kotakGalat.textContent = "";
        input.removeAttribute("aria-invalid");
    }
}
if (formPesan) {
    formPesan.addEventListener("submit", (event) => {
        event.preventDefault();

        const nama = document.querySelector("#nama").value.trim();
        const wa = document.querySelector("#wa").value.trim();
        const email = document.querySelector("#email").value.trim();
        const produk = document.querySelector("#produk").value;
        const jumlah = Number(document.querySelector("#jumlah").value);
        const pengambilan = document.querySelector('input[name="pengambilan"]:checked')?.value || "Ambil di galeri";
        const catatan = document.querySelector("#catatan").value.trim();
        const setuju = document.querySelector("#setuju").checked;

        let valid = true;

        if (nama.length < 3) {
            setGalat("nama", "Nama lengkap minimal 3 karakter.");
            valid = false;
        } else {
            setGalat("nama", "");
        }

        const polaWa = /^(08|628)[0-9]{8,12}$/;
        if (!polaWa.test(wa)) {
            setGalat("wa", "Masukkan nomor WhatsApp yang valid (contoh: 081234567890).");
            valid = false;
        } else {
            setGalat("wa", "");
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setGalat("email", "Format surel tidak valid.");
            valid = false;
        } else {
            setGalat("email", "");
        }

        if (!produk) {
            setGalat("produk", "Silakan pilih salah satu produk Sasirangan.");
            valid = false;
        } else {
            setGalat("produk", "");
        }

        if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 50) {
            setGalat("jumlah", "Jumlah pesanan harus antara 1 sampai 50.");
            valid = false;
        } else {
            setGalat("jumlah", "");
        }

        if (!setuju) {
            setGalat("setuju", "Centang persetujuan pemrosesan data terlebih dahulu.");
            valid = false;
        } else {
            setGalat("setuju", "");
        }

        if (!valid) return;

        const teksPesan = [
            "Halo *Sasirangan Banua*, saya ingin memesan produk:",
            "",
            `*Nama:* ${nama}`,
            `*No. WA:* ${wa}`,
            `*Surel:* ${email || "-"}`,
            `*Produk:* ${produk}`,
            `*Jumlah:* ${jumlah} pcs`,
            `*Pengambilan:* ${pengambilan}`,
            `*Catatan:* ${catatan || "-"}`,
            "",
            "Mohon info total biaya dan pengirimannya. Terima kasih!"
        ].join("\n");

        const urlWa = `https://wa.me/${NOMOR_WA_TOKO}?text=${encodeURIComponent(teksPesan)}`;
        if (hasilPesan) {
            hasilPesan.hidden = false;
            hasilPesan.replaceChildren();

            const kotak = document.createElement("div");
            kotak.className = "kotak-ringkasan";

            const judul = document.createElement("h3");
            judul.textContent = "Membuka WhatsApp...";

            const info = document.createElement("p");
            info.textContent = `Terima kasih ${nama}, pesan order (${jumlah}x ${produk}) sedang diarahkan ke WhatsApp toko.`;

            const linkWa = document.createElement("a");
            linkWa.href = urlWa;
            linkWa.target = "_blank";
            linkWa.rel = "noopener noreferrer";
            linkWa.textContent = "Klik di sini jika WhatsApp tidak terbuka otomatis";
            linkWa.style.display = "inline-block";
            linkWa.style.marginTop = "0.65rem";
            linkWa.style.fontWeight = "700";
            linkWa.style.color = "#7A1C32";

            kotak.append(judul, info, linkWa);
            hasilPesan.append(kotak);
        }

        window.open(urlWa, "_blank", "noopener,noreferrer");
    });
}