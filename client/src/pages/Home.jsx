import HeroCarousel from '../components/common/Home/HeroCarousel'
import ProductsList from '../components/common/Home/ProductsList'
import Slogans from '../components/common/Home/Slogans'
import Reviews from '../components/common/Home/Reviews'

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <HeroCarousel />
      <ProductsList/>
      <Slogans/>
      <Reviews/>
    </div>
  )
}

export default Home
