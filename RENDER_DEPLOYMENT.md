# Render Deployment Guide

## Overview

This guide explains how to deploy both the frontend (React) and backend (Node/Express) to Render and configure environment variables for production.

## Architecture

- **Backend**: Node.js/Express API running on Render
- **Frontend**: React app running on Render (or another service)
- **Communication**: The frontend makes API calls to the backend using the `REACT_APP_API_URL` environment variable

## Step 1: Deploy Backend to Render

### Prerequisites
- GitHub account with your repository pushed
- Render account (https://render.com)

### Create Backend Service

1. Go to https://render.com and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the configuration:
   - **Name**: `adx-api-directory-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free tier is fine for development

5. Click **"Deploy"** and wait for deployment to complete

6. Once deployed, note your backend URL (e.g., `https://adx-api-directory-backend.onrender.com`)

## Step 2: Deploy Frontend to Render

### Create Frontend Service

1. Go to https://render.com → **"New +"** → **"Static Site"** (or Web Service for React)
2. Connect your GitHub repository
3. Fill in the configuration:
   - **Name**: `adx-api-directory-frontend` (or your preferred name)
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `client/build`

4. Click **"Advanced"** and add environment variables (see Step 3 below)

## Step 3: Configure Environment Variables

### For Frontend (React)

On the Render dashboard for your frontend service:

1. Go to **"Environment"** tab
2. Add this environment variable:
   ```
   REACT_APP_API_URL=https://adx-api-directory-backend.onrender.com
   ```
   Replace with your actual backend URL from Step 1

3. Click **"Save"**
4. Trigger a redeploy (the UI will prompt you)

### For Backend

On the Render dashboard for your backend service:

1. Go to **"Environment"** tab
2. No additional environment variables are required, but you can add:
   ```
   NODE_ENV=production
   ```

3. Click **"Save"**

## Step 4: Verify Deployment

1. Open your frontend URL in a browser
2. Test that the app loads and API calls work (e.g., loading APIs, adding/editing APIs)
3. Check the browser console for any CORS or network errors
4. Check Render logs if there are issues

## Environment Variable Reference

### `.env.local` (Development - DO NOT COMMIT)
```
REACT_APP_API_URL=http://localhost:3001
```

### `.env` (Production Default - Committed to repo)
```
REACT_APP_API_URL=https://your-render-backend-url.onrender.com
```

### Render Environment Variables (Production)
Set `REACT_APP_API_URL` in the Render dashboard UI for your frontend service.

## Troubleshooting

### API calls return 404 or fail to connect
- Verify the `REACT_APP_API_URL` in Render environment variables
- Ensure backend service is running and accessible
- Check browser console for CORS errors

### Frontend won't load
- Check that build was successful in Render logs
- Verify root directory and build command are correct

### "Your frontend is trying to call localhost:3001"
- This means `REACT_APP_API_URL` is not set correctly in production
- Update the environment variable in the Render dashboard
- Trigger a redeploy

## Additional Notes

- The proxy setting in `client/package.json` only applies to local development
- In production, the React app uses the `REACT_APP_API_URL` environment variable
- Both services can be on the free Render tier, but they may spin down after 15 minutes of inactivity
- For a production app, upgrade to paid plans for better performance

## Local Development

To test locally:
1. Start the backend: `node server.js`
2. Start the frontend: `cd client && npm start`
3. The frontend will use `http://localhost:3001` (from `.env.local`)
