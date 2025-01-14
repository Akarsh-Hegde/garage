
import React from 'react';
import Script from 'next/script';

const RazorpayPayment:  React.FC = () => {
  const handlePayment = async () => {
    try {
      // User details (you can replace these with dynamic values as needed)
      const userDetails = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '1234567890',
      };

      // API call to create an order
      const response = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 5000, // Amount in the smallest currency unit (e.g., paise for INR)
          itemName: 'Premium Membership',
          userDetails,
        }),
      });

      const { razorpayOptions } = await response.json();

      // Attach the payment handler to the Razorpay options
      razorpayOptions.handler = function (paymentResponse: any) {
        alert(`Payment Successful! Payment ID: ${paymentResponse.razorpay_payment_id}`);
        console.log('Payment Details:', paymentResponse);
        // You can also make a POST request to your backend to log payment success.
      };

      // Initialize Razorpay instance
      const razorpayInstance = new (window as any).Razorpay(razorpayOptions);

      // Open the Razorpay payment modal
      razorpayInstance.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Pay Now
      </button>
    </>
  );
};

export default RazorpayPayment;
