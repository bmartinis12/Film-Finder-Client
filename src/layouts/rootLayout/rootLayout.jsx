import { Link, Outlet } from 'react-router-dom';
import './rootLayout.scss';
import SearchBar from "../../components/searchbar/searchbar";
import SidePanel from '../../components/sidePanel/sidePanel';

export default function RootLayout() {
    return (
        <div className='root-layout'>
            <header>
                <div className='logo'>
                    <Link to='/'>
                        <i className="fa-solid fa-film white"></i>
                    </Link>
                </div>
                <SearchBar />
            </header>
            <main>
                <SidePanel />
                <div className="scene-container">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}