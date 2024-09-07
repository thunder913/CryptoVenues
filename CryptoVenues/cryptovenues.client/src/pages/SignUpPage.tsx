import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApolloError, useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../mutations/authMutations';

export default function SignUpPage() {
    const [showPage, setShowPage] = useState(false);
    const [signUp, { error }] = useMutation(SIGN_UP_MUTATION);
    let navigate = useNavigate();

    // Check if user already logged in
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const jwtTokenExpiry = localStorage.getItem('jwtTokenExpiry');

        if (token != null && token != undefined && token != "" &&
            jwtTokenExpiry != null && jwtTokenExpiry != undefined && jwtTokenExpiry != "") {
            navigate('/');
            return;
        }

        setShowPage(true);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const { data } = await signUp({ variables: { username, password } });
            localStorage.setItem('username', data.signUp.username);
            localStorage.setItem('jwtToken', data.signUp.token);
            localStorage.setItem('jwtTokenExpiry', data.signUp.tokenExpiry);
            navigate('/');
        }
        catch (error) {
            if (error instanceof ApolloError) {
                console.error('GraphQL errors:', error.graphQLErrors);
                console.error('Network error:', error.networkError);
            } else {
                console.error('SignUp error:', error);
            }
        }
    };

    return showPage ? (
        <section className="sign-up">
            <h1 className="title">
                Sign up
            </h1>
            {error != undefined ?
                <div className="error-message">
                    {error.message}
                </div>
                : null}
            <form onSubmit={handleSubmit}>
                <input
                    required
                    id="username"
                    name="username"
                    autoComplete="username"
                />
                <input
                    required
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
                <input
                    required
                    name="repeatpassword"
                    type="password"
                    id="repeatpassword"
                    autoComplete="new-password"
                />
                <button
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </section>) : <></>;
}