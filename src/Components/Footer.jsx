import "../Styles/Footer.css";

const Footer = () =>
{
    return (
        <footer className="footer">
            <span >Copyright © 2023 - </span>
            <a href="https://www.fit.vut.cz/.cs">
                Fakulta informačních technologií VUT v Brně 
            </a>
            {/* přidat logo, */}
        </footer>
    );
};

Footer.propTypes = {}

export default Footer;