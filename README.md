# Northstar Support AI

# NORTHSTAR SPRINT — SUPPORT DEFLECTION MVP

> **Quality Finds. Delivered.**

Northstar Support AI is a collaborative, high-fidelity **Support Deflection MVP** built for **Northstar Retail Co.**, a fictional mid-sized e-commerce company whose customer-support team is overwhelmed by repetitive customer requests.

The project demonstrates how a modern e-commerce experience can combine shopping functionality with an **AI-ready customer support assistant, automated support workflows, responsible escalation, and operational visibility**.

The application is designed and developed using **Lovable**, with the project source managed through **GitHub** and prepared for deployment through **Vercel**.

---

## 📌 Project Overview

Northstar Retail Co. needs to reduce the amount of repetitive work handled manually by its customer-support team.

The MVP focuses on three major support categories:

1. **Order Status**
2. **Returns & Refunds**
3. **Stock Availability**

The central principle of the project is:

> **Simple, repetitive, low-risk customer questions should be resolved automatically whenever possible, while uncertain, unusual, sensitive, or higher-risk cases should be clearly escalated to human support.**

The goal is not to automate everything blindly, but to demonstrate a responsible and practical approach to **support deflection**.

---

# 🎯 Project Mission

The Northstar team was tasked with designing and building a polished e-commerce and customer-support experience that demonstrates how automation can reduce repetitive support workload while maintaining:

* Transparency
* Human oversight
* Customer privacy
* Responsible automation
* Clear escalation
* Operational visibility
* Auditability
* A path toward future production integration

---

# 🏢 Client

## Northstar Retail Co.

Northstar Retail Co. is a fictional modern mid-sized e-commerce retailer.

### Brand Tagline

**Quality Finds. Delivered.**

### Brand Personality

* Modern
* Premium
* Trustworthy
* Customer-focused
* Friendly
* Simple
* Professional

### Visual Identity

The interface uses a polished retail design system featuring:

* Deep navy
* White
* Warm gold/amber accents
* Soft gray surfaces
* Dark readable text
* Subtle shadows
* Rounded cards
* Clean modern typography
* High-quality product imagery

The goal is to create a credible product that could be demonstrated to:

* Clients
* Investors
* Procurement teams
* Business partners
* Developers
* Operations teams
* Customer-support leadership

---

# 💡 Business Problem

Northstar's customer-support team receives many repetitive questions that can potentially be resolved without manual intervention.

### 1. Order Status

Customers may ask:

* Where is my order?
* Has my order shipped?
* When will my order arrive?
* What is happening with my order?

Example:

> **Order NS-2026-10482 is currently Out for Delivery. Estimated delivery: Today.**

---

### 2. Returns & Refunds

Customers may ask:

* How do I return an item?
* Can I return my product?
* When will I receive my refund?
* What is the return policy?

The system provides prototype guidance while identifying situations that should be escalated to human support.

---

### 3. Stock Availability

Customers may ask:

* Is this product available?
* Do you have another size?
* Do you have another colour?
* When will this product be available?

The system uses mock product and inventory data to provide availability information and, where appropriate, alternatives.

---

# 🛍️ Product Experience

The MVP includes a complete prototype customer shopping journey:

```text
Homepage
   ↓
Browse Products
   ↓
Search / Filter
   ↓
Product Details
   ↓
Add to Cart
   ↓
Checkout
   ↓
Order Confirmation
```

The support journey operates alongside the shopping experience:

```text
Customer
   ↓
Ask Northstar
   ↓
Submit Support Query
   ↓
Validate Request
   ↓
Check Relevant Mock Data
   ↓
Generate Response
   ↓
Resolve or Escalate
   ↓
Log Outcome
```

---

# 🏠 Homepage

The Northstar homepage provides:

* Responsive navigation
* Product discovery
* Search
* Wishlist
* Account access
* Shopping cart
* Promotional content
* Deals
* Category discovery
* Ask Northstar support entry point

### Hero Section

**Find What Moves You.**

> Discover quality products, everyday essentials, and great deals — all in one place.

Primary actions:

* Shop Now
* Explore Deals

The homepage also prominently introduces:

## Ask Northstar

> **Need help with an order, return, refund, or product availability? Ask Northstar and get a fast response.**

---

# 🛒 Product Catalog

The MVP includes realistic mock products such as:

* Northstar Wireless Headphones
* Urban Essential Backpack
* Smart Fitness Watch
* Minimal Desk Lamp
* Premium Water Bottle
* Everyday Sneakers
* Portable Bluetooth Speaker
* Smart LED Light

Products include:

* Product imagery
* Name
* Price
* Original price where applicable
* Rating
* Sale badges
* Stock status
* Wishlist actions
* Add-to-cart actions

### Mock Inventory States

* In Stock
* Low Stock
* Out of Stock
* Restocking Soon

