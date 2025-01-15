import Script from 'next/script';
import React from 'react';

const RazorpayPayment: React.FC = () => {
  const handlePayment = async () => {
    try {
      // Ensure the script is loaded
      if (!(window as any).Razorpay) {
        alert('Razorpay script is not loaded yet. Please try again.');
        return;
      }

      // API call to create an order
      const response = await fetch('http://localhost:4000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 5000,
          itemName: 'Premium Membership',
          userDetails: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '1234567890',
          },
        }),
      });

      const { razorpayOptions } = await response.json();

      // Attach the payment handler
      razorpayOptions.handler = function (paymentResponse: any) {
        alert(`Payment Successful! Payment ID: ${paymentResponse.razorpay_payment_id}`);
      };

      // Create and open the Razorpay modal
      const razorpayInstance = new (window as any).Razorpay(razorpayOptions);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('Razorpay script loaded')}
        onError={(e) => console.error('Failed to load Razorpay script', e)}
      />
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
