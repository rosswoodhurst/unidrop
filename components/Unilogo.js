import React from 'react'

const Unilogo = React.forwardRef(({ onClick, href }, ref) => {
    return (
        <div className="unibutton">
            <img src={'/degenlogo.png'} />
            <a href={href} onClick={onClick} ref={ref}>
                DEGENERATE
      </a>
        </div>
    )
})

export default Unilogo