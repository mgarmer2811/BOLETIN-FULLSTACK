export default function Header() {
    return (
        <header className={headerStyle}>
            <div className={logoStyle}>My Logo</div>
            <nav className={navStyle}>
                <a href="" className={linkStyle}>
                    Home
                </a>
                <a href="" className={linkStyle}>
                    About
                </a>
                <a href="" className={linkStyle}>
                    Contact
                </a>
            </nav>
        </header>
    );
}
