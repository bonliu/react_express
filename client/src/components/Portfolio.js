import React from 'react';
import data from './data/sp500.json';
import '../styles/Portfolio.css';

export default class Portfolio extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         'items': data,
    //         'balance': 0,
    //         'key': this.props.location.state.key,
    //         'ticker': '',
    //         'price': {}
    //     }
    // }
    state = {
        'items': data,
        'balance': 0,
        'key': this.props.location.state.key,
        'ticker': '',
        'price': 0,
        'portfolio': [],
        'wealth': 0,
    };

    getInfo = async () => {
        const param = this.state.key.slice(0, -4);
        const api = '/api/' + param;
        const response = await fetch(api);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.id);
        console.log(body)

        return body.data.balance_in_cent * 1.0 / 100;
    };

    getPorfolio = async () => {
        const param = this.state.key.slice(0, -4);
        const api = '/api/transactions/' + param;
        const response = await fetch(api);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.id);
        console.log(body)

        return body.data;
    };

    getCurrentPrice = async(stock) => {
        try {
            console.log(stock)
        } catch (error) {
            console.log(error);
        }
        // const iex_token = 'pk_b13cf33210f742ffb6860aa0f6ade3b0';
        // const api = 'https://cloud.iexapis.com/stable/stock/TICKER/quote?token=TOKEN'.replace('TICKER', stock).replace('TOKEN', iex_token);
        // const response = await fetch(api);
        // const body = await response.json();
        // if (response.status !== 200) throw Error(body.id);
        // console.log(body)
    }

    componentDidMount() {
        this.getInfo()
            .then(res => {
                this.setState({ balance: res });
            });

        console.log(this.state);

        this.getPorfolio()
            .then(res => {
                this.setState({ portfolio: res });
                console.log(this.state.portfolio)
                // var new_wealth = 0;
                // this.state.portfolio.map(function (item) {
                //     new_wealth = new_wealth + item.shares * item.buyat * 1.00 / 100;
                // });
                // this.setState({ wealth: new_wealth });
                // console.log(this.state)
                return this.state.portfolio;
            })
            .then(portfolio => {
                portfolio.map(function (stock) {
                    const iex_token = 'pk_b13cf33210f742ffb6860aa0f6ade3b0';
                    const api = 'https://cloud.iexapis.com/stable/stock/TICKER/quote?token=TOKEN'.replace('TICKER', stock.ticker).replace('TOKEN', iex_token);
                    console.log(api);
                    fetch(api)
                    .then(res => res.json())
                    .then(json => {
                        stock.currentPrice = json.latestPrice;
                        console.log(stock);
                    });
                })
                // this.setState({ wealth: new_wealth });
                // console.log(portfolio);
                return this.state.portfolio;
            })
            .then(portfolio => {
                this.setState({ portfolio: portfolio } )
                console.log(JSON.stringify(this.state.portfolio));
            });
            // .then(portfolio => {
            //     // var new_wealth = 0;
            //     portfolio.map(function (stock) {
            //         console.log(this)
            //         // this.setState({ wealth: wealth + stock.currentPrice });

            //     });
            // });
        console.log(this.state)

        // this.state.portfolio.map(function (item) {
        //     this.getCurrentPrice(item)
        //     .then(res => {
        //         this.state.portfolio.price = res.latestPrice;
        //     })
        // });
        // console.log(this.state)
    };

    updateBalance = async (latestPrice) => {
        const param = this.state.key.slice(0, -4);
        const api = '/api/' + param;
        const response = await fetch(api, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: param,
                price: -1.0 * latestPrice * 100.00
            }),
        });

        const body = await response.json();
        alert('Success');
        window.location.reload(true);
        console.log(body);
    }



    handleSubmit = async e => {
        e.preventDefault();
        const iex_token = 'pk_b13cf33210f742ffb6860aa0f6ade3b0';
        const api = 'https://cloud.iexapis.com/stable/stock/TICKER/quote?token=TOKEN'.replace('TICKER', this.state.ticker).replace('TOKEN', iex_token);
        // var price = 0;
        fetch(api)
            .then(res => res.json())
            .then(json => this.updateBalance(json.latestPrice))
        // .then(json => console.log(json.latestPrice));

        // const response = await fetch(api, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: ''
        // });

        // const body = await response.json();
        console.log("Price = " + this.state.price);
    }

    // var td = document.getElementById('price');


    render() {
        // console.log(data);
        // console.log(this.props.location.state.key)
        console.log("here: " + this.state.balance)
        return (
            <div className='whole'>
                <div className='rowC'>
                    <div className='stockTable'>
                        <div>
                            <h2>Portfolio {this.state.wealth}</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th>Number of shares</th>
                                    <th>Buy at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.portfolio.map(function (item) {
                                    return (
                                        <tr key={item.ticker}>
                                            <td>{item.ticker}</td>
                                            <td>{item.shares}</td>
                                            {/* <td>$ {item.buyat * 1.00 / 100}</td> */}
                                            <td >{item.currentPrice}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            {/* <tbody>
                                {this.state.items.map(function (item) {
                                    return (
                                        <tr key={item.symbol}>
                                            <td>{item.symbol}</td>
                                            <td>{item.security}</td>
                                        </tr>
                                    )
                                })}
                            </tbody> */}
                        </table>
                    </div>

                    <div className='buyingForm'>
                        {/* <p>Cash - $5000.00</p> */}
                        <p>Cash - {this.state.balance}</p>
                        <form action="" onSubmit={this.handleSubmit}>
                            <input type="text" id="fname" name="fname" placeholder="Ticker" onChange={e => this.setState({ ticker: e.target.value })} /><br></br>
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
