import { Link } from 'react-router-dom'
import { fullLogo } from '../../assets'
// Icons
import { Facebook, TikTok, Instagram, LinkedIn } from 'iconoir-react'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center py-4 w-full" style={{ backgroundColor: '#FCFCFC', color: '#00000F' }}>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <Link className="hover:text-gray-300 text-sm" to="/">
          <b>
            Home
          </b>
        </Link>
        <Link className="hover:text-gray-300 text-sm" to="/categories">
          <b>
          Categories
          </b>
        </Link>
        <Link className="hover:text-gray-300 text-sm" to="/about">
          <b> 
          About Us
          </b>
        </Link>
        <Link className="hover:text-gray-300 text-sm" to="/contact">
          <b>
          Contact Us
          </b>        
        </Link>
      </div>

      <img src={fullLogo} alt="logo" className="w-56 mb-4" />

      <div className="flex justify-center gap-4 mb-4">
        <Link
          to="https://facebook.com"
          className="footericon hover:text-gray-600 transition-colors duration-300"
        >
          <Facebook />
        </Link>
        <Link
          to="https://tiktok.com"
          className="footericon hover:text-gray-600 transition-colors duration-300"
        >
          <TikTok />
        </Link>
        <Link
          to="https://instagram.com"
          className="footericon hover:text-gray-600 transition-colors duration-300"
        >
          <Instagram />
        </Link>
      </div>

      <div className="text-center text-xs">
        <p><b>© {new Date().getFullYear()} ODEAURA. All rights reserved.</b></p>
        <p className="mt-1"><b>

          Designed and Developed by <a href="https://www.linkedin.com/in/abdelrahman-mohamed-0781a3217/" className="hover:text-gray-300">ODEAURA Dev.</a>
        </b>
        </p>
      </div>
    </footer>
  )
}

export default Footer
