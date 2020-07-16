import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price})=>{
    const priceForStripe=price*100;
    const publishableKey='pk_test_51H5bd6LDL8lVELRgJO9rrVTyrNUu4ufXFRoCKdCapZ2nDyQR7a81weD8mplCp8FVZ6tVfCuBU7qGlerXZyHK1uHR00KaFoCfkS';

    const onToken=token=>{
        console.log(token);
        alert("Payment successful");
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crown clouthing Lmt'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;