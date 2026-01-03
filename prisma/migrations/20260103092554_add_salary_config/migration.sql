-- CreateTable
CREATE TABLE "SalaryConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeProfileId" TEXT NOT NULL,
    "monthlyWage" REAL NOT NULL DEFAULT 0,
    "basicRate" REAL NOT NULL DEFAULT 0.5,
    "hraRate" REAL NOT NULL DEFAULT 0.5,
    "standardAllowance" REAL NOT NULL DEFAULT 4167,
    "performanceBonusRate" REAL NOT NULL DEFAULT 0.0833,
    "ltaRate" REAL NOT NULL DEFAULT 0.0833,
    "pfRate" REAL NOT NULL DEFAULT 0.12,
    "professionalTax" REAL NOT NULL DEFAULT 200,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SalaryConfig_employeeProfileId_fkey" FOREIGN KEY ("employeeProfileId") REFERENCES "EmployeeProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SalaryConfig_employeeProfileId_key" ON "SalaryConfig"("employeeProfileId");
