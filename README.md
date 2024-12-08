# Sakib Welfare

A comprehensive platform designed for community welfare and fundraising, enabling users to create, manage, and participate in donation campaigns. This project aims to streamline the process of supporting those in need while fostering community involvement.

## Features

### General Features
- **Donation Campaigns:** Users can create campaigns with detailed descriptions, deadlines, required funds, and images.
- **User Management:** Handles user registration and ensures proper user data storage in MongoDB.
- **Sorting & Filtering:** Campaigns can be sorted by date, time, or minimum donation amount.
- **Search & Details:** Fetch specific donation details or find active campaigns.
- **Real-Time Updates:** Users can update their campaigns dynamically.
- **Secure Transactions:** All donation and campaign data are securely stored and retrieved from the database.

### API Endpoints
#### User Management
1. **Add User**
   - **Method:** `POST /users`
   - **Functionality:** Adds a new user to the database.
   - **Input:** User data (name, email, photo, etc.).

2. **Fetch User by Email**
   - **Method:** `GET /users/:mail`
   - **Functionality:** Fetches user details by email.

#### Donation Campaigns
1. **Create Donation Campaign**
   - **Method:** `POST /donations`
   - **Functionality:** Adds a new campaign to the database.

2. **Fetch All Campaigns**
   - **Method:** `GET /donations`
   - **Functionality:** Retrieves all donation campaigns.

3. **Fetch Active Campaigns**
   - **Method:** `GET /activeDonations`
   - **Functionality:** Retrieves campaigns with deadlines after the current date.

4. **Fetch Campaign Details**
   - **Method:** `GET /donations/:id`
   - **Functionality:** Fetches detailed information about a specific campaign using its ID.

5. **Sort Campaigns**
   - **Method:** `GET /donations/sorted`
   - **Functionality:** Returns campaigns sorted by the minimum donation amount (ascending).

6. **Update Campaign**
   - **Method:** `PUT /donationsUpadte/:id`
   - **Functionality:** Updates a campaign by its ID with new details.

7. **Delete Campaign**
   - **Method:** `DELETE /myDonations/:id`
   - **Functionality:** Deletes a specific campaign by ID.

#### User Donations
1. **Add Donation**
   - **Method:** `POST /myMoney`
   - **Functionality:** Adds a donation record for a user.

2. **Fetch User Donations**
   - **Method:** `GET /myMoney/:mail`
   - **Functionality:** Retrieves donation records for a specific user.

3. **Fetch My Donations**
   - **Method:** `GET /myDonations/:mail`
   - **Functionality:** Fetches campaigns created by the logged-in user.

## Live Site
[Visit Sakib Welfare](https://engrsakib-p-hero-assignment9.surge.sh/)

## GitHub Repositories
- **Server Repository:** [b10-a10-server-side-engrsakib](https://github.com/programming-hero-web-course2/b10-a10-server-side-engrsakib)
- **Client Repository:** [b10-a10-client-side-engrsakib](https://github.com/programming-hero-web-course2/b10-a10-client-side-engrsakib)

## How to Run the Server
1. Clone the repository:
   ```bash
   git clone https://github.com/programming-hero-web-course2/b10-a10-server-side-engrsakib.git
   cd b10-a10-server-side-engrsakib

   >> nodemon index.js