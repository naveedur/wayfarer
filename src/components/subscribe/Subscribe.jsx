import './subscribe.css'
const Subscribe = () => {
  return (
    <div className='subscribe'>
<div className="container">
    <div className="row">
        <div className="col-12 col-md-7 leftside">
        {/* <h1>hello</h1> */}


            <img src="/assets/slider/slider1.jpg" alt="" />
        </div>
        <div className="col-12 col-md-5 rightside">
            <h5>
                Don't miss out on the adventure subscribe now
            </h5>
            <p>join our community! we will take you on a journey to some of
                the most breathtaking destinations and share captivating stories
                 about many unique places.
            </p>
            <form action="">
                <input id='email' type="email"  placeholder='Enter your Email'/>
                <input id='button' type="submit" value="Submit" />
            </form>
        </div>
    </div>
</div>
    </div>
  )
}

export default Subscribe