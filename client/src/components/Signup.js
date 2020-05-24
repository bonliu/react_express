import React from 'react';

class Signup extends React.Component {
    state = {
        fullname: '',
        email: '',
        confirm_email: '',
        password: '',
        confirm_password: '',
        responseToPost: ''
    };

    handleSubmit = async e => {
        e.preventDefault();
        if (this.state.password !== this.state.confirm_password) {
            alert("Passwords don't match");
        } else {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: this.state.fullname,
                    email: this.state.email,
                    // confirm_email: this.state.confirm_email,
                    password: this.state.password,
                    confirm_password: this.state.confirm_password
                }),
            });

            const body = await response.text();
            // this.setState({ responseToPost: body })
            if (body === 'Account existed.') {
                alert("Account existed")
            } else {
                alert("You are now a member of StockPro!!")
            }
        }
    }

    render() {
        // const { response } = this.state;

        return (
            <div className="Signup">
                {/* Bootstrap CDN */}
                <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
                <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
                <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
                
                <div class="container-fluid">
                    <section class="container">
		                <div class="container-page">	
                            <form id="signup-form" class="form" action="" method="post" onSubmit={this.handleSubmit}>			
                                <div class="col-md-6">
                                    <h3 class="dark-grey">Registration</h3>

                                    <div class="form-group col-lg-12">
                                        <label>Legal Name</label>
                                        <input type="text" name="legalname" class="form-control" id=""  onChange={e => this.setState({ fullname: e.target.value })} required/>
                                    </div>

                                    <div class="form-group col-lg-12">
                                        <label>Email Address</label>
                                        <input type="text" name="email" class="form-control" id="" onChange={e => this.setState({ email: e.target.value })} required/>
                                    </div>
                                    
                                    <div class="form-group col-lg-6">
                                        <label>Password</label>
                                        <input type="password" name="passcode" class="form-control" id=""  onChange={e => this.setState({ password: e.target.value })} required/>
                                    </div>
                    
                                    <div class="form-group col-lg-6">
                                        <label>Confirm Password</label>
                                        <input type="password" name="passcode" class="form-control" id=""  onChange={e => this.setState({ confirm_password: e.target.value })} required/>
                                    </div>

                                    <div class="form-group col-lg-6">
                                        <label>Already a member?</label><br></br>
                                        <a href="/" class="text-info">Login here</a>
                                        {/* <button type="submit" class="btn btn-primary">Login</button> */}
                                    </div>
                    
                                    {/* <div class="form-group col-lg-6">
                                        <label>Confirm Email Address</label>
                                        <input type="" name="" class="form-control" id="" value="" onChange={e => this.setState({ confirm_email: e.target.value })} required/>
                                    </div>			 */}
                    
                                    {/* <div class="col-sm-6">
                                        <input type="checkbox" class="checkbox" />Sigh up for our newsletter
                                    </div>

                                    <div class="col-sm-6">
                                        <input type="checkbox" class="checkbox" />Send notifications to this email
                                    </div>				 */}
                
                                </div>
            
                                <div class="col-md-6">
                                    <h3 class="dark-grey">Terms and Conditions</h3>
                                    <p>
                                        By clicking on "Register" you agree to The Company's' Terms and Conditions
                                    </p>
                                    <p>
                                        While rare, prices are subject to change based on exchange rate fluctuations - 
                                        should such a fluctuation happen, we may request an additional payment. You have the option to request a full refund or to pay the new price. (Paragraph 13.5.8)
                                    </p>
                                    <p>
                                        Should there be an error in the description or pricing of a product, we will provide you with a full refund (Paragraph 13.5.6)
                                    </p>
                                    <p>
                                        Acceptance of an order by us is dependent on our suppliers ability to provide the product. (Paragraph 13.5.6)
                                    </p>
                                    
                                    <button type="submit" class="btn btn-primary">Register</button>
                                    
                                </div>
                            </form>
		                </div>
                            
	                </section>
                    
                </div>
            </div>
        );
    }
}

export default Signup;
