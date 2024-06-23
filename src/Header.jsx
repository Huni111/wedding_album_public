import {Link} from 'react-router-dom'


export default function Header() {
    return(
        <>
            <h1>Hunor es Krisztina</h1>
            <nav>
                <ul>
                    <li><Link to='/list'>Kepek</Link></li>
                    <li><Link to='/'>Feltoltes</Link></li>
                </ul>
            </nav>
        </>
    )
}