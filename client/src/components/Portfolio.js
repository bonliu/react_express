import React from 'react';
import data from './data/sp500.json';
import '../styles/Portfolio.css';

export default class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'items': data,
            'balance': 0,
            'key': this.props.location.state.key
        }
    }

    getInfo = async () => {
        const param = this.state.key.slice(0, -4);
        const api = '/api/' + param;
        const response = await fetch(api);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.id);
        console.log(body)

        return body.data.balance_in_cent * 1.0 /100;
    }

    componentDidMount() {
        this.getInfo()
        .then(res => {
            this.setState({ balance: res });
        })
    };

    render() {
        // console.log(data);
        // console.log(this.props.location.state.key)
        console.log("here: " + this.state.balance)
        return (
            <div className='whole'>
                <div className='rowC'>
                    <div className='stockTable'>
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
                    
                    <div className='buyingForm'>
                        {/* <p>Cash - $5000.00</p> */}
                            <p>Cash - {this.state.balance}</p>
                        <form action="">
                            <input type="text" id="fname" name="fname" placeholder="Ticker" /><br></br>
                            <input type="number" name="shares" min="0" placeholder="Qty" /><br></br>
                            <br></br>
                            <input type="submit" value="Buy" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
