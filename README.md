# Faddom AWS EC2 CPU Monitor

This full-stack project monitors CPU usage for a specified AWS EC2 instance. The backend connects to AWS CloudWatch to retrieve CPU utilization metrics, and the frontend visualizes the data using Chart.js.

## Project Structure

- `backend/` – Node.js, Express, TypeScript API for retrieving CPU metrics
- `frontend/` – React, TypeScript, Vite app for interacting with the user and rendering the chart

## Features

- Query CPU usage of a given EC2 instance by private IP
- User-selectable time period and sampling interval
- Chart.js integration for CPU utilization visualization

## Technologies Used

- AWS SDK v3
- Express with TypeScript
- React with TypeScript
- Vite
- Chakra UI
- Chart.js
- Axios

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm
- AWS credentials for access to CloudWatch

### 1. Clone the repository

```bash
git clone https://github.com/kjonathan098/aws-cpuUsage.git

```
### 2. Backend Setup

```bash
cd backend
npm install
```
Create a .env file with the following content:
- AWS_ACCESS_ID=YOUR_ACCESS_ID
- AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
- REGION=YOUR_REGION
- IP_ADDRESS=YOUR_IP_ADDRESS

```bash
npm run dev
```

### 3. Fronted Setup
```bash
cd frontend
npm install
npm run dev
```
Visit the app in your browser at:
http://localhost:5173

### Usage
Enter the private IP of the EC2 instance (default is pre-filled)

Select a time range (e.g., last 24 hours)

Select a sampling interval (e.g., every 5 minutes)

Submit the form to view the CPU usage chart

### Notes
AWS CloudWatch has a maximum of 1,440 data points per request. Interval options are validated to stay within this limit.


