import React from 'react';
import data from './data/sp500.json';

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'items': data
        }
    }

    render() {
        console.log(data);
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Security</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map(function (item) {
                            return (
                                <tr key={item.symbol}>
                                    <td>{item.symbol}</td>
                                    <td>{item.security}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
