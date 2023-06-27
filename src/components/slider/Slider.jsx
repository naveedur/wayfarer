import {useState, useEffect} from 'react'
import './slider.css'
import { Link } from 'react-router-dom'

const Slider = () => {
  const PF="http://localhost:3000/assets/"
  
  const slides = [
    { url: "http://localhost:3000/assets/slider/slider1.jpg", type:'zoo'},
    { url: "http://localhost:3000/assets/slider/slider2.jpg", type:'river'},
    { url: "http://localhost:3000/assets/slider/slider3.jpg", type:'jungle'},
    { url: "http://localhost:3000/assets/slider/slider4.jpg", type:'jungle'},
  ]
  const [slideIndex, setSlideIndex]=useState(0)
  const goToPrevious=()=>{
    const newIndex= slideIndex===0 ? slides.length - 1 : slideIndex - 1;
    setSlideIndex(newIndex)
    document.querySelector(".leftArrow").classList.remove("slide-in-left");
    console.log(newIndex)
  }
  const goToNext=()=>{
    console.log("next button is running")
    const newIndex= slideIndex===slides.length -1 ? 0 : slideIndex + 1;
    setSlideIndex(newIndex)
    document.querySelector(".rightArrow").classList.remove("slide-in-right");
    console.log(newIndex)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex= slideIndex===slides.length -1 ? 0 : slideIndex + 1;
      setSlideIndex(newIndex)
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