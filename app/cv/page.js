export default function HalamanCV() {
    const nama = "Bhayu Satria Sugara";
    const kelasInput = "w-full rounded-lg border border-slate-300 px-3 py-2";

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
            <header className="bg-teal-800 text-white">
                <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold md:text-4xl">{nama}</h1>
                        <p className="text-teal-100">Junior Programmer</p>
                    </div>
                    <nav className="flex flex-wrap gap-4 text-sm">
                        <a href="#tentang" className="hover:underline">Tentang</a>
                        <a href="#pendidikan" className="hover:underline">Pendidikan</a>
                        <a href="#keahlian" className="hover:underline">Keahlian</a>
                        <a href="#pengalaman" className="hover:underline">Pengalaman</a>
                        <a href="#kontak" className="hover:underline">Kontak</a>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-4xl space-y-12 px-4 py-10">
                <section id="tentang" className="flex flex-col gap-6 md:flex-row md:items-center">
                    <figure className="shrink-0">
                        <img
                            src="/foto.jpg"
                            alt={`Foto ${nama} memakai kemeja biru`}
                            width={160}
                            height={160}
                            className="h-40 w-40 rounded-full object-cover"
                        />
                        <figcaption className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
                            {nama}, Samarinda
                        </figcaption>
                    </figure>
                    <div>
                        <h2 className="mb-2 text-2xl font-bold">Tentang Saya</h2>
                        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                            Saya mahasiswa <strong>D4 Teknik Rekayasa Perangkat Lunak</strong> yang sedang mempersiapkan
                            sertifikasi <em>Junior Programmer</em>. Saya senang membuat aplikasi web yang
                            rapi dan mudah dipakai.
                        </p>
                    </div>
                </section>

                <section id="pendidikan">
                    <h2 className="mb-4 text-2xl font-bold">Riwayat Pendidikan</h2>
                    <table className="w-full overflow-hidden rounded-lg border border-slate-200 text-left">
                        <caption className="mb-2 text-left text-sm text-slate-600 dark:text-slate-300">
                            Pendidikan formal
                        </caption>
                        <thead className="bg-slate-100 dark:bg-slate-800">
                            <tr>
                                <th className="px-4 py-2">Jenjang</th>
                                <th className="px-4 py-2">Institusi</th>
                                <th className="px-4 py-2">Tahun Lulus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-slate-200">
                                <td className="px-4 py-2">SMK</td>
                                <td className="px-4 py-2">SMK Negeri 7 Samarinda</td>
                                <td className="px-4 py-2">2025</td>
                            </tr>
                            <tr className="border-t border-slate-200">
                                <td className="px-4 py-2">D4</td>
                                <td className="px-4 py-2">Politeknik Pertanian Negeri Samarinda</td>
                                <td className="px-4 py-2">2025-Present</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section id="keahlian">
                    <h2 className="mb-4 text-2xl font-bold">Keahlian</h2>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>
                            Pemrograman web
                            <ul className="list-[circle] pl-6">
                                <li>HTML, JSX,Tailwind CSS, PHP, Laravel, Git, Github</li>
                                <li>JavaScript dasar</li>
                            </ul>
                        </li>
                        <li>Microsoft Office</li>
                        <li>Bahasa Inggris (beginner)</li>
                    </ul>
                </section>

                <section id="pengalaman">
                    <h2 className="mb-4 text-2xl font-bold">Pengalaman</h2>
                    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h3 className="text-lg font-semibold">Magang — PT Mahakam Indonusa</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Juli–Desember 2025</p>
                        <ol className="mt-3 list-decimal space-y-1 pl-6">
                            <li>Mermbuat Website Company Profile</li>
                            <li>Membantu Invoicing Perusahaan</li>
                        </ol>
                    </article>
                </section>

                <section id="video">
                    <h2 className="mb-4 text-2xl font-bold">Video Perkenalan</h2>
                    <video src="/perkenalan.mp4" controls className="w-full max-w-xl rounded-lg">
                        Browser Anda tidak mendukung video.
                    </video>
                </section>

                <section id="kontak">
                    <h2 className="mb-4 text-2xl font-bold">Hubungi Saya</h2>
                    <form className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                            <label htmlFor="nama" className="block text-sm font-semibold">Nama</label>
                            <input type="text" id="nama" name="nama" required className={kelasInput} />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                            <input type="email" id="email" name="email" required className={kelasInput} />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label htmlFor="subjek" className="block text-sm font-semibold">Subjek</label>
                            <select id="subjek" name="subjek" className={kelasInput}>
                                <option value="kerja">Tawaran kerja</option>
                                <option value="proyek">Kerja sama proyek</option>
                                <option value="lain">Lainnya</option>
                            </select>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label htmlFor="pesan" className="block text-sm font-semibold">Pesan</label>
                            <textarea id="pesan" name="pesan" rows={4} required className={kelasInput}></textarea>
                        </div>
                        <button type="submit" className="rounded-lg bg-teal-700 px-4 py-2.5 font-semibold text-white hover:bg-teal-800 md:col-span-2">
                            Kirim
                        </button>
                    </form>
                </section>
            </main>

            <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <p>&copy; 2026 {nama}. Email: bhayuusatriaa@gmail.com</p>
            </footer>
        </div>
    );
}
