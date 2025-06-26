const axios = require("axios");

async function updateCrudCrud(user) {
  const API_URL = "https://crudcrud.com/api/d46cf5cef3274d10b07a394e3a65b29f/profiles";

 
  const payload = {
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    city: user.city,
    pincode: user.pincode
  };

  try {
    console.log("Sending to CrudCrud:", payload);
    await axios.post(API_URL, payload);
    console.log("✅ Sent to CrudCrud successfully");
  } catch (err) {
    console.error("❌ Failed to update CrudCrud:", err.response?.data || err.message);
  }
}

module.exports = { updateCrudCrud };