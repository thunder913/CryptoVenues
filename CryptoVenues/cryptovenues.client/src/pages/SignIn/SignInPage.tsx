import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { SIGN_IN_MUTATION } from "../../mutations/authMutations";
import { useMutation } from "@apollo/client";
import AuthHelper from "../../helpers/AuthHelper";

export default function SignInPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<String | undefined>('');
    const [password, setPassword] = useState<String | undefined>('');
    const [signIn, { error }] = useMutation(SIGN_IN_MUTATION);

    const signInEvent = async () => {
        try {
            const { data } = await signIn({ variables: { username, password } });
            AuthHelper.setUserSessionAfterSignIn(data, navigate);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="sign-in">
            <section className="login">
                <h1 className="title">
                    Login to your account
                </h1>
                {error != undefined ?
                    <div className="error-message">
                        {error.message}
                    </div>
                    : null}
                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" />
                <button onClick={() => signInEvent()}>
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