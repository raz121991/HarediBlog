# Haredi Blog

Haredi Blog is a platform dedicated to individuals in the religious dating community, providing a space for sharing experiences, feelings, and advice. The project is built with the latest version of ReactJS on the frontend and .NET 8 on the backend, with Microsoft SQL as the database.

## Features

- User-friendly interface for reading and writing blog posts
- Commenting system for community interaction
- Responsive design for all devices

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later recommended)
- npm (v6 or later recommended)
- .NET 8 SDK
- Microsoft SQL Server

### Installation

#### Frontend (ReactJS)

1. **Clone the repository:**
   ```sh
   git clone https://github.com/raz121991/HarediBlog
2. Navigate to the frontend directory:
   cd HarediBlog/harediblog(client)
3. Install the dependencies:
   npm install
4. Run the development server:
   npm run dev

#### Backend (.NET 8)

1. Navigate to the backend directory:
   cd HarediBlog/HarediMatchBlog(server)
2. Restore the .NET Core dependencies:
dotnet restore
3. Update the database connection string:
   Open appsettings.json and update the connection string to match your Microsoft SQL Server instance.
4.Apply database migrations:
dotnet ef database update
5. Run the backend server:
   dotnet run

#### Running the Project

1. Start the frontend server:
   npm run dev
   
2. Start the backend server:
 dotnet run

3. Open your browser and navigate to the frontend server URL 
