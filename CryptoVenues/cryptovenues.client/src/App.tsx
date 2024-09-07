import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUp/SignUpPage';
import HomePage from './pages/Home/HomePage';
import SignInPage from './pages/SignIn/SignInPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/signIn" element={<SignInPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;