import { Link } from "react-router-dom";
import React, { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        document.title = 'Your Secure Weather | Not found';
      }, []);
    return (
        <div>
            <center>
            <h1>You're Lost.</h1>
            <p>after pressing this: <Link to='/auth/login'>login</Link>, you'll be redirected to the login page</p>
            </center>
        </div>
    )
}