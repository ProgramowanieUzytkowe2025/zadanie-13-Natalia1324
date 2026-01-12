import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function CenaZlota() {
    const [price, setPrice] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch("https://api.nbp.pl/api/cenyzlota?format=json")
        .then(res => res.json())
        .then(data => setPrice(data[0]));

        fetch("https://api.nbp.pl/api/cenyzlota/last/30?format=json")
        .then(res => res.json())
        .then(data => setHistory(data));
    }, []);

    const chartData = {
        labels: history.map(item => item.data),
        datasets: [
        {
            label: "Cena złota (PLN)",
            data: history.map(item => item.cena),
            borderColor: "gold",
            tension: 0.3
        }
        ]
    };

    return (
        <div style={{ padding: 16 }}>
        <h2>Cena złota</h2>

        {price && (
            <p>
            <strong>Aktualna cena:</strong> {price.cena} PLN
            ({price.data})
            </p>
        )}

        <h3>Zmiana ceny złota – ostatnie 30 dni</h3>

        {history.length > 0 && (
            <Line data={chartData} />
        )}
        </div>
    );
}
