import { RouteComponentProps, withRouter } from "react-router";
import SearchBar from "../search/search-bar";
import './header.scss';

interface HeaderProps extends RouteComponentProps {
}

function Header({ history }: HeaderProps) {
    function handleHomeClick() {
        history.replace('/');
    }

    return (
        <div className="header">
            <SearchBar />
            <button className="header__home" onClick={() => handleHomeClick()}>Home</button>
        </div>
    )
}
export default withRouter(Header);