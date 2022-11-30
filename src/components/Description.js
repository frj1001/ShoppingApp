import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import { client } from '..'
import { gql } from '@apollo/client'
import parse from 'html-react-parser'
import CartItem from './CartItem'



function withParams(Component) {
    return props => <Component params={useParams()} liftstate={props.liftstate}
     />
}

class Description extends Component {

  constructor(){
    super()

    this.state = {
      productGallery : [],
      mainImage : null,
      currentImage: null,
      brand: "",
      productName: "",
      productSize: "",
      sizeItems: [],
      priceSymbol: "",
      priceAmount:"",
      prodDescription: "",
      cartItems: JSON.parse(localStorage.getItem('cart-items')) || [],
      count: JSON.parse(localStorage.getItem('count')) || 0,
      local_count: 0,
    }
    
  }

    componentDidMount(){
        const {id} = this.props.params
        this.fetchdata(id)
    }

    fetchdata = (id) => client.query({
      query: gql`
      query{
        product(id:"${id}"){
          name
          gallery
          description
          brand
          prices{
            currency{
              symbol
            }
            amount
          }
          attributes{
            id
            name
            type
            items{
              displayValue
              value
              id
            }
          }
        }
        }
      `
    })
    .then(response => {
      this.setState({
        productGallery: response.data.product.gallery,
        mainImage: response.data.product.gallery[0],
        brand: response.data.product.brand,
        productName: response.data.product.name,
        productSize: response.data.product.attributes[0].name,
        sizeItems: response.data.product.attributes[0].items,
        priceSymbol: response.data.product.prices[0].currency.symbol,
        priceAmount: response.data.product.prices[0].amount,
        prodDescription: response.data.product.description,
      })
    })

    displayImage(e){
      this.setState({
        currentImage: e.target.src
      })
    }

    passData(){   
      localStorage.setItem('count', JSON.stringify(this.state.count + 1)) 
      this.setState({
        count: this.state.count + 1,
        local_count: this.state.local_count + 1
      })
      
      const duplicate = this.state.cartItems.some(item=>{
        if(item.props.name===this.state.productName){
          return true
        }
        return false
      })
      console.log(duplicate)
      if(duplicate!==true){
        localStorage.setItem('cart-items', JSON.stringify(this.state.cartItems.concat(this.get_item())) )
        
        this.setState({
          cartItems: this.state.cartItems.concat(this.get_item())
        })
      }else{
        this.state.cartItems.map((data,i)=>{
          if(data.props.name===this.state.productName){
            const index = this.state.cartItems
            index[i] = this.get_item()
            this.setState({
              cartItems: index
            })
            localStorage.setItem('local-count', JSON.stringify(this.state.local_count+1))
          }
          return null
        })
        localStorage.setItem('cart-items', JSON.stringify(this.state.cartItems) )
        
      }

      if(this.state.cartItems===[] || duplicate===false){
        this.props.liftstate(this.state.count+1, this.state.cartItems.concat(this.get_item()))
      }else {
        this.props.liftstate(this.state.count+1, this.state.cartItems)
      }
    }

    get_item = () => {
      return <CartItem brand={this.state.brand} name={this.state.productName} 
        symbol={this.state.priceSymbol} amount={this.state.priceAmount} size={this.state.productSize}
        attr={this.state.sizeItems} image={this.state.mainImage} 
        count={this.update_count() || this.state.local_count+1}/>
    }

  
  render() {
    return (
      <div>
        <div className='description'>
          <div className='thumbs'>
              {this.state.productGallery.map((item,i)=>{
                return <div onClick={(e)=> this.displayImage(e)} key={i}>
                  <img src={item} width='100%' height='100%' alt={item}/></div>
              })}
          </div>

          <div className='lg-img'>
            <img src={this.state.currentImage===null ? this.state.mainImage : this.state.currentImage} width='100%' height='100%' 
            alt={this.state.mainImage}/></div>
          
          <div className='details'>
            <div className='brand'>{this.state.brand}</div>
            <div className='pname'>{this.state.productName}</div>
            <div className='psize'>{this.state.productSize}:</div>
            <div className='s-items'>
              {this.state.sizeItems.map((item,i)=>{
                return <div className='s-item' key={i}>{item.displayValue}</div>
              })}
            </div>
            <div className='price-label'>Price:</div>
            <div className='item-price'>{this.state.priceSymbol}{this.state.priceAmount}</div>
            <button onClick={()=>this.passData()} className='cart-btn'>ADD TO CART</button>
            <Link to={'/cart'}>Go to Cart</Link>
            {parse(this.state.prodDescription)}
          </div>
      </div>
      </div>
    )
  }
}

export default withParams(Description)