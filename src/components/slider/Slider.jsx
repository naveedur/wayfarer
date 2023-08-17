import {useState, useEffect,useMemo} from 'react'
import './slider.css'
import { Link } from 'react-router-dom'

const Slider = () => {
  const PF="http://localhost:3000/assets/"
  
  const slides = useMemo(
    () => [
      { url: 'assets/slider/slider1.jpg', type: 'zoo' },
      { url: 'assets/slider/slider2.jpg', type: 'river' },
      { url: 'assets/slider/slider3.jpg', type: 'jungle' },
      { url: 'assets/slider/slider4.jpg', type: 'jungle' },
    ],
    []
  );
  const [slideIndex, setSlideIndex]=useState(0)
  const goToPrevious=()=>{
    const newIndex= slideIndex===0 ? slides.length - 1 : slideIndex - 1;
    setSlideIndex(newIndex)
    document.querySelector(".leftArrow").classList.remove("slide-in-left");
  }
  const goToNext=()=>{
    const newIndex= slideIndex===slides.length -1 ? 0 : slideIndex + 1;
    setSlideIndex(newIndex)
    document.querySelector(".rightArrow").classList.remove("slide-in-right");
  }
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIndex]);
  return (
    <div className="slider">
      <div onClick={goToPrevious} className="leftArrow">
          ❰
        </div>
        <div onClick={goToNext} className="rightArrow">
          ❱
        </div>
    <div  className='sliderImage' style=
    {{backgroundImage:`url(${slides[slideIndex].url})`, }}>
      <div className="sliderBox">
        <h4>Discover your</h4>
        <h2>Next amazing travel experience</h2>
        <Link to='trips'><button>pick your Adventure Now</button></Link>
      </div>
    </div>
    </div>
  );
}

export default Slider