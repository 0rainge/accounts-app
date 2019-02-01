import React, { Component } from 'react';
import Record from './Record';
 

class Records extends Component {
  constructor(){
    super();
    this.state = {
      records:[
        {"id":1,"date":"2019-02-01","title":"敲代码的收入","amount":0.5},
        {"id":2,"date":"2019-01-28","title":"买小鱼干的支出","amount":10.0},
        {"id":3,"date":"2019-01-22","title":"出去浪的支出","amount":5.0},
      ]
    }
  }


  render() {
    return (
      <div >
        <h2>大猫咪的小账本</h2>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th>日期</th>
            <th>事项</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          {/* <Record/> */}
          {this.state.records.map((record) => <Record record={record} / >)}
        </tbody>
        </table>

      </div>
    );
  }
}

export default Records;
