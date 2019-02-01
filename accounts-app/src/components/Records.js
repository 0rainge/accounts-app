import React, { Component } from 'react';


class Records extends Component {
  render() {
    return (
      <div >
        <h2>大猫咪的小账本</h2>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th>日期</th>
            <th>标题</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2019-02-01</td>
            <td>收入</td>
            <td>5毛</td>
          </tr>
          <tr>
            <td>2019-02-01</td>
            <td>收入</td>
            <td>5毛</td>
          </tr>
          <tr>
            <td>2019-02-01</td>
            <td>收入</td>
            <td>5毛</td>
          </tr>
          <tr>
            <td>2019-02-01</td>
            <td>收入</td>
            <td>5毛</td>
          </tr>
        </tbody>
        </table>

      </div>
    );
  }
}

export default Records;
