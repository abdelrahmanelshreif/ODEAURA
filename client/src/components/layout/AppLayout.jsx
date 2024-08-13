import { Helmet } from 'react-helmet'

import MainHeader from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth'
import authAPI from '../../api/AuthAPI'
function AppLayout({ title, description }) {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await authAPI.verifyUser() // this is user -> GET me
        setAuth({
          ...auth,
          user: res,
        })
      } catch (err) {
        console.log(err)
      }
    }
    checkUser()
  }, [navigate])

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

AppLayout.defultProps = {
  title: 'ODEAURA | Ecommerce',
  description: 'Perfumes Ecommerce website',
}

export default AppLayout
