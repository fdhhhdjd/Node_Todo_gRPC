const axios = require("axios");
const crypto = require("crypto");

const secretKey = "your_secret_key_v1"; // Khóa bí mật để tạo signature
const apiUrl = "http://localhost:5000/api/v1"; // URL của API

// Hàm để tạo và gửi request
const callSecureApi = async () => {
  // Tạo nonce ngẫu nhiên
  const nonce = crypto.randomBytes(16).toString("hex");

  // Lấy timestamp hiện tại (tính bằng giây kể từ Epoch)
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const apiKey = "xxx-yyy"; // API key của bạn

  // Tạo baseString từ nonce, timestamp và requestBody
  const baseString = nonce + timestamp + apiKey;

  // Tạo signature bằng cách sử dụng HMAC SHA256
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(baseString)
    .digest("hex");

  try {
    // Gửi request với Axios
    const response = await axios.get(apiUrl, {
      headers: {
        signature: signature,
        nonce: nonce,
        timestamp: timestamp,
        version: "v1",
        apiKey: apiKey,
      },
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error calling API:",
      error.response ? error.response.data : error.message,
    );
  }
};

// Gọi hàm để thực hiện API call
callSecureApi();
