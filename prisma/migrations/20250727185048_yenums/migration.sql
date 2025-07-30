/*
  Warnings:

  - The `role` column on the `customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `tables` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'RESERVED', 'INACTIVE');

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "tables" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'AVAILABLE';
