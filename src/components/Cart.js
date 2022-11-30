import React, { Component } from 'react'
import CartItem from './CartItem'


export default class Cart extends Component {
  

  render() {
    
    return (
      <div className='cart'>
        <h1>CART</h1>
        {this.props.cartItems.map((product)=>{
          return <CartItem key={product.props.name} index={product.props.name} brand={product.props.brand} name={product.props.name}
          symbol={product.props.symbol} amount={product.props.amount} size={product.props.size}
          attr={product.props.attr} image={product.props.image} count={product.props.count}/>
        })}
      </div>
    )
  }
}


