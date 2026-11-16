const axios = require("axios");

const paystack = axios.create({
    baseURL: "https://api.paystack.co",
    timeout: 15000,
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
    }
})

const initializeTransaction = async ( { email, amount, refernce, metadata } ) =>{
    const response = await paystack.post("/transaction/initialize", {
        email,
        amount,
        reference,
        currency: process.env.PAYSTACK_CURRENCY || "NGN",
        callback_url: process.env.PAYSTACK_CALLBACK_URL,
        metadata
    })

    if(!response.data.status){
        throw new Error ("Paystack could not initialize the transaction")
    }

    return response.data.data;
}

const verifyTransaction = async (reference) => {
    const response = await paystack.get(`/transaction/verify/${encodeURIComponent(reference)}`);

    if(!response.data.status){
        throw new Error ("Paystack could not verify the transaction")
    }

    return response.data.data;
}

module.exports = {
    initializeTransaction,
    verifyTransaction
}