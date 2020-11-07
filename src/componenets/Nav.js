import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <Link to="hello">Hello</Link>
            <Link to="world">World</Link>
        </div>
    );
}

export default Nav;