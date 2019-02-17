import React, { Component } from 'react';

import * as RecordsAPI  from '../utils/RecordsAPI';


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
        return this.state.title && this.state.date && this.state.amount;
    }

    handleChange(event){
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj[""+name] = event.target.value,
            obj
        ))
        // console.log(event.target.value);
        // console.log(event.target.name);
        // 每次改变（键入）执行一次
    }
    
    handleSubmit(event){
        event.preventDefault();

        const data = {
            date:this.state.date, 
            title:this.state.title, 
            amount:Number.parseInt(this.state.amount,0)
        };

        RecordsAPI.create(data).then(
            Response => {
                this.props.handleNewRecord(Response.data);
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                })

            }
        ).catch(
            Error => console.log(Error.message)
        )
    }

    render() {
        return (
            <form className = "form-inline mb-3" onSubmit = {this.handleSubmit.bind(this)}>
                <div className="form-group mr-1" >
                    <input type="text" className = "form-controll" placeholder = "日期" name = "date" value = {this.state.date} onChange = {this.handleChange.bind(this)}/>
                </div>
                <div className="form-group mr-1" >
                    <input type="text" className = "form-controll" placeholder = "事项" name = "title" value = {this.state.title} onChange = {this.handleChange.bind(this)}/>
                </div>
                <div className="form-group mr-1" >
                    <input type="text" className = "form-controll" placeholder = "金额" name = "amount" value = {this.state.amount} onChange = {this.handleChange.bind(this)}/>
                </div>
            <button type = "submit" className="btn btn-primary" disabled = {!this.valid()}>创建记录</button>
            </form>

    );
  }
}
