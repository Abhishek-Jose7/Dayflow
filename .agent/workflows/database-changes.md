---
description: How to modify the database schema and manage migrations
---

# Database Schema Change Workflow

Since we are using Prisma Migrations, you must follow this process whenever you need to add tables, columns, or change relationships.

## 1. Modify the Schema
Open `prisma/schema.prisma` and make your changes.

Example - Adding a `linkedin` field to `EmployeeProfile`:
```prisma
model EmployeeProfile {
  // ... existing fields
  linkedin    String?  // New optional field
}
```

## 2. Create a Migration
Run the following command in your terminal. Replace `add_linkedin_url` with a short name for your change.

```powershell
npx prisma migrate dev --name add_linkedin_url
```

### What this does:
1.  Generates a new SQL migration file in `prisma/migrations`.
2.  Applies the SQL to your local `dev.db`.
3.  Regenerates the Prisma Client (so you can use `user.profile.linkedin` in your code).

## 3. Commit to Git
Commit the new migration folder that was created.

```bash
git add prisma/migrations
git commit -m "feat: added linkedin url to profile"
```

## 4. Team Members (Pulling Changes)
When your teammates pull your code, they will just run:
```powershell
npx prisma migrate dev
```
This keeps everyone's database in sync.
