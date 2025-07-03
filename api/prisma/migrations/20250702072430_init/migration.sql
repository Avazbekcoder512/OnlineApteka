
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'superAdmin', 'supplier');

-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pharmacy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "destination" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Pharmacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "uz_name" TEXT NOT NULL,
    "ru_name" TEXT NOT NULL,
    "en_name" TEXT NOT NULL,
    "made" TEXT NOT NULL,
    "one_plate" TEXT NOT NULL,
    "one_box" TEXT NOT NULL,
    "one_plate_price" INTEGER NOT NULL,
    "one_box_price" INTEGER NOT NULL,
    "warehouse" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "pharmacyId" INTEGER NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_phone_key" ON "Employees"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_phone_key" ON "Pharmacy"("phone");

-- AddForeignKey
ALTER TABLE "Pharmacy" ADD CONSTRAINT "Pharmacy_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
