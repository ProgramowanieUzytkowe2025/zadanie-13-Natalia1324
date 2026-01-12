import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TabelaKursowa() {
  const [rates, setRates] = useState([]);
  const [table, setTable] = useState("A");

  useEffect(() => {
    fetch(`https://api.nbp.pl/api/exchangerates/tables/${table}?format=json`)
      .then(res => res.json())
      .then(data => setRates(data[0].rates));
  }, [table]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Tabela kursów walut NBP</h2>

      <label>
        Wybierz tabelę:
        <select value={table} onChange={e => setTable(e.target.value)}>
          <option value="A">Tabela A</option>
          <option value="B">Tabela B</option>
          <option value="C">Tabela C</option>
        </select>
      </label>

      <br /><br />

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Waluta</th>
            <th>Kod</th>
            {table === "C" ? (
              <>
                <th>Kupno</th>
                <th>Sprzedaż</th>
              </>
            ) : (
              <th>Kurs średni</th>
            )}
          </tr>
        </thead>

        <tbody>
          {rates.map(r => (
            <tr key={r.code}>
                <td>
                    <Link to={`/tabela-kursowa/${table}/${r.code}`}>
                    {r.currency}
                    </Link>
                </td>
                <td>{r.code}</td>
                {table === "C" ? (
                    <>
                    <td>{r.bid}</td>
                    <td>{r.ask}</td>
                    </>
                ) : (
                    <td>{r.mid}</td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
