// Component App menyusun tampilan.
// <Salam /> dipakai seperti tag HTML, dan bisa dipakai berkali-kali.
function SalamSatu({ nama, alamat }) {
  return (
    <h2>
      Halo {nama} yang ada di {alamat}
    </h2>
  );
}

function SalamDua() {
  return <h2>Apa kabar?</h2>;
}

function App() {
  return (
    <div>
      <SalamSatu nama="Andi" alamat="Jakarta" />
      <SalamDua />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
