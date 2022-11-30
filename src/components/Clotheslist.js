import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Clotheslist extends Component {


  render() {
    return (
      <div className='product-list'>
        <h1>I am the clothes list</h1>
        <div className='wrapper'>
          {this.props.products.map((product,i) => {
            if(product.category==="clothes"){
              return(
                <div key={i} className='card'>
                  <div className='prod-img'><Link to={`/description/${product.id}`}><img src={product.gallery[0]} width="100%" height="100%" alt={product.name}/></Link></div>
                  <div className='prod-title'>{product.name}</div>
                  <div className='prod-price'>${product.prices[0].amount}</div>
                </div>
              )}
            return null
          })}   
        </div>
      </div>
    )
  }
}
