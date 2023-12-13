import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <center>
            <h1>T'ha pers.</h1>
            <p>torna alla pagina di <Link to='/auth/login'>login</Link></p>
            </center>
        </div>
    )
}