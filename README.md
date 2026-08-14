# Northstar Assistant

# NORTHSTAR SPRINT — SUPPORT DEFLECTION MVP

## Role and Mission

Act as a **senior full-stack software engineer, AI automation specialist, customer-support systems architect, supply chain technology consultant, UX/UI designer, and responsible AI practitioner**.

You have been engaged by **Northstar Retail Co.**, a fictional mid-sized e-commerce company whose customer-support team is overwhelmed by repetitive tickets.

Your mission is to design and build a polished, high-fidelity **Support Deflection MVP** that reduces unnecessary manual support work while providing customers with fast, clear, responsible, and useful assistance.

The MVP must combine:

1. A professional e-commerce website prototype.
2. An AI-ready customer query assistant called **Ask Northstar**.
3. Automated support workflows for repetitive customer questions.
4. A lightweight support/operations dashboard for monitoring queries and automation outcomes.
5. A future-ready integration architecture for:

**Northstar Website → API/Webhook → n8n → AI Processing → Product/Order Data → Email Response → Customer**

The solution must be demoable end-to-end using realistic mock data.

---

# 1. CLIENT CONTEXT

## The Client

**Northstar Retail Co.**

A modern mid-sized e-commerce retailer.

### Tagline

**Quality Finds. Delivered.**

### Brand Personality

The brand should feel:

* Modern
* Premium
* Trustworthy
* Customer-focused
* Friendly
* Simple
* Professional

### Visual Identity

Use a polished design system featuring:

* Deep navy
* White
* Warm gold or amber accents
* Soft gray surfaces
* Dark readable text
* Subtle shadows
* Rounded cards
* Clean modern typography
* High-quality product imagery

The final product must look like a credible retail technology solution suitable for demonstration to:

* Clients
* Investors
* Procurement teams
* Business partners
* Developers
* Operations teams
* Customer-support leadership

Do not create a generic template. Build a cohesive, realistic retail experience.

---

# 2. BUSINESS PROBLEM

Northstar's support team is overwhelmed by three repetitive ticket categories:

## A. Order Status

Typical customer questions include:

* "Where is my order?"
* "Has my order shipped yet?"
* "When will my order arrive?"
* "What is happening with order NS-2026-10482?"

The system should use mock order data to provide useful responses such as:

> Order NS-2026-10482 is currently **Out for Delivery**.
> Estimated delivery: **Today**.

---

## B. Returns and Refunds

Typical customer questions include:

* "How do I return this?"
* "Can I return my product?"
* "When will I receive my refund?"
* "What is your return policy?"

The system should provide clear prototype return guidance and identify cases that require escalation to a human support agent.

---

## C. Stock Availability

Typical customer questions include:

* "Is this back in stock?"
* "Do you have this in a different size?"
* "When will this item be available?"
* "Do you have another colour?"

The system should use the mock product catalog and inventory data to answer availability questions and, where possible, recommend alternatives.

---

# 3. PRODUCT DEFINITION

Build:

# NORTHSTAR SUPPORT DEFLECTION MVP

The MVP is an **AI-assisted customer support and e-commerce experience** designed to reduce repetitive manual ticket handling.

The solution must support at least **two of the three priority ticket categories**, with the preferred implementation supporting all three:

1. Order status
2. Returns and refunds
3. Stock availability

The system must demonstrate the following principle:

> **Simple, repetitive, low-risk questions should be resolved automatically whenever possible, while uncertain, sensitive, unusual, or high-risk cases should be clearly escalated to a human.**

Do not build a system that blindly automates every decision.

---

# 4. CORE CUSTOMER EXPERIENCE

Build a polished responsive e-commerce website for Northstar Retail Co.

The primary customer journey must work end-to-end:

**Homepage**

↓

**Browse Products**

↓

**Search or Filter Products**

↓

**Product Details**

↓

**Add to Cart**

↓

**Checkout**

↓

**Order Confirmation**

In parallel, demonstrate the support journey:

**Customer**

↓

**Ask Northstar**

↓

**Enter Name and Email**

↓

**Select or Automatically Determine Query Type**

↓

**Enter Question**

↓

