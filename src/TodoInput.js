import React,{Component} from 'react';

class TodoInput extends React.Component{
    render(){
        return <input type="text" value={this.props.content}
         className="TodoInput" 
        onChange={this.changeTitle.bind(this)} 
        onKeyPress={this.submit.bind(this)}/>
        
}

    submit(e){
      if (e.key === 'Enter') {
        // this.props.onSubmit.call()
        this.props.onSubmit(e)
      }
    }

    changeTitle(e){
      this.props.onChange(e)
  }



    toggle(e, todo){
         todo.status = todo.status === 'completed' ? '' : 'completed'
         this.setState(this.state) 
  }
}
export default TodoInput
