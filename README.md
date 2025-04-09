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
- 🚌 **Group Booking Support** for student clubs and faculty excursions (requires approval)

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

### 🧾 Group Booking Management

- 📌 View and verify booking requests by club secretaries and faculty
- 📅 Ensure requests are made at least **2 days in advance**
- 📝 Check for valid documentation signed by the college administration
- 🧑‍💼 Approve or deny based on vehicle availability and academic calendar
- 📊 Generate reports on group travel usage and history

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

## 🌟 Special Feature: Group Bookings

Club secretaries and professors can book buses for academic and extracurricular excursions:

- ✅ Book entire bus for a day (field trip, club activity)
- 📅 Must be booked **2 days in advance**
- 📝 Requires signed authorization from college administration
- 📂 Verified bookings appear in admin dashboard for final dispatch

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
git clone https://github.com/surajit-13-sutradhar/campus_commute.git
cd campus_commute

# Install dependencies (for backend)
npm install     # or pip install -r requirements.txt

# Set environment variables
cp .env.example .env

# Start development server
npm run dev     # or uvicorn app.main:app --reload
```

---

## ✍️ Contributors

Faruk Ahmed  
Jubaraj Talukdar  
Karan Jyoti Medhi  
Priyanuj Kashyap  
Surajit Sutradhar  

---

## 📅 Date

**08 April, 2025**

## 💡 Let’s Redefine Campus Travel!

Join us in making campus mobility **smarter, greener, and more accessible** 🚀