**System Validates Request**

↓

**Relevant Mock Product, Order, Return, or Inventory Data Is Checked**

↓

**Automated Response Is Generated**

↓

**Response Is Displayed or Prepared for Email**

↓

**Customer Receives or Simulates Receiving Email Response**

↓

**Query Is Logged in the Support Dashboard**

↓

**Uncertain or Exceptional Cases Are Escalated to Human Support**

---

# 5. HOMEPAGE

Create a premium responsive homepage.

## Sticky Header

Display:

**NORTHSTAR**

Navigation:

* Home
* Shop
* Categories
* Deals
* New Arrivals
* About
* Contact

Include:

* Search
* Wishlist
* Account
* Cart

The navigation must be responsive and convert into a mobile-friendly hamburger menu.

---

# 6. HERO SECTION

Headline:

# Find What Moves You.

Supporting text:

**Discover quality products, everyday essentials, and great deals — all in one place.**

Primary actions:

* Shop Now
* Explore Deals

Include a premium lifestyle or product-focused visual.

Also include a visually prominent support entry point:

### Ask Northstar

**Need help with an order, return, refund, or product availability? Ask Northstar and get a fast response.**

---

# 7. SHOP BY CATEGORY

Create six clickable category cards:

* Electronics
* Fashion
* Home & Living
* Beauty
* Sports & Fitness
* Accessories

---

# 8. PRODUCT CATALOG

Display at least eight realistic products.

Include examples such as:

* Northstar Wireless Headphones
* Urban Essential Backpack
* Smart Fitness Watch
* Minimal Desk Lamp
* Premium Water Bottle
* Everyday Sneakers
* Portable Bluetooth Speaker
* Smart LED Light

Each product must include:

* Product image
* Product name
* Price
* Original price where applicable
* Rating
* Sale badge where applicable
* Stock status
* Wishlist action
* Add to Cart action

Use realistic mock inventory states, including:

* In Stock
* Low Stock
* Out of Stock
* Restocking Soon

This inventory information must be reusable by the support-deflection system.

---

# 9. PRODUCT SEARCH AND FILTERING

Create a functional prototype search experience.

Support searches such as:

* Headphones
* Sneakers
* Home office
* Fitness
* Gifts
* Speakers

Include filters for:

* Category
* Price
* Rating
* Availability

Include sorting:

* Featured
* Price: Low to High
* Price: High to Low
* Best Rated

All search and filtering should use the mock product catalog.

---

# 10. PRODUCT DETAIL PAGE

Each product detail page should include:

* Product gallery
* Product name
* Rating
* Reviews
* Price
* Sale price where applicable
* Description
* Specifications
* Stock status
* Available variations where applicable
* Quantity selector
* Add to Cart
* Buy Now
* Wishlist

Include:

# You May Also Like

Display four related products.

---

# 11. SHOPPING CART AND CHECKOUT

Create a functional frontend cart.

Customers should be able to:

* Add products
* Remove products
* Change quantities
* View subtotal
* View delivery cost
* View total

Include:

* Continue Shopping
* Proceed to Checkout

Create a mock checkout experience.

Collect:

### Customer Information

* Full Name
* Email
* Phone

### Delivery

* Address
* City
* Province/Region
* Postal Code

### Delivery Method

* Standard Delivery
* Express Delivery

### Payment

Display mock payment options:

* Credit/Debit Card
* EFT/Bank Transfer
* Digital Wallet

Do not process real payments.

After placing an order, display:

# Order Confirmed 🎉

**Thank you for shopping with Northstar Retail Co.**

Example order:

**NS-2026-10482**

Estimated delivery:

**3–5 business days**

The order must then become available within the mock order data used by the support automation.

---

# 12. ASK NORTHSTAR — PRIMARY SUPPORT DEFLECTION FEATURE

Create a visually prominent customer-support feature called:

# Ask Northstar

Supporting text:

**Have a question about a product, order, delivery, return, refund, or availability? Send us a message and we'll help you find the answer.**

Create a professional query form containing:

### Name

Placeholder:

**Your name**

### Email

Placeholder:

**[you@example.com](mailto:you@example.com)**

