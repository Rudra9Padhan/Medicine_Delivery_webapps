import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing order
const placeOrder = async (req,res) =>{
   
    const frontend_url = "http://localhost:5174"
  
    try{
    const newOrder = new orderModel({
        userId: req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{carrtData:{}});

    const line_items = req.body.items.map((item) => ({
      price_data: {
          currency: "inr",
          product_data: {
              name: item.name
          },
          unit_amount: item.price * 100, // ₹ to paise
      },
      quantity: item.quantity
  }));
  
  line_items.push({
      price_data: {
          currency: "inr",
          product_data: {
              name: "Delivery Charges"
          },
          unit_amount: 2.5 * 100, // ₹2.50 in paise
      },
      quantity: 1
  });
  
    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:"payment",
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    res.json({success:true,session_url:session.url})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }

}


 const verifyOrder = async (req,res)=>{
   const {orderId,success} = req.body;
 try{
  if(success=="true"){
    await orderModel.findByIdAndUpdate(orderId,{payment:true});
    res.json({success:true,message:"Paid"});
  }else{
    await orderModel.findByIdAndUpdate(orderId,{payment:false});
    res.json({success:false,message:"Not Paid"});
  }
 }catch(error){
    console.log("error");
    res.json({success:false,message:"Error"});
    
 }
 }

 
// Function to cancel an order
const cancelOrder = async (req, res) => {
  try {
      const order = await orderModel.findOne({ _id: req.body.orderId, userId: req.body.userId });

      if (!order) {
          return res.json({ success: false, message: "Order not found or does not belong to user" });
      }

      // Check if the order can be cancelled (e.g., not already delivered or cancelled)
      if (order.status === "Delivered" || order.status === "Cancelled") {
          return res.json({ success: false, message: `Order is already ${order.status}` });
      }

      // Add more complex logic if needed (e.g., check if processing has started)

      // Update the order status to "Cancelled"
      await orderModel.findByIdAndUpdate(req.body.orderId, { status: "Cancelled" });
      res.json({ success: true, message: "Order Cancelled" });

  } catch (error) {
      console.log("Error cancelling order:", error);
      res.json({ success: false, message: "Error cancelling order" });
  }
};

 //user order for frontend
const userOrders = async(req,res) =>{
try{
  const orders = await orderModel.find({userId:req.body.userId});
  res.json({success:true,data:orders});
}catch(error){
  console.log(error);
  res.json({success:false,message:"Error"});
}
}
//listing orders for admin
const listOrders = async(req,res) =>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

//api for  updating order status
const updateStatus = async (req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

// Controller to get the delivery location of an order
const getOrderLocation = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Fetch the order from the database
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Assuming the order model has a `location` field with latitude and longitude
    const { location } = order;

    if (!location) {
      return res.status(404).json({ message: 'Location not available for this order' });
    }

    res.status(200).json(location);
  } catch (error) {
    console.error('Error fetching order location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,getOrderLocation, cancelOrder};