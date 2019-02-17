import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import RecordForm from './RecordsForm';


export default class Record extends Component {
  constructor(){
    super();
    this.state = {
      edit:false
    };
  }

  handleToggle(){
    this.setState({
      edit:!this.state.edit
    })
  }


  recordRow() {
    return (
          <tr>
            <td>{this.props.date}</td>
            <td>{this.props.title}</td>
            <td>{this.props.amount}</td>
            <td>
              <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>编辑</button>
              <button className="btn btn-danger">删除</button>
            </td>
          </tr>

    );
  }

  recordForm(){
    return(
      <tr>
      <td><input type="text" className="form-control" defaultValue = {this.props.date}/></td>
      <td><input type="text" className="form-control" defaultValue = {this.props.title}/></td>
      <td><input type="text" className="form-control" defaultValue = {this.props.amount}/></td>
      <td>
        <button className="btn btn-info mr-1">更新</button>
        <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>取消</button>
      </td>
    </tr>

    )
  }

  render(){
    if(this.state.edit){
      return this.recordForm();
    }else{
      return this.recordRow();
    }
  }
}



Record.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
  
}
