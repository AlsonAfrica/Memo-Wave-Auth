# Audio Recording App

# Project Overview: Memo-Wave-Auth

This project builds upon the previous Digital Journal App to create an enhanced Audio Recording App with additional features designed to improve user experience, security, and functionality.


# Table of Contents

1. Features

2. Tech Stack

3. Features


# Tech Stack
- React Native
- JavaScript 
- Firebase (Authentication)
- Expo (Development environment) version 52.0.9


## Features

### 1. Login and Registration
- Implement a user authentication system with login and registration functionality.
- Users can create an account, log in, and access personalized features.

## Login and Registration (Through firebase)

![image](https://github.com/user-attachments/assets/8635dd41-9c13-4a88-97a2-0b70e1b7a102)

- User authentication system.

- Secure login and registration forms.

### 2. Protected Routes (Auth)
- Secure certain routes in the app that require authentication to access (e.g., profile, settings).
- Unauthenticated users will be redirected to the login page.

### 3. Profile Page
- Create a profile page where users can view and edit their personal information (e.g., name, email, password).
- Profile data is securely stored and can be updated by the user.

## Protected Routes
- Restrict access to sensitive pages such as Profile and Settings unless authenticated.

## Profile Page
- View and edit user information (e.g., name, email, password).

![image](https://github.com/user-attachments/assets/221c50bb-961f-4a9d-bd36-409f1ec5f64c)

### 5. User Feedback
- Includes a feature for users to provide feedback or report issues directly within the app.
- Feedback will be sent to the development team for review and improvement.

### 6. Social Sharing
- Enable users to share their recorded voice notes on social media platforms (e.g., Facebook, Twitter, Instagram).
- Easy-to-use sharing options directly within the app.

### 7. Cloud Integration
- Integrated with cloud storage services (Firebase) to back up and sync voice notes across devices.
- Users can access their recordings from multiple devices, ensuring they never lose their data.

### 9. User Privacy
- Ensure user data is protected by implementing security best practices.
- Adhere to privacy regulations such as GDPR, CCPA, POPI, etc., to ensure users' personal data is handled responsibly.


## Installation

1. Clone the repository:
   ```bash
   [git clone https://github.com/your-username/birthday-card-app.git](https://github.com/AlsonAfrica/Memo-Wave-Auth.git)

2. Install the required dependencies:
   ```bash
     npm install

3. Run Project:
   ```bash
     npx expo start

3. Scan the provided QR code:
 

# Usage

- Login/Registration: Users can sign up or log in with their credentials.
- Record Audio: Use the app's built-in recording feature to capture voice notes.
- Profile: Edit and view personal information in the profile page.
- Settings: Customize preferences and manage notifications in the settings.
- Share: Share voice notes on social media platforms directly from the app.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

