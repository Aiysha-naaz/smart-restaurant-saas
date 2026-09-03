# Smart Restaurant Management SaaS

A multi-tenant SaaS platform for restaurant management — built end-to-end with manager/staff dashboards, live order flow, inventory tracking, and AI-powered insights.

## Features

- **Multi-tenant architecture** — each restaurant gets a unique restaurant ID with isolated data, and free/paid subscription tiers
- **Menu & inventory management** — manual entry or AI/OCR-based menu scanning, with manager review before publishing; auto-disables menu items when required ingredient stock runs low
- **Customer-facing QR menu** — per-table digital menu highlighting trending/seasonal items
- **Order state machine** — orders move through a strict lifecycle: `pending → accepted → preparing → ready → served → completed`, with role-gated transitions (kitchen can move pending→preparing→ready, waiter can move ready→served→completed) and rejection of invalid transitions
- **Inventory deduction tied to order state, not placement** — stock is deducted only when an order is `accepted` (not when placed), preventing abandoned/fake orders from draining inventory; automatically rolled back if an order is cancelled post-acceptance
- **Per-order cost & profit snapshotting** — cost and profit are calculated from ingredient prices at the moment of order creation, not live inventory cost, so historical profit stays accurate even if ingredient prices change later
- **Staff & table management** — waiter assignment, table status tracking, customer-triggered "table cleaned" alerts
- **AI recommendations** — top-sellers, seasonal favorites, and trend-based suggestions the manager can promote
- **Analytics dashboard** — dashboard KPIs (orders today, revenue, table occupancy, low-stock/critical alerts) plus deeper analytics (top/least-selling items, hourly and weekly revenue trends, peak-hour detection) feeding into the AI recommendation layer
- **Simulated payments** — with SMS confirmation flow
- **Auth & access control** — JWT-based authentication (bcrypt-hashed passwords), restaurant-scoped permissions via middleware that attaches the authenticated user's restaurant ID to every protected request

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui, Vite
**Backend:** Node.js, Express.js, MongoDB (Mongoose)
**AI/OCR:** Used for automated menu setup and trend-based recommendations

## Project Notes

The initial frontend UI was scaffolded using Lovable AI to accelerate setup given the scope of the project, then extended with custom pages, components, and business logic (auth flows, dashboards, order management, analytics) built independently. All backend logic — API routes, controllers, models, and AI/OCR integration — was built from scratch.

## Authentication Flow

1. On register, a restaurant is created with a public ID, a manager `User` is created with a bcrypt-hashed password, and a JWT (`{ id, restaurantId }`, 7-day expiry) is signed and returned.
2. On login, the submitted password is compared against the stored hash with `bcrypt.compare`; on success a fresh JWT is issued.
3. Protected routes use an `authMiddleware.protect` function that verifies the JWT, re-fetches the user from the DB, and attaches `req.user.restaurantId` to the request — this is what scopes every protected query to the correct tenant.

## Status

Actively developed and being hardened — auth coverage across all routes and full frontend-token integration are in progress. Not yet deployed.

## Structure

```
├── backend/          # Express API, MongoDB models, controllers, routes
├── frontend/          # React + TypeScript client
└── screenshots/       # App screenshots
```

## Getting Started

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Set up your own `.env` file in `backend/` with the required environment variables (MongoDB URI, JWT secret, AI API keys, etc.) — see `.env.example` if provided, or check `config/db.js` and `utils/ai.js` for required keys.
