import React, { Component } from 'react'

class CartItem extends Component {
  render() {
    return (
        <div className='cart-box'>
            <div className='cart-item'>
              <div className='brand' style={{marginBottom: "0.5%", marginTop: "5%"}}>{this.props.brand}</div>
              <div className='pname' style={{marginBottom: "3%"}}>{this.props.name}</div>
              <div className='price-label' style={{marginBottom: "3%"}}>{this.props.symbol}{this.props.amount}</div>
              <div className='psize' style={{marginBottom: "2%"}}>{this.props.size}:</div>
              <div className='s-items' style={{marginBottom: "3%"}}>
                {this.props.attr.map((item,i)=>{
                  return <div className='s-item' key={i}>{item.displayValue}</div>
                })}
              </div>
            </div>
            <div className='cart-details'>
              <div className='cart-counter'>
                <div className='add-remove'>+</div>
                <div className='item-count'>{this.props.count}</div>
                <div className='add-remove'>-</div>
              </div>
              <div className='cart-pic'>
                <div><img src={this.props.image} width='100%' height='100%' alt={this.props.image}/></div>
              </div>
            </div>
      </div>
    )
  }
}

export default CartItem
