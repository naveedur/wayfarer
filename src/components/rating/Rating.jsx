import React from 'react'
import {BsStarHalf,BsStarFill,BsStar} from 'react-icons/bs'

function Rating({value , total}) {
    const iconsStyle = {
        color: "#FFFF00",
        fontSize: "30px",
        marginRight:"5px"
      };
  return (
    <div>
        <span>{total} reviews</span>
        <span style={iconsStyle}>
            {value>=1
                ? <BsStarFill/>
                :value>=0.5
                ? <BsStarHalf/>
                : <BsStar/>
            }
        </span>
        <span style={iconsStyle}>
            {value>=2
                ? <BsStarFill/>
                :value>=1.5
                ? <BsStarHalf/>
                : <BsStar/>
            }
        </span>
        <span style={iconsStyle}>
            {value>=3
                ? <BsStarFill/>
                :value>=2.5
                ? <BsStarHalf/>
                : <BsStar/>
            }
        </span>
        <span style={iconsStyle}>
            {value>=4
                ? <BsStarFill/>
                :value>=3.5
                ? <BsStarHalf/>
                : <BsStar/>
            }
        </span>
        <span style={iconsStyle}>
            {value>=5
                ? <BsStarFill/>
                :value>=4.5
                ? <BsStarHalf/>
                : <BsStar/>
            }
        </span>
        <span>({value.toFixed(1)})</span>
        {/* <span>{text && text}</span> */}
    </div>
  )
}

export default Rating