import React, { Component } from 'react'
import { get_currency } from '../queries/Query'


export default class Header extends Component {

  constructor(){
    super()


    this.state = {
      isOn: false,
      currencyList : [],
      currencySmybol: '$'
    }

    
  }

  componentDidMount(){
    window.addEventListener('click', this.closeMenu)
    
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.closeMenu)
  }

  closeMenu = e => {
    if((e.composedPath()[0].className !== 'dropdown') && (e.composedPath()[0].className !== 'arrow down')){
      this.setState({
        isOn: false
      })
    } 
  }

  returnCurrency = () => {
    get_currency().then(result => {
      this.setState({
        currencyList: result.data.currencies
      })
    })
  }

  clicked(){
    this.setState({
      isOn: !(this.state.isOn)
  })
    this.returnCurrency()
}

  menuClick(e){
    if(e.target.tagName === 'SPAN'){
      this.setState({
        currencySmybol: e.target.parentElement.lastChild.textContent
      })
    }
    else{
      this.setState({
        currencySmybol: e.target.lastChild.textContent
      })
    }
} 

  
  
  render() {
    return (
      <div className="header">
        <div className='navigation'>
          <span>ALL</span>
          <span>CLOTHES</span>
          <span>TECH</span>
        </div>
        <div className='logo'>
          <img src='https://img.icons8.com/color/344/shopping-bag--v1.png' height={39} width={39} alt='s-logo' />
        </div>
        <div className='actions'>
          <div onClick={()=>this.clicked()} className='dropdown'>{this.state.currencySmybol} <i className='arrow down'></i>
            <div className={`dropdown-content ${this.state.isOn ? "show" : ""}`}>
              {this.state.currencyList.map((currency,i) => {
                return <div key={i} onClick={(e)=>this.menuClick(e)} ><span>{currency.label}</span>
                <span  className='right'>{currency.symbol}</span></div>
              })}
            </div>          
          </div>
            
          <div className='cart-img'>
            <div className="count-box">
              <div className={this.props.counter!==0 ? "count" : null }>{this.props.counter}</div>
            </div>
            <img src='https://img.icons8.com/windows/344/shopping-cart.png' height={25} width={25} alt='c-logo' />
          </div>
        </div>
        

      </div>
    )
  }
}
