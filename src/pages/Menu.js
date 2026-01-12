import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
            <NavLink to="/tabela-kursowa" style={{ marginRight: 12 }}>Tabela kursowa</NavLink>
            <NavLink to="/cena-zlota" style={{ marginRight: 12 }}>Cena złota</NavLink>
            <NavLink to="/autor">Autor</NavLink>
        </nav>
    );
}