The inventory information is reusable by the support-deflection experience.

---

# 🔎 Search & Filtering

Customers can search the product catalog using terms such as:

* Headphones
* Sneakers
* Home office
* Fitness
* Gifts
* Speakers

Filtering includes:

* Category
* Price
* Rating
* Availability

Sorting includes:

* Featured
* Price: Low to High
* Price: High to Low
* Best Rated

---

# 📦 Product Details

Product pages provide:

* Product gallery
* Product name
* Rating
* Reviews
* Price
* Sale price
* Description
* Specifications
* Stock status
* Product variations
* Quantity selector
* Add to Cart
* Buy Now
* Wishlist

A **You May Also Like** section provides related products.

---

# 🛍️ Cart & Checkout

Customers can:

* Add products
* Remove products
* Change quantities
* View subtotal
* View delivery cost
* View total
* Continue shopping
* Proceed to checkout

The checkout is a **prototype only** and does not process real payments.

### Customer Information

* Full Name
* Email
* Phone

### Delivery Information

* Address
* City
* Province/Region
* Postal Code

### Delivery Methods

* Standard Delivery
* Express Delivery

### Mock Payment Methods

* Credit/Debit Card
* EFT/Bank Transfer
* Digital Wallet

After checkout, the customer receives a mock order confirmation.

Example:

**Order: NS-2026-10482**

**Estimated delivery: 3–5 business days**

The generated mock order can subsequently be used by the support experience.

---

# 🤖 Ask Northstar

## Primary Support Deflection Feature

**Ask Northstar** is the central support experience of the MVP.

Customers can ask questions about:

* Orders
* Shipping
* Returns
* Refunds
* Stock availability
* Products
* Recommendations
* Payments
* General questions

### Query Form

The form includes:

* Name
* Email
* Query Type
* Order Number where applicable
* Customer Question

The customer receives a unique query reference such as:

**NSQ-2026-10482**

After submission:

> **Query Received ✓**

The customer receives confirmation that their request has been received and that a response will be provided through the prototype workflow.

Customer information is not intended to be publicly exposed.

---

# ⚙️ Support Automation

The MVP uses **Lovable-based application logic and realistic mock data** to demonstrate support automation.

No n8n workflow is required for the current MVP.

No external automation platform is required for the current demonstration.

## Order Status

Example:

> Where is my order NS-2026-10482?

The system:

1. Validates the order number.
2. Checks the mock order data.
3. Determines the order status.
4. Provides available delivery information.
5. Escalates when the order cannot be confidently matched.

---

## Returns & Refunds

Example:

> How do I return this item?

The system:

1. Identifies the request.
2. Provides prototype return guidance.
3. Explains the applicable prototype refund process.
4. Escalates exceptions or ambiguous cases.

---

## Stock Availability

Example:

> Do you have the Everyday Sneakers in size 42?

The system:

1. Identifies the product.
2. Checks mock inventory.
3. Returns availability.
4. Suggests alternatives where appropriate.
5. Avoids making unsupported restock promises.

---

# 👩‍💼 Human Escalation

Automation should not attempt to resolve every situation.

The system can identify cases that require human review, including:

* Unmatched orders
* Conflicting information
* Exceptional refund cases
* Unusual requests
* Low-confidence responses
* Situations requiring human judgment

Example:

> **We couldn't confidently resolve this request automatically. Your query has been flagged for review by a Northstar support team member.**

The application does not pretend that automated responses were written by a human when they were not.

---

# 📊 Support Operations Dashboard

The MVP includes a lightweight support/operations dashboard.

### Key Metrics

* Total queries
* Automatically resolved queries
* Escalated queries
* Resolution rate
* Queries by ticket type
* Recent activity

### Query Information

The dashboard can display:

* Reference number
* Query type
* Status
* Automation result
* Escalation/resolution state
* Timestamp

Possible statuses include:

* Received
* Processing
* Answered
* Escalated
* Closed

The dashboard demonstrates how Northstar could monitor the operational impact of support automation.

---

# 👤 Customer Account

The prototype account experience includes:

* Recent Orders
* Wishlist
* Account Details
* Saved Addresses
* Customer Queries

Example:

**NSQ-2026-10482**

Status:

**Answered**

---

# 🔥 Deals

A dedicated deals experience highlights discounted products with:

* Original price
* Sale price
* Discount percentage
* Add-to-cart functionality

Headline:

> **Big Deals. Better Shopping.**

---

# ℹ️ About Northstar

### Built Around Better Shopping

Northstar Retail Co. is a modern online retailer focused on bringing quality products, great value, and a simple shopping experience to customers.

### Quality

Curated products selected with customers in mind.

### Value

Competitive prices and meaningful deals.

### Convenience

A simple experience from product discovery to delivery.

---

# 📱 Responsive Design

The application is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive considerations include:

