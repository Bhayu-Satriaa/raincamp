function Salam({ nama, umur }) {
  const statusUmur =
    umur >= 17 ? "kamu sudah cukup umur" : "kamu belum cukup umur";

  return (
    <p>Halo, selamat datang {nama}, umur kamu {umur} tahun, dan {statusUmur} </p>
  )
}

function Header() {
  return <h2>Data Nilai Siswa</h2>
}

function ProfilSiswa({ nama, kelas }) {
  return (
    <div>
      <p>Nama: {nama}</p>
      <p>Kelas: {kelas}</p>
    </div>
  )
}

function Pesan({ lulus }) {
  return (
    <p>
      {lulus ? "Selamat anda lulus" : "maaf anda belum lulus"}
    </p>
  )
}

function HasilUjian({ nilai }) {
  const lulus = nilai >= 80;
  const status = lulus ? "lulus" : "belum lulus"

  return (
    <div>
      <p>nilai: {nilai}</p>
      <p>status: {status}</p>
      <Pesan lulus={lulus} />
    </div>
  );

}

function App() {

  const nama = "Siti";
  const kelas = "XI RPL 1";
  const nilai = "84";
  return (
    <div>
      <Salam nama="Andi" umur={20} />
      <Salam nama="Budi" umur={15} />
      <hr />
      <Header />
      <ProfilSiswa nama={nama} kelas={kelas} />
      <HasilUjian nilai={nilai} />
      <p>
        {nama} dari kelas {kelas} memperoleh nilai {nilai}
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
