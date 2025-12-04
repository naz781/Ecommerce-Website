# React + Vite + Supabase Project

A modern **React** application built with **Vite** and **Supabase** for backend services.  
This project demonstrates using Supabase for database operations, authentication, and hosting a React app on **HostGator** as a static site.

---

## **Project Description**

This project includes:

- React + Vite frontend
- Supabase backend (database & authentication)
- Environment variable management for sensitive keys
- Static deployment-ready build for traditional hosting (like HostGator)
- Easy local development setup

The app can be extended to include user authentication, data fetching, forms, and dynamic pages with Supabase.

---


## **Features**

- Fast React development with Vite
- Secure handling of Supabase API keys using `.env`
- Static site deployment compatible with HostGator
- Ready-to-build folder structure (`dist/`) for production
- Example database fetching with Supabase

---


## **1. Clone the Project**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

## Step 2: Build Your React App

Open a terminal inside your project folder and run:

```bash
npm run build
```

# How to Upload a React Website on HostGator

This guide will walk you through uploading your React website to HostGator, including configuring your project to work with a Supabase backend.

---

## Prerequisites

Before starting, make sure you have:

1. A **HostGator account** with access to cPanel.
2. Your **React project** ready to deploy.
3. Node.js installed on your computer (for building the React app).
4. Supabase project set up (if your app uses a database).

## Step 3: Log in to HostGator cPanel

1. Visit https://portal.hostgator.com
   and log in.
2. Go to Hosting → cPanel.
3. Open File Manager.

## Step 4: Navigate to Your Domain Folder

If deploying to your main domain:
public_html/

If deploying to an addon domain:
public_html/yourdomain.com/

Make sure you upload inside the correct folder for the correct domain.

## Step 5: Upload Your React Build

Open your domain folder in File Manager.

Click Upload → Select Files.

Upload everything inside the build folder (not the folder itself).

After upload, ensure you see items like:

index.html
static/
asset files...

## Step 6: Enable SSL (HTTPS) — Recommended

Enable SSL in cPanel for secure access.

## Step 7: Check your site runs on:

https://yourdomain.com

## Step 8: Updating Your Site in Future

Whenever you update the code:
npm run build
Re-upload files inside build/ to public_html and overwrite.

---

#### If you find this project useful, give it a ⭐ to support!

