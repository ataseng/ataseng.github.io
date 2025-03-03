import React from 'react'

const HomeBilboardElement = ({item, index, boardLength}) => {
    return (
        <>
            <div className={`board ${index === 0 ? 'first' : ''}`}>
                {item.name}
            </div>
            <div className={`divider-line ${index === boardLength - 1 ? 'disable' : ''} `}></div>
        </>
    )
}

export default HomeBilboardElement