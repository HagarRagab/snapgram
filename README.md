# **📱 Snapgram – A Modern Social Media App**

## **Table of content:**

-   [Description](#description)
-   [Key Features](#key-features)
-   [Project Structure](#project-structure)
-   [Tech Stack](#tech-stack)
-   [Conclusion](#conclusion)

**Live demo** [click here](https://snapgram-sociall-app.vercel.app/)

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
- index.html
- public
  - assets
    - icons
    - images
- README.md
- src
  - App.tsx
  - components
    - forms
      - PostForm.tsx
      - ProfileForm.tsx
    - shared
      - Bottombar.tsx
      - EditProfileButton.tsx
      - FileUploader.tsx
      - FollowButton.tsx
      - GridPostList.tsx
      - GridUserList.tsx
      - LeftSidebar.tsx
      - Loader.tsx
      - LoaderFullPage.tsx
      - PageError.tsx
      - PostCaption.tsx
      - PostCard.tsx
      - PostCreatorInfo.tsx
      - PostStats.tsx
      - ProfileInfo.tsx
      - ProfileStat.tsx
      - ProfileStats.tsx
      - ProfileTab.tsx
      - ProfileTabs.tsx
      - SearchResults.tsx
      - Topbar.tsx
      - TopPage.tsx
      - UpdatePostImage.tsx
      - UpdateProfileImage.tsx
      - UserCard.tsx
    - ui
      - button.tsx
      - form.tsx
      - input.tsx
      - label.tsx
      - sonner.tsx
      - textarea.tsx
  - constants
    - index.ts
  - context
    - AuthContext.tsx
  - globals.css
  - hooks
    - useDebounce.ts
  - lib
    - appwrite
      - api.ts
      - appwrite.ts
    - react-query
      - queries.ts
      - queryKeys.ts
    - validation
      - index.ts
  - main.tsx
  - types
    - index.ts
  - utils
    - Auth.ts
    - utils.ts
  - vite-env.d.ts
  - _auth
    - AuthLayout.tsx
    - forms
      - SigninForm.tsx
      - SingupForm.tsx
  - _root
    - pages
      - AllUsers.tsx
      - CreatePost.tsx
      - EditPost.tsx
      - Explore.tsx
      - Home.tsx
      - index.ts
      - LikedPosts.tsx
      - PageNotFound.tsx
      - PostDetails.tsx
      - Profile.tsx
      - ProfilePosts.tsx
      - ProtectedRoute.tsx
      - Saved.tsx
      - UpdateProfile.tsx
    - RootLayout.tsx
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
