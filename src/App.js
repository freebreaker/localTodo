import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import "./reset.css";
import "./App.css";
import "./TodoItem.css";
import "./TodoInput.css";
import Sortable from 'sortablejs';

import * as localStore from './localStore';

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello bigbig!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })


class App extends Component {
  // render() {
  //   return (
  //     <div className="App">
  //       <div className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h2>Welcome to React</h2>
  //       </div>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  // }
  constructor(props){
    super(props)
    this.state={
      newTodo:'',
      // todoList:[
      //   // {id:1,title:'第一个待办'},
      //   // {id:2, title:'第二个待办'}
      // ]
       todoList: localStore.load('todoList') || []

    }
  }

  render(){
    let todos=this.state.todoList.filter((item)=> !item.deleted).map((item,index)=>{
      return (<li key={index}>
               
               <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
               onDelete={this.delete.bind(this)}/>
               
            </li>)
    })




    return (
      <div className='App'>
        <h1>我的TODO</h1>
          <div className="inputWarpper">
            <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)} 
            onSubmit={this.addTodo.bind(this)} />
          </div>

        <ol className="todoList" id='sort'>
          {todos}
        </ol>
      </div>  
    )
  }

  componentDidMount() {
      var el = document.getElementById('sort');
         var sortable = Sortable.create(el,{
              animation: 100
         });
      }
  componentDidUpdate(){
     localStore.save('todoList',this.state.todoList)
  }



       delete(event, todo){
        todo.deleted = true
        this.setState(this.state) 
        // localStorage.save('todoList',this.state.todoList)
    }

      toggle(e, todo){
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state)
        //localStorage.save('todoList',this.state.todoList) 
    }



     changeTitle(event){
      this.setState({
        newTodo: event.target.value,
        todoList: this.state.todoList
      })
      //localStorage.save('todoList',this.state.todoList)
    }


  // addTodo(){
  //   console.log('我得添加一个todo了')
  // }
   addTodo(event){
     console.log('我得添加一个todo了')
      this.state.todoList.push({
        id: idMaker(),
        title: event.target.value,
        status: null,
        deleted: false
      })
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
     // localStorage.save('todoList',this.state.todoList)
  }


}


let id=0
function idMaker() {
  id +=1
  return id
}




export default App;