### Query Type

Include:

* Order Status
* Shipping
* Returns & Refunds
* Stock Availability
* Product Question
* Product Recommendation
* Payment
* General Question

### Order Number

Optional where relevant.

### Your Question

Large textarea:

**How can we help you?**

Button:

# Send Query

---

# 13. QUERY VALIDATION AND CUSTOMER EXPERIENCE

When the customer submits a query, validate:

* Name is required
* Email is required
* Email format is valid
* Query type is required
* Question is required

Show:

**Sending your query...**

Then generate a unique query reference such as:

**NSQ-2026-10482**

After successful submission, display:

# Query Received ✓

**Thanks, [Customer Name]. We've received your question.**

**Reference: [Query Reference Number]**

**We'll send our response to [Customer Email].**

Provide:

* Continue Shopping
* View Query Status

Do not publicly expose customer information.

---

# 14. SUPPORT AUTOMATION LOGIC

The system should attempt to resolve repetitive, low-risk queries automatically.

## Order Status Flow

Example:

**Customer:**

> Where is my order NS-2026-10482?

System:

1. Validates the order number.
2. Looks up mock order data.
3. Returns the current status.
4. Provides an estimated delivery date where available.
5. Escalates when the order cannot be found or the information is uncertain.

Example response:

> Your order NS-2026-10482 is currently Out for Delivery. Estimated delivery: Today.

---

## Returns and Refunds Flow

Example:

**Customer:**

> How do I return this item?

System:

1. Identifies the request.
2. Provides applicable return instructions.
3. Explains refund timelines using the prototype policy.
4. Escalates exceptions or ambiguous cases.

Example:

> You can request a return within the eligible return period. Once your item is received and inspected, the refund will be processed according to the selected payment method and the applicable policy.

---

## Stock Availability Flow

Example:

**Customer:**

> Do you have the Everyday Sneakers in size 42?

System:

1. Identifies the product.
2. Checks mock inventory.
3. Returns availability.
4. Suggests an alternative when unavailable.
5. Avoids promising restock dates unless the mock data explicitly contains one.

Example:

> Size 42 is currently out of stock. We have size 41 and 43 available, and similar styles are available in the Fashion category.

---

# 15. HUMAN ESCALATION

The system must include clear escalation rules.

Escalate to human support when:

* Order data cannot be confidently matched.
* A customer disputes information.
* A refund or return falls outside normal rules.
* The system detects contradictory information.
* A query contains unusual patterns.
* The automated system has low confidence.
* The request involves an exception requiring human judgment.

The user must receive a transparent message explaining that the case requires further review.

Example:

> We couldn't confidently resolve this request automatically. Your query has been flagged for review by a Northstar support team member.

Do not pretend automation is a human agent.

---

# 16. EMAIL AND AUTOMATION ARCHITECTURE

Structure the application for future integration with:

**Lovable → Backend/API → n8n → AI Processing → Data Lookup → Email Service**

Primary workflow:

**Customer**

↓

**Northstar Website**

↓

**Ask Northstar Query Form**

↓

**POST /api/customer-query**

↓

**Webhook**

↓

**n8n**

↓

**Validate and Classify Query**

↓

**Retrieve Mock or Future Live Data**

↓

**Generate Responsible Response**

↓

**Apply Guardrails and Escalation Rules**

↓

**Create Email**

↓

**Send Email**

↓

**Return Success Status**

The submitted email address must be used only as the intended destination for the response and should not be publicly displayed.

---

# 17. API DESIGN

Create a clear integration point:

```text
POST /api/customer-query
```

The frontend should submit data conceptually equivalent to:

```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "queryType": "Order Status",
  "orderNumber": "NS-2026-10482",
  "question": "Where is my order?",
  "timestamp": "2026-08-13T12:00:00Z",
  "referenceNumber": "NSQ-2026-10482"
}
```

Requirements:

* Do not hardcode credentials.
* Do not expose API keys.
* Use environment variables.
* Support a configurable:

```text
N8N_WEBHOOK_URL
```

If no webhook is configured, the application must fall back to realistic mock responses.

---

# 18. EMAIL RESPONSE TEMPLATE

