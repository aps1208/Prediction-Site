 # 🏏 Cricket Win Predictor

A full-stack web application that predicts the winning probability of cricket teams based on current match conditions using Machine Learning.

![React](https://img.shields.io/badge/React-18.0+-blue)
![Node.js](https://img.shields.io/badge/Node.js-16.0+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

## 🌟 Features

### 🔐 Authentication System
- **User Registration** - Secure signup with validation
- **User Login** - JWT-based authentication
- **Beautiful UI** - Cricket-themed background with glass morphism effects
- **Custom Notifications** - Professional toast notifications instead of browser alerts

### 🎯 Prediction Engine
- **Real-time Predictions** - Get win probabilities based on current match state
- **Smart Validation** - Input validation for realistic match scenarios
- **Visual Results** - Interactive pie charts showing win probabilities
- **Team Selection** - Support for all IPL teams

### 📱 User Experience
- **Responsive Design** - Works perfectly on all devices
- **Modern UI** - Glass morphism effects and smooth animations
- **Loading States** - Clear feedback during API calls
- **Error Handling** - User-friendly error messages

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Chart.js** - Interactive data visualization
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Machine Learning
- **Flask** - Python web framework for ML API
- **Python** - ML model implementation
- **Pandas/NumPy** - Data processing
- **Scikit-learn** - Machine learning algorithms

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.0 or higher)
- Python (v3.8 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aps1208/Prediction-Site
   cd Prediction-Site
   ```

2. **Set up the Frontend**
```bash
   # Install dependencies
   npm install
   
   # Start the development server
   npm run dev
```
3. **Set up the Backend**
```bash
   # Open a new terminal in the same project directory
   # Navigate to backend directory (if separate) or stay in root
   
   # Install backend dependencies
   npm install
   
   # Start the backend server
   npm run server
   # OR
   node server.js
   # OR
   nodemon server.js
```
4. **Configure Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cricket-predictor
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

5. **Set up the ML Model**
   ```bash
   # Navigate to ML directory
   cd ml-model
   
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Start the Flask server
   python app.py
   ```

6. **Start all services**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`
   - ML API: `http://localhost:5001`

## 📋 Usage

### Authentication
1. **Sign Up** - Create a new account with username, email, and password
2. **Log In** - Access your account with email and password
3. **Auto-redirect** - Successful login redirects to prediction page

### Making Predictions
1. **Select Teams** - Choose batting and bowling teams
2. **Enter Match Details** - Input current score, overs, wickets, target, and venue
3. **Get Prediction** - Click predict to see win probabilities
4. **View Results** - Interactive pie chart shows the prediction results

### Input Parameters
- **Batting Team** - Team currently batting
- **Bowling Team** - Team currently bowling  
- **Venue** - Match location/city
- **Target** - Total runs to chase
- **Current Score** - Current runs scored
- **Overs Completed** - Overs bowled (e.g., 10.3)
- **Wickets Down** - Wickets lost (0-10)

## 🎨 UI/UX Features

- **Cricket-themed Background** - Stadium imagery with overlay effects
- **Glass Morphism** - Modern translucent design elements
- **Smooth Animations** - Slide-in effects and hover states
- **Toast Notifications** - Professional success/error messages
- **Responsive Layout** - Mobile-first design approach
- **Loading States** - Visual feedback during operations

## 📊 Supported Teams

- Mumbai Indians
- Chennai Super Kings  
- Royal Challengers Bengaluru
- Kolkata Knight Riders
- Sunrisers Hyderabad
- Delhi Capitals
- Rajasthan Royals
- Punjab Kings

## 🏟️ Supported Venues

Major cricket venues across India including Mumbai, Chennai, Bangalore, Kolkata, Hyderabad, Delhi, Jaipur, Mohali, and more.

## 🔧 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Prediction
- `POST /api/predict` - Get win probability prediction

## 🤖 Machine Learning Model

The prediction engine uses historical cricket data to train a machine learning model that considers:
- Current run rate vs required run rate
- Wickets in hand
- Venue conditions
- Team performance history
- Match situation (balls remaining, runs needed)

## 🐛 Known Issues & Future Enhancements

### Current Limitations
- ML model trained on limited historical data
- Predictions based on basic match parameters

### Future Enhancements
- [ ] Player-specific analysis
- [ ] Weather conditions integration
- [ ] Live score API integration
- [ ] Match history tracking
- [ ] User profile dashboard
- [ ] Team statistics and analytics
- [ ] Tournament predictions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aman Pratap Singh** 
- GitHub: https://github.com/aps1208
- LinkedIn: https://www.linkedin.com/in/aps121204/
- Email: aps121204@gmail.com

## 🙏 Acknowledgments

- Thanks to the open-source cricket data community
- Chart.js for beautiful data visualization
- React and Node.js communities for excellent documentation
- MongoDB for reliable database solutions

## 📸 Screenshots

### Login Page
![Login Page](./Screenshots/login.png)

### Prediction Interface  
![Prediction Page](./Screenshots/interface.png)

### Results Visualization
![Results](./Screenshots/result.png)

---

⭐ **Star this repository if you found it helpful!** ⭐
