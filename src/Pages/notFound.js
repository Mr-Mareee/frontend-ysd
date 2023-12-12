import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>T'ha pers.</h1>
            <p>torna alla home:</p>
            <Link to='/'>Home</Link>
        </div>
    )
}