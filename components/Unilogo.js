import React from 'react'

const Unilogo = React.forwardRef(({ onClick, href }, ref) => {
    return (
        <div className="unibutton">
            <img src={'/uni.png'} />
            <a href={href} onClick={onClick} ref={ref}>
                UNINOMICS
      </a>
        </div>
    )
})

export default Unilogo