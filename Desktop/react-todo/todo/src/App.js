import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash)

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       items:[],
       currentItem:{
         text:'',
         key:''
       }
    }
  }

  handleInput = (e)=>
  {
    this.setState(
      {
        currentItem:
        {
          text:e.target.value,
          key:Date.now()
        }
      }
    )
  }
  
  addItem = (e) =>
  {
    e.preventDefault();
    const newItem=this.state.currentItem;
    if(newItem.text!=="")
    {
      //add to list
      const newitems=[...this.state.items,newItem];
      this.setState(
        {
          items:newitems,
          currentItem:
          {
            text:"",
            key:""
          }
        }
      )
    }
  }

  deleteItem = key =>
  {
      const filteredItems = this.state.items.filter(
        item=>item.key!==key
      )

      this.setState(
        {
           items:filteredItems
        }
      )
  }

  update = (value,key) =>
  {
    const items=this.state.items;
    items.map(
          item => {
            if(item.key===key)
            item.text=value
          }
        )
    this.setState(
      {
        items:items
      }
    )
    
  }

  render() {
    return (
     <div className="app">
        <header>
        <form id="to-do">
          <input type="text" placeholder="Enter your task"
          value={this.state.currentItem.text}
          onChange={this.handleInput}></input>
          <button onClick={this.addItem}>Add</button>
        </form>
      </header>
      <ListItem items={this.state.items}
      deleteItem={this.deleteItem}
      update={this.update}/>
     </div>
    )
  }
}



export default App;
