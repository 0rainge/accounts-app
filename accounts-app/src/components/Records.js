import React, { Component } from 'react';
import Record from './Record';
// import {getJSON} from 'jquery';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordsForm';
import AmountBox from './AmountBox'


 

class Records extends Component {
  constructor(){
    super();
    this.state = {
      err:null,
      isLoaded:false,
      records:[
        // {"id":1,"date":"2019-02-01","title":"敲代码的收入","amount":0.5},
        // {"id":2,"date":"2019-01-28","title":"买小鱼干的支出","amount":10.0},
        // {"id":3,"date":"2019-01-22","title":"出去浪的支出","amount":5.0},
      ]
    }
  }

  componentDidMount(){
    RecordsAPI.getAll().then(
      response => this.setState({
        isLoaded:true,
        records: response.data
      }),

    ).catch(
      err => this.setState({
        isLoaded:true,
        err//相当于err:err
      })
    )
  }

  addRecord(record){
    this.setState({
      err:null,
      isLoaded:true,
      records:
        [...this.state.records,
        record]
    })
  }

  updateRecord(record,data){
    // console.log(record);
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item,index) =>{
      if(index!==recordIndex){
        return item;
      }
      return{
        ...item,
        ...data
      };
    })
    this.setState({
      records: newRecords
    })
  }

  deleteRecord(record){
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item,index) =>index!==recordIndex);
    this.setState({
      records:newRecords
    })

  }

  credits(){
    let credits = this.state.records.filter((record)=>{
      return record.amount>=0;
    })

    return credits.reduce((prev,curr) =>{
      return prev + Number.parseInt(curr.amount,0)
    },0)

  }


  debits(){
    let credits = this.state.records.filter((record)=>{
      return record.amount<0;
    })

    return credits.reduce((prev,curr) =>{
      return prev + Number.parseInt(curr.amount,0)
    },0)
  }

  balance(){
    return this.credits()+this.debits();
  }

  render() {
    const {err,isLoaded,records} = this.state;
    let recordsComponent;
    if(err)
      recordsComponent = <div>啊偶出现了bug！{err.message}</div>;
    else if(!isLoaded){
      recordsComponent = <div>正在加载大猫咪的小金库</div>
    }else{

      recordsComponent = (

          <table className="table table-bordered">
          <thead>
            <tr>
              <th>日期</th>
              <th>事项</th>
              <th>金额</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {/* <Record/> */}
            {records.map((record) => (
              <Record 
              key ={record.id} 
              record = {record}  
              handleEditRecord = {this.updateRecord.bind(this)}
              handleDeleteRecord = {this.deleteRecord.bind(this)}
            />
            ))}
          </tbody>
          </table>
  
      );
    }
    return(
      <div >
          <h2>大猫咪的小账本</h2>
          <div className="row mb-3">
            <AmountBox text="收入" type = "success" amount={this.credits()}/>
            <AmountBox text="支出" type = "danger" amount={this.debits()}/>
            <AmountBox text="总金额" type = "info" amount={this.balance()}/>
          </div>
          <RecordForm handleNewRecord={this.addRecord.bind(this)} />
          {recordsComponent}
      </div>
    )
  }
}

export default Records;
