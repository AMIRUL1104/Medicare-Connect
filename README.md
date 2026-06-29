# 🏥 MediCare Connect – Hospital Appointment & Healthcare Management System

**MediCare Connect** is a modern, full-stack healthcare management platform that connects Patients, Doctors, and Administrators through a secure and centralized digital ecosystem [1]. The platform simplifies the complete healthcare journey—from discovering verified doctors and booking appointments to online payments, digital prescriptions, and appointment management [1, 2].

Built with scalability, security, and user experience in mind, the application follows modern web development best practices using **Next.js, Express.js, MongoDB, Better Auth, JWT, and Stripe** [3, 4].

---

## 🌐 Live Demo

- **Live Website:** [medicare-connect-two.vercel.app](medicare-connect-two.vercel.app)
- **Client Repository:** [https://github.com/AMIRUL1104/Medicare-Connect/edit/main/README.md](https://github.com/AMIRUL1104/Medicare-Connect)
- **Server Repository:** [https://github.com/AMIRUL1104/Medicare-Connect-server](https://github.com/AMIRUL1104/Medicare-Connect-server)

---

## ✨ Features

### 👤 Patient Features
- Register and login securely using **Better Auth** [4].
- Upload profile picture during registration [5].
- Search doctors by name or specialization [6].
- Sort doctors by consultation fee, experience, and rating [6].
- View detailed doctor profiles [5].
- Book appointments using available schedules [2, 7].
- Secure online payment with **Stripe** [7].
- View appointment history [2, 8].
- Reschedule or cancel appointments [8].
- Submit, edit, and delete doctor reviews [9, 10].
- View payment history [8].
- Manage personal profile [5, 8].

---

### 👨‍⚕️ Doctor Features
- Register as a doctor and wait for admin verification [11].
- Manage professional profile (qualifications, experience, fees) [11].
- Configure available working days and schedules [10].
- Accept or reject appointment requests [2, 10].
- View today's appointments [10].
- Generate digital prescriptions [9, 10].
- Manage prescriptions (CRUD) [10].
- Track appointment history [10].

---

### 👨‍💼 Admin Features
- Dashboard with overall platform statistics (Doctors, Patients, Appointments, Reviews) [11, 12].
- Verify or reject doctor registrations [2, 11].
- Manage all doctors (Update status or cancel verification) [11].
- Manage all users (View, Delete, Suspend) [2, 11].
- Monitor appointments and status [11].
- View payment records [7].
- Platform analytics using **Recharts** [3, 7].

---

## 🔍 Search & Filtering

- Search doctors by **Name** [6].
- Search doctors by **Specialization** [6].
- **Dynamic sorting** by:
  - Consultation Fee [6]
  - Experience [6]
  - Rating [6]
- **Server-side pagination** on the Find Doctors page [3].

---

## 💳 Appointment Workflow

1.  **Patient selects doctor**
2.  **Select appointment date**
3.  **Select available time slot**
4.  **Enter symptoms** [13]
5.  **Stripe Payment** (Required before confirmation) [7]
6.  **Appointment becomes Confirmed** [13]
7.  **Doctor receives appointment request** [10]
8.  **Doctor provides prescription after consultation** [10]

---

## 🔐 Authentication & Security

- **Better Auth** Authentication [4].
- **JWT Protected APIs** [5, 6].
- **Role-Based Access Control** (Patient, Doctor, Admin) [9, 14].
- **Protected Dashboard Routes** [14].
- **Persistent Authentication** (Logged-in users remain authenticated after reload) [15].
- **Secure HTTP-only Cookies** and environment variable protection [9].
- **Password Validation** (At least 6 characters, one number, one special character) [5].

---

## 📊 Admin Dashboard

- **Total Doctors** [12]
- **Total Patients** [12]
- **Total Appointments** [12]
- **Total Reviews** [12]
- **Total Payments**
- **Analytics Charts** (Doctor performance based on ratings) [6, 7]
- **Doctor Verification Management** [11]
- **User Management** [11]

---

## 🛠 Tech Stack

### Frontend
- **Next.js (App Router)** [3]
- **React**
- **JavaScript**
- **Tailwind CSS** [3]
- **HeroUI** [3]
- **Framer Motion** (Minimum 2 sections) [3, 12]
- **React Hook Form**
- **TanStack Query**
- **Axios**
- **Lucide React**

### Backend
- **Node.js** [4]
- **Express.js** [4]

### Database
- **MongoDB Atlas** [4]

### Authentication
- **Better Auth** [4]
- **JWT** [4]

### Payment
- **Stripe** [4]

### Image Hosting
- **ImageBB**

### Charts
- **Recharts** [3, 7]

---

## 📂 Database Collections

1.  **Users:** name, email, role, Photo, phone, gender, createdAt, status [13].
2.  **Doctors:** doctorName, specialization, qualifications, experience, consultationFee, hospitalName, profileImage, availableDays, availableSlots, verificationStatus [13].
3.  **Appointments:** patientId, doctorId, appointmentDate, appointmentTime, appointmentStatus, symptoms, paymentStatus [13].
4.  **Reviews:** patientId, doctorId, rating, reviewText, createdAt [9].
5.  **Payments:** appointmentId, patientId, doctorId, amount, transactionId, paymentDate [9].
6.  **Prescriptions:** doctorId, patientId, appointmentId, diagnosis, medications, notes, createdAt [9].

---

## 🎯 Assignment Challenges

### ✅ Challenge 1
Advanced doctor search by **Name** and **Specialization** [6].

### ✅ Challenge 2
Dynamic sorting by **Consultation Fee**, **Experience**, and **Rating** [6].

### ✅ Challenge 3
**JWT Token Verification** and **Role-Based Authorization** for backend APIs [6].

### ✅ Challenge 4
**Server-side Pagination** on the Find Doctors page [3].

---

## 📱 Responsive Design

The application is fully optimized for [6]:
- **Mobile**
- **Tablet**
- **Laptop**
- **Desktop**

---

## 🎨 UI/UX Highlights

- **Modern Healthcare Design:** Unique healthcare-themed color palettes [14].
- **Card-Based Layout** with consistent sizing and alignment [14].
- **Mobile-First Design** [6].
- **Smooth Framer Motion Animations** [12].
- **Loading Skeletons** for routes and data fetching [7].
- **Empty & Error States** [7].
- **Custom 404 Page** with illustration and "Back Home" button [7, 14].
- **Accessible Components** and Toast/SweetAlert notifications [14].

---

## ⚙️ Installation

### Clone the repositories
```bash
git clone <client-repository-url>
git clone <server-repository-url>
```

### Install dependencies
**Client**
```bash
npm install
```
**Server**
```bash
npm install
```

---

### Environment Variables

**Client (.env.local)** [9]
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

**Server (.env)** [9]
```env
PORT=
MONGODB_URI=
JWT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
CLIENT_URL=
STRIPE_SECRET_KEY=
IMAGEBB_API_KEY=
```

---

### Run the project

**Client**
```bash
npm run dev
```

**Server**
```bash
npm run dev
```

---

## 👨‍💻 Admin Credentials

- **Email:** `admin@medicare.com`
- **Password:** `Admin@1234`

---

## 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Image Storage:** ImageBB
- **Payment Gateway:** Stripe

---

## 📈 Project Highlights

- **Full Stack Healthcare Platform** with three distinct user roles [2].
- **Appointment Management** (CRUD) and automated workflow [8, 10].
- **Secure Authentication** via Better Auth and JWT [4, 5].
- **Stripe Payment Integration** for consultation fees [7].
- **Digital Prescription System** linked to completed appointments [10].
- **Doctor Verification Workflow** managed by Admins [11].
- **Dynamic Dashboard Analytics** using Recharts [7].
- **Server-Side Rendering** and Production-Ready Architecture [15].

---

## 📄 License

This project was developed for educational purposes as part of a Full Stack Web Development assignment [16].

---

## 👨‍💻 Developer

**Amirul Islam**
*Full Stack Developer*
- **LinkedIn:** [https://www.linkedin.com/in/amirul-islam-23541a317](https://www.linkedin.com/in/amirul-islam-23541a317)
- **Email:** `amirulislam9.e@gmail.com`
