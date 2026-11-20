export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
            <header className="border-b border-slate-200 dark:border-slate-700">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <span className="text-xl font-bold text-teal-700 dark:text-teal-300">
                        KasirKu
                    </span>
                    <nav className="flex gap-4 text-sm md:gap-8">
                        <a href="#fitur" className="hover:text-teal-700">
                            Fitur
                        </a>
                        <a href="#harga" className="hover:text-teal-700">
                            Harga
                        </a>
                        <a href="#kontak" className="hover:text-teal-700">
                            Kontak
                        </a>
                    </nav>
                </div>
            </header>

            <main>
                <section className="bg-teal-50 dark:bg-slate-800">
                    <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:py-24">
                        <p className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-800">
                            Untuk UMKM dan toko kecil
                        </p>
                        <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
                            Catat stok dan penjualan toko dalam satu aplikasi
                        </h1>
                        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                            KasirKu membantu pemilik toko memantau barang, mencatat
                            transaksi, dan melihat laporan harian dari HP maupun laptop.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#harga"
                                className="rounded-lg bg-teal-700 px-6 py-3 text-center font-semibold text-white hover:bg-teal-800"
                            >
                                Coba Gratis 30 Hari
                            </a>
                            <a
                                href="#fitur"
                                className="rounded-lg border border-teal-700 px-6 py-3 text-center font-semibold text-teal-700 hover:bg-teal-50 dark:text-teal-300"
                            >
                                Lihat Fitur
                            </a>
                        </div>
                    </div>
                </section>

                <section id="fitur" className="mx-auto max-w-6xl px-4 py-16">
                    <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                        Fitur Utama
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <article className="rounded-xl border border-slate-200 p-6 shadow-sm dark:border-slate-700">
                            <h3 className="text-lg font-semibold">Stok Otomatis</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                Stok berkurang sendiri setiap kali barang terjual.
                            </p>
                        </article>
                        <article className="rounded-xl border border-slate-200 p-6 shadow-sm dark:border-slate-700">
                            <h3 className="text-lg font-semibold">Kasir Cepat</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                Hitung total, diskon, dan kembalian dalam hitungan detik.
                            </p>
                        </article>
                        <article className="rounded-xl border border-slate-200 p-6 shadow-sm dark:border-slate-700">
                            <h3 className="text-lg font-semibold">Laporan Harian</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                Lihat penjualan, barang terlaris, dan stok menipis.
                            </p>
                        </article>
                    </div>
                </section>

                <section id="harga" className="bg-slate-50 py-16 dark:bg-slate-800">
                    <div className="mx-auto max-w-6xl px-4 text-center">
                        <h2 className="text-2xl font-bold md:text-3xl">
                            Mulai dari Rp49.000 per bulan
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                            Tanpa biaya pemasangan. Berhenti kapan saja.
                        </p>
                    </div>
                </section>
            </main>

            <footer
                id="kontak"
                className="border-t border-slate-200 py-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
                <p>&copy; 2026 KasirKu · halo@kasirku.id · Makassar</p>
            </footer>
        </div>
    );
}
