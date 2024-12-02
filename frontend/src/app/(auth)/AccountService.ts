// import axios from "axios";
// import io from "socket.io-client";

// const AccountService = {
//   async register(username, email, token) {
//     try {
//       const response = await axios.post("http://localhost:1337/api/accounts", {
//         data: { username, email, token },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Registration failed", error);
//       throw error;
//     }
//   },

//   async login(email, token) {
//     try {
//       // Establish socket connection
//       const socket = io("http://localhost:1337", {
//         auth: { token },
//       });

//       // Store user data
//       localStorage.setItem("userToken", token);
//       localStorage.setItem("userEmail", email);

//       return { socket, email };
//     } catch (error) {
//       console.error("Login failed", error);
//       throw error;
//     }
//   },

//   logout() {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("userEmail");
//   },

//   isAuthenticated() {
//     return !!localStorage.getItem("userToken");
//   },
// };

// export default AccountService;
