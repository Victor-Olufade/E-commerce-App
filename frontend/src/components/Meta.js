import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keyword' content={keywords}/>
        <title>{title}</title>
    </Helmet>
  )
}

Meta.defaultProps= {
    title: 'Welcome to Proshop',
    description: 'Get the best for the cheapest price',
    keywords: 'Buy elctronics, premium, top quality!'
}

export default Meta