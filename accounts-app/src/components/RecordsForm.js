import React, { Component } from 'react';



export default class RecordForm extends Component {

    constructor(props){
        super(props);
        this.state ={
            date:"",
            title:"",
            amount:""
        }

    }

    valid(){
        return this.state.amount && this.state.data && this.state.amount;
    }

    handleChange(event){
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj[""+name] = event.target.value,
            obj
        ))
        console.log(event.target.value);
        console.log(event.target.name);
    }   

    render() {
        return (
            <form className = "form-inline">
                <div className="form-group">
                <input type="text" className = "form-controll" placeholder = "日期" name = "date" value = {this.state.date} onChange = {this.handleChange.bind(this)}/>
            </div>
            <div className="form-group">
                <input type="text" className = "form-controll" placeholder = "事项" name = "title" value = {this.state.title} onChange = {this.handleChange.bind(this)}/>
            </div>
            <div className="form-group">
                <input type="text" className = "form-controll" placeholder = "金额" name = "amount" value = {this.state.amount} onChange = {this.handleChange.bind(this)}/>
            </div>
            <button type = "submit" className="btn btn-primary" disabled = {!this.valid()}>创建记录</button>
        </form>

    );
  }
}
