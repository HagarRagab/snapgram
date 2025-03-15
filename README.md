# **📱 Snapgram – A Modern Social Media App**

## **Table of content:**

-   [Description](#description)
-   [Key Features](#key-features)
-   [Project Structure](#project-structure)
-   [Tech Stack](#tech-stack)
-   [Conclusion](#conclusion)

**Live demo** [click here](https://worldwise-travel-tracking-app.netlify.app/)

![alt text](website_images/app-design.jpg)

---

### **Description:**

**Snapgram** is a fully responsive, modern social media application built using **React** and **TypeScript**, designed to provide users with a seamless and interactive experience. The app leverages powerful technologies like **Appwrite** for backend services, **shadcn/ui** for elegant UI components, and **Tailwind CSS** for custom styling.

Built with developer best practices, Snapgram integrates **React Hook Form** with **Zod** for robust form validation, **React Router** for dynamic routing, and **TanStack Query** for efficient data fetching and caching.

---

### **Key Features:**

-   **User Authentication**: Secure sign-up and login functionality using Appwrite's auth system.
-   **Post Creation**: Users can create posts with captions and upload images.
-   **Follow System**: Follow/unfollow users and see a feed of posts from people you follow.
-   **Post Interaction**: Like posts, save posts for later, and view interactions.
-   **Search Functionality**: Find posts by searching captions in real-time.
-   **Profile Management**: Update profile details including display name, profile picture, and bio.
-   **Saved & Liked Posts**: Access a personalized feed of saved and liked posts.
-   **Mobile Responsive**: Fully responsive UI using Tailwind and shadcn/ui for a native-like mobile experience.

---

### **Project Structure:**

```
- data
  - cities.json          # Sample data for cities and countries
- index.html             # Root HTML file
- package-lock.json
- package.json
- public
- README.md
- src
  ├── App.jsx            # Main application component
  ├── components         # Reusable UI components
  │   ├── AppNav.jsx
  │   ├── BackButton.jsx
  │   ├── Button.jsx
  │   ├── City.jsx
  │   ├── CityItem.jsx
  │   ├── CityList.jsx
  │   ├── CountryItem.jsx
  │   ├── CountryList.jsx
  │   ├── Footer.jsx
  │   ├── Form.jsx
  │   ├── Logo.jsx
  │   ├── Map.jsx
  │   ├── Message.jsx
  │   ├── PageNav.jsx
  │   ├── Sidebar.jsx
  │   ├── Spinner.jsx
  │   ├── SpinnerFullPage.jsx
  │   ├── User.jsx
  │   ├── *.module.css    # CSS Modules for component styles
  ├── contexts           # Context API for global state management
  │   ├── CitiesContext.jsx
  │   ├── FakeAuthContext.jsx
  ├── hooks              # Custom hooks for reusable logic
  │   ├── useGeoLocation.js
  │   ├── useUrlPosition.js
  ├── index.css          # Global CSS styles
  ├── main.jsx           # Application entry point
  ├── pages              # Page components for routing
  │   ├── AppLayout.jsx
  │   ├── Homepage.jsx
  │   ├── Login.jsx
  │   ├── PageNotFound.jsx
  │   ├── Pricing.jsx
  │   ├── Product.jsx
  │   ├── ProtectedRoute.jsx
```

---

### **Tech Stack:**

-   **Frontend**: React + TypeScript
-   **Styling**: Tailwind CSS + shadcn/ui
-   **Routing**: React Router
-   **Forms & Validation**: React Hook Form + Zod
-   **Data Fetching**: TanStack Query
-   **Backend**: Appwrite (Auth, Database, Storage)

---

### **Conclusion:**

Snapgram showcases the capabilities of a scalable and feature-rich front-end application backed by a modern serverless backend. It's a demonstration of a real-world full-stack project with clean architecture and production-ready tools.
