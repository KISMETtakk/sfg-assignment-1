![image](https://github.com/user-attachments/assets/f2fb967f-5e43-4276-b154-91d391d0be2b)
![image](https://github.com/user-attachments/assets/f2765258-a0df-4bcb-bc1a-8a0f437b3d7e)
![image](https://github.com/user-attachments/assets/e48441d9-bb7c-4934-b996-f43d5f6558f6)
![image](https://github.com/user-attachments/assets/58ebba52-b336-4800-9cd5-6b07fb82fc98)
![image](https://github.com/user-attachments/assets/abec8a0e-5e84-499a-afd2-21c799a5373c)
![image](https://github.com/user-attachments/assets/4916fcc6-ce96-485d-a8a4-399d4cf53a75)
![image](https://github.com/user-attachments/assets/3dc0573f-29c6-4c09-ae57-1ffcf8ebed4f)
![image](https://github.com/user-attachments/assets/5171a851-2507-47c8-b0c1-b8cb5998f9e5)
![image](https://github.com/user-attachments/assets/9073d466-5493-4a27-8e1b-68c4a7af52f1)
![image](https://github.com/user-attachments/assets/63f4e021-7fcf-4b41-9287-918a0cee7545)

![image](https://github.com/user-attachments/assets/56946f0e-43c0-44de-9dde-e07dc84b2457)
![image](https://github.com/user-attachments/assets/b32c2060-6915-41b4-89b2-80cfecea4d1c)
![image](https://github.com/user-attachments/assets/8d3721c6-b0d8-4871-8a4a-de374e9f6dcf)
![image](https://github.com/user-attachments/assets/920b94cb-6a06-412d-be20-8f70cdc6b9af)
![image](https://github.com/user-attachments/assets/ce635149-5878-4b41-a88f-8048ecc0efa2)
![image](https://github.com/user-attachments/assets/cecd9c85-ab09-4678-8df8-b3f2bb5f6f1a)
![image](https://github.com/user-attachments/assets/43584eb3-8944-4f16-a86b-e1afda59f7f5)
![image](https://github.com/user-attachments/assets/0bf31d86-830f-4c3c-9a8e-e2162fba778f)
![image](https://github.com/user-attachments/assets/4c2b7f57-1f98-4128-a9d7-bd02ab346396)
![image](https://github.com/user-attachments/assets/4c8657b8-2591-46b3-8867-325abe79fd1a)
# Smart Campus Services Portal (Frontend)

This is the **frontend** of the Smart Campus Services Portal, a web-based system that enables students, lecturers, and administrators to manage academic activities like consultation bookings, class timetables, maintenance reporting, and notification tracking.

---

## 🌐 Technologies Used

* **React.js** (Functional Components + Hooks)
* **Axios** for API calls
* **React Router DOM** for navigation
* **FontAwesome** and **React Icons** for UI icons
* **CSS3** and **Custom Stylesheets** (Tailored per component)

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/smart-campus-frontend.git
cd smart-campus-frontend
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Set Environment Variables**

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8180/api
```

### 4. **Run the Application**

```bash
npm start
```

This will open the app on `http://localhost:3000`

---

## 🎓 Features

* **Student Dashboard**: View class/consultation timetables, submit maintenance issues, receive notifications.
* **Lecturer Login**: Approve/cancel appointments, view personal modules.
* **Admin Dashboard**: View/manage all appointments and maintenance issues.
* **Calendar View**: Highlight booked appointments.
* **Dynamic Timetable**: Weekly view for lecture modules.

---

## 🔗 API Integration

This frontend consumes a Spring Boot RESTful API.
Ensure the backend is running at:

```
http://localhost:8180/
```

APIs used include:

* `GET /api/appointment/appointments`
* `GET /api/timetable/view-all`
* `POST /api/maintenance/create`
* `PUT /api/appointment/update-status/{id}`

---

## 🏛️ Sample Credentials

* **Student**: `johndoe@example.com / studentpass1`
* **Lecturer**: `davidwilliams@example.com / lecturerpass1`
* **Admin**: No frontend login yet (access via backend or Swagger)

---

## 📸 UI Screenshots

Add screenshots inside a `screenshots/` folder:

```
- view-timetable.png
- admin-dashboard.png
- submit-maintenance.png
- lecturer-login.png
```

---


---

## 🎨 UI Styling

* All components are styled using modular or scoped CSS files.
* Consistent color scheme (red & white theme for student UI, yellow & white for admin).
* Responsive layout for desktop resolution (future: mobile support).

---

## 🚜 Future Improvements

* JWT login persistence
* Role-based protected routes
* Pagination and filtering for maintenance cards
* Admin user management page

---

## 💼 License

This project is for academic demonstration purposes.
