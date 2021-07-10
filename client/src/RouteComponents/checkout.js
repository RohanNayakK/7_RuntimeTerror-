import React from "react";
import "../app.css";

function Checkout(){
    return(
        <React.Fragment>
            <div class="container checkout-container">
                <h3><i class="far fa-credit-card"></i> Secure Checkout</h3>
                <br/>
                <h3 class="credit">Personal Details</h3>
                <form>              
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <input type="text" class="form-control" autoFocus autoComplete="off" required placeholder="First Name"/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">                                
                                <input type="text" class="form-control border-primary" autoComplete="off" required placeholder="Last Name"/>
                            </div>
                        </div>
                    </div>  
                    <br/>
                    <div class="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control border-primary" id="inputAddress" placeholder="1234 Main St"/>
                    </div> 
                    <br/>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" class="form-control border-primary" id="inputCity"/>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">State</label>
                            <select id="inputState" class="form-control  border-primary">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Zip</label>
                            <input type="text" class="form-control  border-primary" id="inputZip"/>
                        </div>
                    </div>           
                </form>
                <br/>
                <br/>
                <h3 class="credit">Payment  <i class="fab fa-cc-mastercard"></i> <i class="fab fa-paypal"></i> <i class="fab fa-google-pay"></i></h3> 
                <div class="credit-card bg-dark text-white">
                    <div class="form-group">
                        <label for="inputState">Payment Method</label>
                        <select id="inputState" class="form-control">
                            <option selected>Credit Card</option>
                            <option>Debit Card</option>
                            <option >UPI</option>
                            <option>Net Banking</option>
                        </select>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" class="form-control"/>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Expitation Date</label>
                                <input type="date" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>CVV</label>
                                <input type="text" class="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <button type="button" class="btn text-white btn-md bg-danger" disabled>Checkout</button>
            </div>
        </React.Fragment>
    );
}

export default Checkout;