# 🏥 MediCare Connect

A full-stack healthcare platform built to simplify doctor discovery, appointment booking, digital prescriptions, payments, and role-based healthcare management.

This project was created to showcase end-to-end product development skills in modern web engineering, from UI/UX design and authentication to database modeling, secure APIs, payment integration, and deployment.

## 🌐 Live Demo

- Website: https://medicare-connect-two.vercel.app
- Client Repository: https://github.com/AMIRUL1104/Medicare-Connect
- Server Repository: https://github.com/AMIRUL1104/Medicare-Connect-server

---

## 🎯 Project Overview

MediCare Connect is a modern web application that connects three user groups:

- Patients who can find doctors, book appointments, and manage their healthcare journey
- Doctors who can manage availability, appointments, and prescriptions
- Admins who can oversee platform operations and verify doctors

The platform focuses on making healthcare services more accessible, organized, and digital-friendly.

---

## ✅ What I Built

### Patient Features

- Secure signup and login experience
- Doctor search by name and specialization
- Filtering and sorting for better doctor discovery
- Doctor profile viewing with availability details
- Multi-step appointment booking flow
- Symptom submission before booking
- Stripe-based secure payment integration
- Appointment history and payment tracking
- Review and rating system for doctors
- Prescription viewing from the patient dashboard

### Doctor Features

- Doctor registration and verification workflow
- Profile management with qualifications, experience, and consultation fee
- Schedule and availability setup
- Appointment request review and decision handling
- Digital prescription creation and management
- Doctor dashboard for managing healthcare activity

### Admin Features

- Admin dashboard with platform statistics
- Doctor verification and approval management
- User and doctor management tools
- Appointment and payment monitoring
- Analytics-driven insights for platform performance

---

## 🔧 Technical Highlights

### Frontend

- Next.js with App Router
- React and JavaScript
- Tailwind CSS for responsive UI
- HeroUI components
- Framer Motion for smooth animations
- React Hook Form and Toast notifications
- Recharts for dashboard analytics

### Backend & Database

- Node.js and Express.js
- MongoDB Atlas for data storage
- Better Auth for secure authentication
- JWT-based session handling
- Stripe payment integration
- ImageBB for profile image uploads

---

## 🧠 Skills Demonstrated

This project reflects practical experience in:

- Full-stack web development
- Role-based authentication and authorization
- Secure payment flow implementation
- CRUD-based dashboard features
- Responsive UI/UX development
- Database design and API integration
- Deployment and production-ready architecture

---

## 🚀 Why This Project Stands Out

- Built a complete product experience rather than just a single feature
- Implemented real-world workflow logic for healthcare booking
- Added role-based access control for different user personas
- Focused on both functionality and usability
- Designed the app to feel modern, clean, and recruiter-friendly

---

## 🔐 Security & User Experience

- Protected routes for each user role
- Persistent authentication support
- Password validation on signup
- Image upload support for profiles
- Loading states, empty states, and polished UI feedback
- Mobile-friendly responsive design

---

## ⚙️ Installation

```bash
git clone https://github.com/AMIRUL1104/Medicare-Connect.git
cd medicare-connect
npm install
```

Create a `.env.local` file and add configuration values for:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
DM_NAME=medicare-connect
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_IMAGEBB_KEY=your_imagebb_key
```

Run the app:

```bash
npm run dev
```

---

## 📈 Project Impact

This project demonstrates the ability to build a complete digital product that solves a real-world problem with strong frontend, backend, and product-thinking skills.

---

## 👨‍💻 Developer

Amirul Islam
Full Stack Developer

- LinkedIn: https://www.linkedin.com/in/amirul-islam-23541a317
- Email: amirulislam9.e@gmail.com
