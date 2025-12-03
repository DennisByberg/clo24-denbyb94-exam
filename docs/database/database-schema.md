# Database Schema Design

**Tech:** PostgreSQL + SQLAlchemy + Alembic  
**Auth:** Azure Easy Auth (Google OAuth)

---

## 📋 Overview

5 tables: `user`, `restaurant`, `restaurant_table`, `restaurant_booking_slot`, `restaurant_booking`

---

## 🎯 Business Requirements

### Authentication

- **Login required** - Google OAuth via Azure Easy Auth
- Contact info retrieved from users table
- Roles: `customer` (default), `member`, `admin`

### Booking Rules

- One booking = one table + one time slot
- Time slots contain date + time (DATETIME)
- Max 100 guests per table
- No double bookings (same slot - enforced by unique constraint)
- Users cannot have overlapping bookings at the same restaurant
- Users can book multiple restaurants simultaneously
- MVP: 1 restaurant, schema supports multiple

---

## 📊 Table Definitions

### user

| Column  | Type         | Constraints                  | Description           |
| ------- | ------------ | ---------------------------- | --------------------- |
| `id`    | VARCHAR(255) | PRIMARY KEY                  | Google ID from Azure  |
| `name`  | VARCHAR(200) | NOT NULL                     | Name from Google      |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL             | Email from Google     |
| `role`  | VARCHAR(20)  | NOT NULL, DEFAULT 'customer' | customer/member/admin |

---

### restaurant

| Column          | Type         | Constraints                | Description            |
| --------------- | ------------ | -------------------------- | ---------------------- |
| `id`            | INTEGER      | PRIMARY KEY, AUTOINCREMENT | Unique ID              |
| `name`          | VARCHAR(100) | NOT NULL                   | Restaurant name        |
| `total_seating` | INTEGER      | NOT NULL                   | Total capacity         |
| `image_url`     | VARCHAR(500) | NULLABLE                   | Azure Blob Storage URL |

---

### restaurant_table

| Column          | Type    | Constraints                                                  | Description      |
| --------------- | ------- | ------------------------------------------------------------ | ---------------- |
| `id`            | INTEGER | PRIMARY KEY, AUTOINCREMENT                                   | Unique ID        |
| `restaurant_id` | INTEGER | FOREIGN KEY (restaurant.id), NOT NULL                        | Which restaurant |
| `seating_count` | INTEGER | NOT NULL, CHECK (seating_count > 0 AND seating_count <= 100) | Table capacity   |

---

### restaurant_booking_slot

| Column           | Type     | Constraints                                 | Description       |
| ---------------- | -------- | ------------------------------------------- | ----------------- |
| `id`             | INTEGER  | PRIMARY KEY, AUTOINCREMENT                  | Unique ID         |
| `table_id`       | INTEGER  | FOREIGN KEY (restaurant_table.id), NOT NULL | Which table       |
| `arrival_date`   | DATETIME | NOT NULL                                    | Start date & time |
| `departure_date` | DATETIME | NOT NULL                                    | End date & time   |

**Constraint:** UNIQUE on `(table_id, arrival_date, departure_date)`

---

### restaurant_booking

| Column            | Type         | Constraints                                        | Description      |
| ----------------- | ------------ | -------------------------------------------------- | ---------------- |
| `id`              | INTEGER      | PRIMARY KEY, AUTOINCREMENT                         | Unique ID        |
| `user_id`         | VARCHAR(255) | FOREIGN KEY (user.id), NOT NULL                    | Logged in user   |
| `booking_slot_id` | INTEGER      | FOREIGN KEY (restaurant_booking_slot.id), NOT NULL, UNIQUE | Which time slot  |
| `guest_count`     | INTEGER      | NOT NULL, CHECK (guest_count > 0)                  | Number of guests |

**Constraint:** UNIQUE on `booking_slot_id` prevents double bookings

---

## 🔗 Relationships (all 1:N)

1. `restaurant` → `restaurant_table`
2. `restaurant_table` → `restaurant_booking_slot`
3. `user` → `restaurant_booking`
4. `restaurant_booking_slot` → `restaurant_booking`
