import { Link } from "react-router-dom";


function Home() {
    return (
        <>
            <h1>home</h1>
            <button><Link to={'/login'}>login</Link></button>
            <button><Link to={'/signup'}>signup</Link></button>
            <Link to={'/mypage'}>mypage</Link>
        </>
    );
}

export default Home;