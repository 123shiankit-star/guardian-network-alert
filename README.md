# GuardMe - Emergency Safety App

Your personal emergency safety shield. Send SOS alerts, access offline features, and stay protected even without network connectivity.

## Features

- **SOS Button**: Press and hold for 3 seconds to send emergency alerts to all contacts
- **Emergency Contacts**: Manage emergency contacts with phone call initiation
- **Emergency Types**: Quick access to Police, Fire, Medical, Accident, Safety, and Family emergency options
- **Offline Features**: Bluetooth alerts, GPS tracking, siren mode, and SOS flash signals
- **Network Status**: Real-time network connectivity monitoring
- **Location Capture**: Automatically captures and shares your location with emergency alerts

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd guardian-network-alert

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8081/`

## Technology Stack

- **Vite** - Fast frontend build tool
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **Framer Motion** - Animation library
- **shadcn-ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Sonner** - Toast notifications

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.
