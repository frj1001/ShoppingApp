import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default class List extends Component {

  

  render() {
    return (
      <div>
        <div className='product-list'>
          <h1>I am the product list</h1>
          <div className='wrapper'>
            {this.props.products.map((product,i) => {
                return(
                  <div key={i} className='card'>
                    <div className='prod-img'><Link to={`/description/${product.id}`}><img src={product.gallery[0]} width="100%" height="100%" alt={product.name}/></Link></div>
                    <div className='prod-title'>{product.name}</div>
                    <div className='prod-price'>${product.prices[0].amount}</div>
                  </div>
                )
            })}   
          <Link to={'/cart'}>Go to Cart</Link>  
          </div>
      </div>
      </div>
    )
  }
}