Create a professional response format.

**Subject:**

Northstar Retail Co. — Response to Your Query

**Body:**

Hi [Customer Name],

Thank you for contacting Northstar Retail Co.

We've received your query:

> [Customer Question]

### Our Response

[Automated or human-reviewed response]

If you need additional assistance, you may reply to this message.

Kind regards,

**Northstar Retail Co. Customer Support**

**Quality Finds. Delivered.**

If a query is escalated, the response must clearly indicate that a human review is required.

---

# 19. SUPPORT AND OPERATIONS DASHBOARD

Create a lightweight internal dashboard demonstrating the operational value of the MVP.

Display:

## Key Metrics

* Total queries
* Automatically resolved queries
* Escalated queries
* Resolution rate
* Queries by ticket type
* Recent activity

## Query Table

Include:

* Reference number
* Query type
* Status
* Automation result
* Escalated or resolved
* Timestamp

Do not expose unnecessary personal information in dashboard demonstrations.

Include statuses such as:

* Received
* Processing
* Answered
* Escalated
* Closed

The dashboard should demonstrate how Northstar can measure support deflection.

---

# 20. CUSTOMER ACCOUNT PAGE

Create a prototype account page.

Display:

# Welcome back, Alex

Include:

* Recent Orders
* Wishlist
* Account Details
* Saved Addresses
* Customer Queries

Example query:

**NSQ-2026-10482**

Status:

**Answered**

Subject:

**Product Recommendation**

---

# 21. DEALS PAGE

Create a dedicated deals page.

Headline:

# Big Deals. Better Shopping.

Display discounted products with:

* Original price
* Sale price
* Discount percentage
* Add to Cart

---

# 22. ABOUT PAGE

Headline:

# Built Around Better Shopping

Description:

**Northstar Retail Co. is a modern online retailer focused on bringing quality products, great value, and a simple shopping experience to customers.**

Create three sections:

### Quality

Curated products selected with customers in mind.

### Value

Competitive prices and meaningful deals.

### Convenience

A simple experience from product discovery to delivery.

---

# 23. RESPONSIVE DESIGN

The application must work well on:

* Desktop
* Laptop
* Tablet
* Mobile

On mobile include:

* Hamburger navigation
* Two-column product grid where appropriate
* Full-width forms
* Mobile-friendly checkout
* Accessible Ask Northstar form
* Sticky shopping actions where useful

Prioritize accessibility, readability, and clear interaction states.

---

# 24. RESPONSIBLE AI AND GOVERNANCE REQUIREMENTS

Ground the Support Deflection MVP in the following governance frameworks.

These frameworks must influence actual system behavior, interface decisions, documentation, and operational controls rather than appearing only as decorative documentation.

## ETHICS Framework

Apply:

* Empathy
* Transparency
* Human impact
* Ownership and mitigation
* Sovereignty

The system should communicate clearly, avoid deceptive automation, and provide accountability for errors.

---

## TRACK Framework

Implement or document:

* Training/data awareness
* Representation
* Amplification risks
* Counterfactual testing
* Kill switch

Include a mechanism or documented procedure to disable automated responses if harmful or incorrect behavior is detected.

---

## OASIS Protocol

Apply:

* Opt-in and appropriate consent
* Mitigation
* Anonymization
* Sovereignty
* Intentionality
* Security

Collect only the minimum information required for the support workflow.

---

## PRIDE Loop

Incorporate:

* Pause points
* Review cadence
* Interpretability
* Disagreement handling
* Appropriate stakeholder or expert review

The system should support review rather than assuming every automated answer is correct.

---

## HORIZON Scan

Consider:

* Historical harm
* Opportunity cost
* Ripple effects
* Intergenerational impacts
* Zero-sum outcomes
* Open futures
* Non-human considerations where relevant

Document foreseeable impacts of automating customer support.

---

## TRAIL Framework

Consider:

* Transient data
* Relational context
* Archival decisions
* Inheritance
* Land or data sovereignty where relevant

Document how support data should be retained, reviewed, or deleted in a future production system.

---

## CYCLE Engine

Demonstrate:

