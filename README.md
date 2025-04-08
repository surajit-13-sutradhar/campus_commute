# 🚍 CampusCommute

**CampusCommute** is a free, AI-powered, real-time smart mobility platform designed to simplify and optimize daily transportation within college campuses. With live tracking, intelligent routing, and a seamless booking system, CampusCommute ensures students and staff get around safely and efficiently.
---

## 🌟 Key Highlights

- 🎫 **Free Seat Reservations** on buses
- 🚗 **On-demand Auto Services** with GPS
- 📍 **10 Fixed Checkpoints** (A–J) across campus
- 🧠 **AI Recommendations** based on location, time & demand
- 🗺️ **Live Maps + Navigation** to nearest checkpoint
- 📊 **Admin Dashboard** with analytics and vehicle control
- 🛠️ Optional **Driver App** for route and shift management

---

## 🔍 Problem We Solve

CampusCommute addresses key commute issues in campuses:

- ❌ Missed buses due to no real-time updates  
- ❌ Inefficient route management  
- ❌ Lack of on-demand mobility  
- ❌ No predictive insights into peak hours or delays  

---

## 🧭 How It Works

1. Select **Source**, **Destination**, and **Time**
2. Get AI-recommended ride options (bus/auto)
3. Reserve seat (bus only)
4. Get walking directions to checkpoint
5. Track ride in real-time
6. Arrive and optionally submit feedback

---

## 🧠 AI-Powered Features

### 🚦 Smart Matching
- Best-fit vehicle selection based on live location, traffic, and availability

### 🔮 Predictive Analysis
- Forecasts demand hotspots
- Suggests admin route expansions or rescheduling

### ⏱️ ETA Optimization
- Uses historical GPS + real-time data for accurate arrival predictions

---

## 🧰 Tech Stack

| Layer        | Technologies Used                                  |
|--------------|----------------------------------------------------|
| Frontend     | React.js, Tailwind CSS, Mapbox                     |
| Backend      | Node.js, Express.js, PostgreSQL + PostGIS          |
| Real-Time    | WebSockets / Socket.IO                             |
| AI/ML        | Python, TensorFlow, Scikit-learn                   |
| DevOps       | Docker, Firebase, CI/CD pipelines                  |
| Maps & Nav   | Google Maps API / Mapbox                           |
| Notifications| Firebase Cloud Messaging                          |
| Auth         | JWT + OAuth2                                       |

---

## 📊 Admin Dashboard

- 🚏 Create/Edit/Delete Routes
- 🚌 Live Fleet Monitoring
- 📈 Usage Analytics (occupancy, timing, demand)
- ⚙️ Maintenance Alerts
- 🔁 Rerouting Based on Live Data

---

## 🚘 Driver App (Optional)

- Start/end shift
- Enable GPS tracking
- Update checkpoint status

---

## 🔔 Notifications & Alerts

- 🔔 Bus/Auto arrival
- 🔁 Delay or reroute
- ✅ Seat reservation confirmation
- 🚨 Optional emergency contact system

---

## 🔮 Future Enhancements

- ✅ QR-based check-ins  
- 👥 Ride pooling for autos  
- 🧠 AI-driven dynamic bus scheduling  
- 🆘 SOS emergency alert system  
- 📴 Offline-first support for basic ride info  

---

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/campuscommute.git
cd campuscommute

# Install dependencies (for backend)
npm install     # or pip install -r requirements.txt

# Set environment variables
cp .env.example .env

# Start development server
npm run dev     # or uvicorn app.main:app --reload