* Mobile navigation
* Hamburger menu
* Responsive product grids
* Mobile-friendly forms
* Accessible Ask Northstar experience
* Mobile checkout
* Clear interaction states

Accessibility, readability, and usability are prioritized throughout the experience.

---

# 🧠 Responsible AI Approach

Although this is an MVP and uses prototype/mock data, the project is designed around responsible automation principles.

The system prioritizes:

* Transparency
* Human oversight
* Data minimization
* Privacy awareness
* Explainability
* Escalation
* Auditability
* Responsible automation
* Testing and review

Automation should assist customer support rather than remove human judgment from situations where human intervention is necessary.

---

# 🛡️ Governance Frameworks

The project considers the following governance frameworks in its design and documentation.

## ETHICS

* Empathy
* Transparency
* Human impact
* Ownership and mitigation
* Sovereignty

## TRACK

* Training/data awareness
* Representation
* Amplification risks
* Counterfactual testing
* Kill switch

## OASIS

* Opt-in and appropriate consent
* Mitigation
* Anonymization
* Sovereignty
* Intentionality
* Security

## PRIDE

* Pause points
* Review cadence
* Interpretability
* Disagreement handling
* Expert/stakeholder review

## HORIZON

* Historical harm
* Opportunity cost
* Ripple effects
* Intergenerational impacts
* Zero-sum outcomes
* Open futures
* Non-human considerations

## TRAIL

* Transient data
* Relational context
* Archival decisions
* Inheritance
* Data sovereignty

## CYCLE

* Capture
* Yield insights
* Course correction
* Loop validation
* Explain

## RANK

* Roles
* Authority
* Notification
* Kill switch

## HUNT

* Handoff
* Unified context
* Negotiation/clarification
* Termination

## GUARD

* Guardrails
* Unusual pattern detection
* Audit trail
* Red-team testing
* Dignity filter

These frameworks are intended to influence system behavior, review processes, documentation, and operational controls rather than exist only as decorative concepts.

---

# 🗓️ One-Week Industry Simulation

The project is structured as a simulated one-week client engagement.

| Day   | Focus              | Key Outputs                                                              |
| ----- | ------------------ | ------------------------------------------------------------------------ |
| Day 1 | Discovery          | Problem analysis, ticket prioritization, user journeys, success criteria |
| Day 2 | UX & Architecture  | Product architecture, data model, workflows, escalation rules            |
| Day 3 | E-commerce         | Homepage, catalog, product pages, search, cart, checkout                 |
| Day 4 | Support Deflection | Ask Northstar, query validation, support resolution, escalation          |
| Day 5 | Operations         | Dashboard, query logging, metrics, integration readiness                 |
| Day 6 | Testing            | Functional tests, edge cases, responsible AI review                      |
| Day 7 | Handover           | Demo, readiness assessment, documentation, final review                  |

---

# 📋 Assessed Deliverables

## Deliverable 1 — Working Support Deflection MVP

The MVP demonstrates:

* Customer shopping journey
* Product discovery
* Mock checkout
* Order generation
* Ask Northstar
* Order-status support
* Returns/refund guidance
* Stock availability
* Automated prototype responses
* Human escalation
* Query logging
* Support monitoring

---

## Deliverable 2 — Go-Live Readiness Note

The readiness assessment identifies:

### What Works

Completed and tested functionality.

### Known Limitations

Prototype limitations, mock data, assumptions, and incomplete integrations.

### Future Ownership Requirements

Before production deployment, Northstar would need to consider:

* Real order-management integration
* Real inventory integration
* Production authentication
* Production email service
* Security review
* Data-retention policies
* AI governance
* Monitoring
* Human support ownership
* Production testing

The project does not claim prototype functionality is production-ready when it is not.

---

## Deliverable 3 — Collaboration & Audit Trail

The GitHub repository provides evidence of project development through:

* Commits
* Pull requests where applicable
* Feature development
* Testing updates
* Documentation
* Governance decisions
* Bug fixes
* Team contributions

Example commit structure:

```text
feat: build Ask Northstar query workflow
feat: add mock order-status lookup
feat: implement stock availability resolver
feat: add human escalation handling
feat: create support operations dashboard
test: add ambiguous order-number cases
fix: prevent unsupported refund promises
docs: add go-live readiness assessment
docs: record responsible AI review
```

The purpose of the audit trail is to make it possible to understand:

* What changed
* Why it changed
* Who contributed
* What was reviewed
* What remains unresolved

---

# 🧪 Testing

The project should be evaluated using both successful and failure scenarios.

## Happy Paths

* Valid order-status lookup
* Valid return question
* Valid refund question
* Valid stock query
* Product recommendation
* Successful query submission
* Successful prototype response

## Edge Cases

* Invalid order number
* Missing customer information
* Invalid email
* Ambiguous product name
* Out-of-stock product
* Contradictory mock data
* Unknown query type
* Low-confidence response
* Automation failure
* Human escalation

