import { createOrder } from "./paymentService";

export const openRazorpayCheckout = async ({
  amount,
  customerName,
  customerEmail,
  customerPhone,
}) => {
  try {
    // Create order from backend
    const order = await createOrder(amount);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      order_id: order.id,

      name: "Tata CLiQ Luxury",

      description: "Luxury Fashion Order",

      image: "/logo.png",

      prefill: {
        name: customerName,
        email: customerEmail || "",
        contact: customerPhone,
      },

      theme: {
        color: "#000000",
      },

      modal: {
        ondismiss: function () {
          console.log("Payment popup closed by user");
        },
      },

      handler: async function (response) {
        console.log("Payment Successful");

        console.log(response);

        /*
          response = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          }

          Next Step:
          Send these values to the backend
          for signature verification.
        */

        alert("Payment Successful!");
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.error("Payment Failed");

      console.error(response.error);

      alert(response.error.description);
    });

    razorpay.open();
  } catch (error) {
    console.error("Unable to start Razorpay");

    console.error(error);

    alert("Unable to start payment. Please try again.");
  }
};