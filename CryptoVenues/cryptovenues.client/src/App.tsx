import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import VenuesPage from './pages/VenuesPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/signIn" element={<SignInPage />} />
                <Route path="/venues/:category" element={<VenuesPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;