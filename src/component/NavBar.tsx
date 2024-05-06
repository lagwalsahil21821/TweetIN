import { Link } from 'react-router-dom'
export const NavBar = () => {
    return <div style={{
        backgroundColor: "#d3d3d3",
        height: "2rem", display: 'flex', justifyContent: "space-around"
    }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
    </div>
}