* Capture
* Yield insights
* Course correction
* Loop validation
* Explain

Use dashboard insights and feedback to show how Northstar could improve the automation over time.

---

## RANK Framework

Define:

* Roles
* Authority
* Notification
* Kill switch

Clarify who can:

* Review automation
* Modify workflows
* Approve deployment
* Disable the system

---

## HUNT Protocol

Support:

* Handoff
* Unified context
* Negotiation or clarification
* Termination

When automation cannot confidently resolve a query, hand the case to a human with sufficient context.

---

## GUARD Framework

Implement or document:

* Guardrails
* Unusual pattern detection
* Audit trail
* Red-team testing
* Dignity filter

The system should avoid harmful, deceptive, discriminatory, or unnecessarily intrusive responses.

---

# 25. ONE-WEEK INDUSTRY WORKING SIMULATION

Treat this project as a real client engagement completed over one week.

## Day 1 — Discovery and Problem Definition

Produce:

* Client problem analysis
* Ticket-type prioritization
* User journeys
* Success criteria
* Initial system architecture
* Responsible AI risk assessment

---

## Day 2 — Solution and UX Design

Produce:

* Product architecture
* Wireframe or component plan
* Data model
* Automation workflow
* Human escalation rules
* Governance and guardrail design

---

## Day 3 — E-Commerce MVP Development

Build:

* Homepage
* Product catalog
* Product details
* Search and filtering
* Cart
* Checkout
* Mock order generation

---

## Day 4 — Support Deflection Automation

Build:

* Ask Northstar
* Query validation
* Order-status resolution
* Returns/refund guidance
* Stock availability support
* Mock email workflow
* Escalation handling

---

## Day 5 — Dashboard and Integration Readiness

Build:

* Support dashboard
* Query logging
* Resolution metrics
* Webhook/API integration point
* n8n-ready architecture
* Environment variable configuration

---

## Day 6 — Testing and Responsible AI Review

Perform:

* Functional testing
* Edge-case testing
* Red-team testing
* Incorrect-order lookup tests
* Ambiguous query tests
* Escalation tests
* Privacy and data-minimization review
* Kill-switch validation

---

## Day 7 — Client Handover and Demo

Prepare:

* End-to-end demonstration
* Go-live readiness note
* Known limitations
* Handover requirements
* Future integration roadmap
* Collaboration and audit evidence
* Final governance compliance report

---

# 26. REQUIRED ASSESSED DELIVERABLES

The one-week engagement must naturally produce the following three deliverables.

## Deliverable 1 — Working Support Deflection MVP

The application must:

* Support at least two priority ticket types.
* Preferably support all three.
* Work end-to-end with mock data.
* Demonstrate customer query submission.
* Demonstrate automated resolution.
* Demonstrate human escalation.
* Demonstrate email or simulated email response.
* Demonstrate query logging and monitoring.

---

## Deliverable 2 — One-Page Go-Live Readiness Note

Create a concise one-page readiness report containing:

### What Works

List the completed, tested functionality.

### Known Limitations or Broken Areas

Clearly identify incomplete functionality, assumptions, mock integrations, and prototype limitations.

### What Northstar Must Take Ownership Of

Identify work that the client's internal team must complete before production deployment, including:

* Real order-management integration
* Real inventory integration
* Authentication
* Production email provider
* Security review
* Data-retention policy
* AI model governance
* Monitoring
* Human support ownership
* Production testing

Do not hide limitations.

---

## Deliverable 3 — Collaboration and Audit Trail

Provide evidence that the project was genuinely collaborative.

Include a realistic audit structure demonstrating:

* Meaningful commits or edit history
* Clear contribution descriptions
* Feature development history
* Review points
* Testing updates
* Governance decisions
* Issue fixes

Example structure:

```text
feat: build Ask Northstar query workflow
feat: add mock order-status lookup
feat: implement stock availability resolver
feat: add human escalation handling
feat: create support operations dashboard
test: add ambiguous order-number cases
fix: prevent unsupported refund promises
docs: add go-live readiness assessment
docs: record AI governance review
```

The audit trail should make it possible for Northstar's procurement team to understand:

