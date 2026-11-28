import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { daftarBarang } from "@/lib/data-barang";
import { KeranjangProvider, useKeranjang } from "@/context/KeranjangContext";
import LabelStok from "@/components/LabelStok";
import Paginasi from "@/components/Paginasi";
import PilihBarang from "@/components/kasir/PilihBarang";
import Keranjang from "@/components/kasir/Keranjang";
import RingkasanBelanja from "@/components/kasir/RingkasanBelanja";
import FormPembayaran from "@/components/kasir/FormPembayaran";

function renderKasir() {
  return render(
    <KeranjangProvider>
      <PilihBarang daftar={daftarBarang} />
      <Keranjang />
      <RingkasanBelanja />
    </KeranjangProvider>,
  );
}

describe("LabelStok", () => {
  it.each([
    [0, "Stok habis"],
    [5, "Menipis: 5"],
    [25, "Stok 25"],
  ])("stok %i merender teks %s", (stok, teks) => {
    render(<LabelStok stok={stok} />);
    expect(screen.getByText(teks)).toBeInTheDocument();
  });
});

describe("Paginasi", () => {
  it("tidak merender navigasi bila totalHalaman <= 1", () => {
    render(<Paginasi halaman={1} totalHalaman={1} onPindah={vi.fn()} />);
    expect(screen.queryByRole("navigation", { name: "Halaman" })).not.toBeInTheDocument();
  });

  it("menonaktifkan Sebelumnya di halaman 1 dan menandai halaman aktif dengan aria-current", () => {
    render(<Paginasi halaman={1} totalHalaman={3} onPindah={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Sebelumnya/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: /Berikutnya/ })).not.toBeDisabled();
  });

  it("menonaktifkan Berikutnya di halaman terakhir dan memanggil onPindah saat nomor diklik", async () => {
    const user = userEvent.setup();
    const onPindah = vi.fn();
    render(<Paginasi halaman={3} totalHalaman={3} onPindah={onPindah} />);

    expect(screen.getByRole("button", { name: /Berikutnya/ })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(onPindah).toHaveBeenCalledWith(2);
  });
});

describe("Integrasi Kasir dalam KeranjangProvider", () => {
  it("useKeranjang di luar KeranjangProvider melempar galat", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function TanpaProvider() {
      useKeranjang();
      return null;
    }
    expect(() => render(<TanpaProvider />)).toThrow("KeranjangProvider");
    spy.mockRestore();
  });

  it("menampilkan pesan keranjang kosong pada awal tampilan", () => {
    renderKasir();
    expect(screen.getByText("Keranjang masih kosong.")).toBeInTheDocument();
  });

  it("menambah barang memperbarui keranjang, sisa stok, dan info diskon berikutnya", async () => {
    const user = userEvent.setup();
    renderKasir();

    await user.click(screen.getByRole("button", { name: "Tambah Sabun Cuci Piring ke keranjang" }));
    expect(screen.queryByText("Keranjang masih kosong.")).not.toBeInTheDocument();
    expect(screen.getByText(/sisa 21 botol/)).toBeInTheDocument();
    expect(screen.getByText(/Belanja .* lagi untuk diskon 5%/)).toBeInTheDocument();
  });

  it("menonaktifkan tombol tambah untuk barang habis atau saat sisa mencapai 0", async () => {
    const user = userEvent.setup();
    renderKasir();

    expect(screen.getByRole("button", { name: "Tambah Pensil 2B ke keranjang" })).toBeDisabled();

    const tombolPasta = screen.getByRole("button", { name: "Tambah Pasta Gigi ke keranjang" });
    await user.click(tombolPasta);
    await user.click(tombolPasta);
    await user.click(tombolPasta);
    expect(tombolPasta).toBeDisabled();
  });

  it("menyaring daftar barang lewat input pencarian dan menampilkan pesan kosong", async () => {
    const user = userEvent.setup();
    renderKasir();

    await user.type(screen.getByLabelText("Cari barang"), "barang-tidak-ada");
    expect(screen.getByText("Tidak ada barang yang cocok.")).toBeInTheDocument();
  });

  it("menghapus barang dari keranjang mengembalikan pesan kosong", async () => {
    const user = userEvent.setup();
    renderKasir();

    await user.click(screen.getByRole("button", { name: "Tambah Sabun Cuci Piring ke keranjang" }));
    await user.click(screen.getByRole("button", { name: "Hapus Sabun Cuci Piring dari keranjang" }));
    expect(screen.getByText("Keranjang masih kosong.")).toBeInTheDocument();
  });

  it("UJ-33 (Regresi): mengosongkan kolom jumlah lalu mengetik 4 mempertahankan baris dan menghitung total Rp 57.000", async () => {
    const user = userEvent.setup();
    renderKasir();

    await user.click(screen.getByRole("button", { name: "Tambah Sabun Cuci Piring ke keranjang" }));
    const inputJumlah = screen.getByLabelText("Jumlah Sabun Cuci Piring");

    await user.clear(inputJumlah);
    await user.type(inputJumlah, "4");

    expect(screen.getByLabelText("Jumlah Sabun Cuci Piring")).toHaveValue(4);
    expect(screen.getByText(/Rp\s?57\.000/)).toBeInTheDocument();
  });
});

describe("FormPembayaran", () => {
  it("menolak uang kurang, memasang aria-invalid, dan tidak memanggil onBayar", async () => {
    const user = userEvent.setup();
    const onBayar = vi.fn();
    render(<FormPembayaran total={58500} nonaktif={false} onBayar={onBayar} />);

    await user.type(screen.getByLabelText("Uang diterima"), "50000");
    await user.click(screen.getByRole("button", { name: /Bayar/ }));

    expect(await screen.findByText("Uang yang dibayar kurang dari total.")).toBeInTheDocument();
    expect(screen.getByLabelText("Uang diterima")).toHaveAttribute("aria-invalid", "true");
    expect(onBayar).not.toHaveBeenCalled();
  });

  it("menampilkan kembalian langsung dan memanggil onBayar saat uang tunai cukup", async () => {
    const user = userEvent.setup();
    const onBayar = vi.fn();
    render(<FormPembayaran total={58500} nonaktif={false} onBayar={onBayar} />);

    await user.type(screen.getByLabelText("Nama pelanggan (opsional)"), "Budi");
    await user.type(screen.getByLabelText("Uang diterima"), "60000");
    expect(screen.getByText(/Rp\s?1\.500/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Bayar/ }));
    await waitFor(() => {
      expect(onBayar).toHaveBeenCalledWith({ pelanggan: "Budi", metode: "tunai", bayar: 60000 });
    });
  });

  it("menyembunyikan kolom Uang diterima saat metode QRIS dipilih dan meloloskan submit", async () => {
    const user = userEvent.setup();
    const onBayar = vi.fn();
    render(<FormPembayaran total={58500} nonaktif={false} onBayar={onBayar} />);

    await user.click(screen.getByLabelText("QRIS"));
    expect(screen.queryByLabelText("Uang diterima")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Bayar/ }));
    await waitFor(() => {
      expect(onBayar).toHaveBeenCalledWith(expect.objectContaining({ metode: "qris" }));
    });
  });
});
