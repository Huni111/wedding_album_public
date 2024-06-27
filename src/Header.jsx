import { Link } from 'react-router-dom'


export default function Header() {
    return (
        <>
            <div className='header_wrapper'>
                <h1 className='title'>Hunor & Krisztina</h1>
                <nav>
                    <ul>
                    <Link to='/list'> <li className='menu'>Kepek</li></Link>
                    <Link to='/'><li className='menu'>Feltoltes</li></Link>
                    </ul>
                </nav>
            </div>
        </>
    )
}