* What changed
* Why it changed
* Who or what role contributed
* What was reviewed
* What remains unresolved

---

# 27. SEPARATE GOVERNANCE AND CHECKLIST COMPLIANCE REPORT

Generate a separate report titled:

# Northstar Support Deflection MVP — Responsible AI and Delivery Compliance Report

The report must confirm how the provided:

* AI principles
* ETHICS framework
* TRACK framework
* OASIS protocol
* PRIDE loop
* HORIZON scan
* TRAIL framework
* CYCLE engine
* RANK framework
* HUNT protocol
* GUARD framework

were applied.

Also review the attached screenshot titled **Checklist** and map every checklist requirement to one of the following:

* Implemented
* Partially Implemented
* Not Implemented
* Not Applicable

For every item, provide:

1. Requirement
2. Implementation evidence
3. Relevant feature or file
4. Test or validation method
5. Status
6. Remaining risk or mitigation

Do not claim compliance without evidence.

---

# 28. TESTING REQUIREMENTS

Test the following scenarios.

## Happy Paths

* Valid order-status lookup
* Valid return question
* Valid refund question
* Valid stock query
* Product recommendation
* Successful query submission
* Successful mock email response

## Failure and Edge Cases

* Invalid order number
* Missing customer information
* Invalid email
* Ambiguous product name
* Out-of-stock item
* Contradictory mock data
* Unknown query type
* Low-confidence response
* Webhook unavailable
* Automation kill switch enabled

Document expected behavior for each case.

---

# 29. PROTOTYPE BOUNDARIES

This is a high-fidelity MVP, not a production deployment.

Use realistic mock data where external systems are unavailable.

Do not require:

* Real payment processing
* Real inventory APIs
* Real shipping APIs
* Production authentication
* Production AI credentials
* Production order-management integration

However, the architecture must make future integration straightforward.

Never hardcode:

* API keys
* Email credentials
* Secrets
* Webhook secrets

Use environment variables and configuration placeholders.

---

# 30. SUCCESS CRITERIA

The final solution is successful if a stakeholder can clearly demonstrate:

### Customer Experience

A customer can:

1. Browse products.
2. Search and filter products.
3. Add products to a cart.
4. Complete a mock checkout.
5. Receive a mock order number.
6. Ask Northstar a support question.
7. Receive an automated or simulated response.
8. Understand when human support is required.

### Business Value

Northstar can demonstrate that repetitive tickets can be automatically handled or meaningfully deflected.

### Technical Value

The system has a clean, reusable architecture ready for:

**Frontend → API → n8n → AI → Order/Product Systems → Email**

### Operational Value

Northstar can:

* Monitor queries.
* Measure automation outcomes.
* Identify escalations.
* Review failures.
* Disable automation when necessary.

### Responsible AI Value

The system demonstrates:

* Transparency
* Human oversight
* Data minimization
* Privacy awareness
* Auditability
* Escalation
* Kill-switch capability
* Testing for unusual and harmful outcomes

---

# 31. FINAL BUILD INSTRUCTION

Prioritize a **working, polished, demoable product** over unnecessary backend complexity.

The most important feature is the **Northstar Support Deflection System**, especially:

# Ask Northstar

The system must make this workflow obvious:

**Customer asks**

↓

**Northstar receives the query**

↓

**The query is validated and classified**

↓

**Relevant product, order, return, or inventory data is checked**

↓

**The system generates a guarded response**

↓

**The query is automatically resolved or escalated to a human**

↓

**The customer receives a response**

↓

**The outcome is logged for operational review**

All major buttons and user journeys must function within the prototype.

Do not leave major pages empty.

Use realistic mock:

* Products
* Orders
* Inventory levels
* Returns
* Refund statuses
* Customer queries
* Automated responses
* Escalation cases

Build clean, reusable components and organize the codebase so that future production integrations can replace mock services without requiring a complete redesign.

The final outcome should convincingly demonstrate that **Northstar Retail Co. can reduce repetitive manual support work while maintaining transparency, human oversight, responsible automation, operational visibility, and a clear path toward production integration**.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/13314092-0542-4d12-a1f3-08e1e5a7f94b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