---

# 🚧 Prototype Boundaries

This project is a **high-fidelity MVP/prototype**, not a production e-commerce platform.

The current implementation uses realistic mock data where real business systems are unavailable.

The prototype does **not** require:

* Real payment processing
* Real inventory APIs
* Real shipping APIs
* Production authentication
* Production AI credentials
* Production order-management integration
* Production email infrastructure

No real payment transactions are processed.

No production credentials should be stored in the repository.

---

# 🔮 Future Integration

The current MVP is intentionally focused on a **Lovable-based implementation**.

Future production architecture could integrate external services when required, for example:

```text
Northstar Website
       ↓
Production API
       ↓
Order / Product / Inventory Systems
       ↓
AI Support Processing
       ↓
Email / Notification Service
       ↓
Customer
```

External automation platforms such as n8n are **not part of the current MVP implementation**.

They may be considered in a future production architecture if Northstar requires them.

---

# 💻 Technology Stack

The current project uses:

* **Lovable** — Application development and AI-assisted implementation
* **React** — Frontend application framework
* **TypeScript** — Application programming language
* **GitHub** — Source control and team collaboration
* **Vercel** — Planned/target deployment platform

The exact implementation may evolve as the MVP develops.

---

# 🤝 Team & Collaboration

This is a **collaborative team project**.

All designated team members are recognized as **Project Leads / Co-Leads**.

Each team member is responsible for meaningful participation in the planning, development, testing, documentation, review, or delivery of the MVP.

### Project Leads

| Team Member         |       Role                   |
| ------------------- |       ---------------------- |
| **Rose Athulon**    |       Project Lead / Co-Lead |
| **Austin Tlhako**   |       Project Lead / Co-Lead |
| **Eva Mbuni**       |       Project Lead / Co-Lead |
| **Mohamed Issack**  |       Project Lead / Co-Lead |
| **Faith Audisa**    |       Project Lead / Co-Lead |


### Collaboration Model

The team uses GitHub to support:

* Source-code management
* Collaboration
* Contribution tracking
* Feature development
* Documentation
* Testing
* Project review

Where appropriate, contributors may work through branches and pull requests before changes are merged into the main project.

---

# 🔗 Lovable & GitHub

This project was developed using **Lovable** and synchronized with GitHub.

The initial project structure and automated synchronization may contain commits created through Lovable's GitHub integration.

Subsequent human contributions are represented through the individual GitHub accounts of the team members.

This repository therefore provides a transparent development history showing the transition from the initial Lovable-generated project to collaborative team development.

---

# 🚀 Development

The project can be developed through Lovable or locally using Node.js and npm.

### Clone the Repository

```bash
git clone <repository-url>
cd northstar-helper-bot
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The exact commands may vary depending on the project's current configuration.

---

# 🌐 Deployment

The project is intended to be deployed using **Vercel**

Recommended deployment flow:

```text
Lovable
   ↓
GitHub
   ↓
Vercel
   ↓
Live Northstar Application
```

Future changes can be synchronized through GitHub and deployed through the connected Vercel project.

---

# 🔐 Security & Privacy

The project follows basic security principles appropriate for an MVP:

* Do not commit API keys.
* Do not commit passwords.
* Do not expose secrets.
* Do not process real payment information.
* Do not publicly expose unnecessary customer information.
* Use environment variables for future credentials.
* Use mock data for demonstration purposes.

Before production deployment, a complete security and privacy review would be required.

---

# ✅ Success Criteria

The MVP is successful if a stakeholder can demonstrate that a customer can:

1. Browse products.
2. Search and filter products.
3. View product details.
4. Add products to a cart.
5. Complete a mock checkout.
6. Receive a mock order number.
7. Ask Northstar a support question.
8. Receive an automated prototype response.
9. Understand when human support is required.
10. Have the support interaction reflected in the operations experience.

The business value is demonstrated by showing how repetitive support questions can be **deflected, resolved, monitored, and escalated responsibly**.

---

# 🏆 Final Outcome

Northstar Helper Bot demonstrates a practical approach to combining:

**E-commerce + Customer Support + Automation + Responsible AI + Operational Visibility**

The MVP is designed to show how Northstar Retail Co. can reduce repetitive manual support work while maintaining:

* Customer trust
* Transparency
* Human oversight
* Responsible automation
* Operational visibility
* Auditability
* Future integration readiness

---

## Project Status

**🚧 Active Development — Northstar Sprint Support Deflection MVP**

Built collaboratively with **Lovable + GitHub**, with Vercel deployment planned for the live demonstration.

---

## License

This project is an educational/prototype project developed for the Northstar Sprint simulation.

---

### Built with Lovable

> **Northstar Retail Co. — Quality Finds. Delivered.**
