import React from "react";
import "../app.css";

function Pricing(){
    return(
        <React.Fragment>
            <div class="container pricing-container">
            
                <div class="pricings">
                    <h1><i class="fas fa-wallet"></i> Plans & Pricing</h1>
                </div>
                
                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm border-dark basic-card">
                            <div class="card-header py-3 ">
                                <h4 class="my-0 fw-normal card-text">Basic  </h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title card-text">$0<small class="text-muted fw-light card-text">/mo</small></h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                <li>10 users included</li>
                                <li>2 GB of storage</li>
                                <li>Email support</li>
                                <li>Help center access</li>
                                </ul>
                                <button type="button" class="w-100 btn btn-lg bg-dark text-white">Checkout</button>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm border-primary standard-Card">
                            <div class="card-header py-3">
                                <h4 class="my-0 fw-normal card-text">Standard</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title card-text">$15<small class="text-muted fw-light card-text">/mo</small></h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                <li>20 users included</li>
                                <li>10 GB of storage</li>
                                <li>Priority email support</li>
                                <li>Help center access</li>
                                </ul>
                                <button type="button" class="w-100 btn btn-lg btn-primary">Checkout</button>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm border-danger">
                            <div class="card-header py-3 text-white ">
                                <h4 class="my-0 fw-normal card-text">Premium</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title card-text">$29<small class="text-muted fw-light card-text">/mo</small></h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                <li>30 users included</li>
                                <li>15 GB of storage</li>
                                <li>Phone and email support</li>
                                <li>Help center access</li>
                                </ul>
                                <button type="button" class="w-100 btn btn-lg btn-danger">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </React.Fragment>
    );
}

export default Pricing;