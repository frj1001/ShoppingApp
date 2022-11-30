import './App.css';
import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List';
import Description from './components/Description';
import Cart from './components/Cart';
import { Routes, Route } from 'react-router-dom'
import Clotheslist from './components/Clotheslist'
import Techlist from './components/Techlist'
import { get_product } from './queries/Query';


export default class App extends Component {
  constructor(){
    super()

    this.state = {
      productList : [],
      counter: 0,
      cart_items: [],
    }
  }

  componentDidMount(){
    get_product().then(response => {
      this.setState({
        productList: response.data.category.products
      })
    }) 
    
  }

  liftState = (data, passItems)=> {
    this.setState({
      counter: data,
      cart_items: passItems
    })
  }


  render() {
    console.log(this.state.cart_items)    
    return (
      <div className='main'>
        <Header counter={this.state.counter} />
        <Routes>
          <Route path='/' element={<List products={this.state.productList} />} />
          <Route path='/clothes' element={<Clotheslist products={this.state.productList}/>} />
          <Route path='/tech' element={<Techlist products={this.state.productList}/>} />
          <Route path='/description/:id' element={<Description liftstate={this.liftState} />}/>
          <Route path='/cart' element={<Cart cartItems={this.state.cart_items}/>} />
        </Routes>
      </div>
    )
  }
}

