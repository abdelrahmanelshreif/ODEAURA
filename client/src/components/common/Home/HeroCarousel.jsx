import { Carousel } from '@mantine/carousel'
import { Carousel1, Carousel2, Carousel3 } from './../../../assets'
import { Link } from 'react-router-dom'

const HeroCarousel = () => {
  return (
    <div className="mb-20 mt-12">
      <Carousel
        slideSize="100%"
        height="auto"
        slideGap="md"
        controlsOffset="md"
        controlSize={29}
        loop
        withIndicators
        classNames={{
          indicator: 'bg-primary',
        }}
      >
        <Carousel.Slide className="flex justify-center items-center">
          <Link to="/categories">
            <img className="w-full h-auto max-h-96 object-cover" src={Carousel1} alt="carousel" />
          </Link>
        </Carousel.Slide>
        <Carousel.Slide className="flex justify-center items-center">
          <Link to="/categories">
            <img className="w-full h-auto max-h-96 object-cover" src={Carousel2} alt="carousel" />
          </Link>
        </Carousel.Slide>
        <Carousel.Slide className="flex justify-center items-center">
          <Link to="/categories">
            <img className="w-full h-auto max-h-96 object-cover" src={Carousel3} alt="carousel" />
          </Link>
        </Carousel.Slide>
      </Carousel>
    </div>
  )
}

export default HeroCarousel
