import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<String | undefined>('');
    const [password, setPassword] = useState<String | undefined>('');

    const signIn = () => {
        console.log('sign in')
        console.log(username)
        console.log(password)
    }

    return (
        <div className="sign-in">
            <section className="login">
                <h1 className="title">
                    Login to your account
                </h1>
                    <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => signIn()}>
                    Sign in
                </button>
            </section>
            <footer className="footer">
                <p>If you don't have an account create one</p>
                <button onClick={() => navigate("/signup")}>Register</button>
            </footer>
        </div >
    )
}