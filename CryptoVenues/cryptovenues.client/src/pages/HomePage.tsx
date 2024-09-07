import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const onLogOut = () => {
        localStorage.setItem('username', "");
        localStorage.setItem('jwtToken', "");
        localStorage.setItem('jwtTokenExpiry', "");
        navigate('/signIn');
    };

    // Check if user already logged in
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        const jwtTokenExpiry = localStorage.getItem('jwtTokenExpiry');

        if (jwtToken == undefined || jwtToken == null || jwtToken == "" ||
            jwtTokenExpiry == undefined || jwtTokenExpiry == null || jwtTokenExpiry == "") {
            navigate('/signIn');
            return;
        }

        const dateNow = new Date();
        if (parseInt(jwtTokenExpiry) < dateNow.getTime()) {
            onLogOut();
            return;
        }

        //setCategories();
    }, []);

    return (
        <div>
            Home Page
        </div >
    )
}