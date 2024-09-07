import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApolloError, useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../../mutations/authMutations';
import AuthHelper from '../../helpers/AuthHelper';

export default function SignUpPage() {
    const [username, setUsername] = useState<String | undefined>('')
    const [signUpError, setSignUpError] = useState<String | undefined>('')
    const [password, setPassword] = useState<String | undefined>('')
    const [repeatPassword, setRepeatPassword] = useState<String | undefined>('')
    const [signUp, { error }] = useMutation(SIGN_UP_MUTATION)
    let navigate = useNavigate()

    // Check if user already logged in
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const jwtTokenExpiry = localStorage.getItem('jwtTokenExpiry');

        if (token != null && token != undefined && token != "" &&
            jwtTokenExpiry != null && jwtTokenExpiry != undefined && jwtTokenExpiry != "") {
            navigate('/');
            return;
        }
    }, []);

    const handleSignUp = async () => {
        if (password !== repeatPassword) {
            setSignUpError("Passwords must match!")
            return
        }

        try {
            const { data } = await signUp({ variables: { username, password } })
            AuthHelper.setUserSessionAfterSignUp(data, navigate);
        }
        catch (error) {
            if (error instanceof ApolloError) {
                console.error('GraphQL errors:', error.graphQLErrors)
                console.error('Network error:', error.networkError)
            } else {
                console.error('SignUp error:', error)
            }
        }
    };

    return (
        <section className="sign-up">
            <p className="error">{signUpError}</p>
            <h1 className="title">
                Sign up
            </h1>
            {error != undefined ?
                <div className="error-message">
                    {error.message}
                </div>
                : null}
            <section className="sign-up-form" onSubmit={handleSignUp}>
                <input
                    required
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    required
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <input
                    required
                    placeholder="repeatpassword"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    type="password"
                />
                <button
                    onClick={() => handleSignUp()}
                >
                    Sign Up
                </button>
                <section className="already-have-account">
                    <p>Already have an account?</p>
                    <button
                        className="go-to-sign-in"
                        onClick={() => navigate("/signin")}>
                        Sign in
                    </button>
                </section>
            </section>
        </section>)
}