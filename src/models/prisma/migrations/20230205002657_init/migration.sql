/*
  Warnings:

  - Changed the type of `type` on the `Client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('BOVINE', 'SWINE', 'CHICKEN', 'GIBLETS');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('SMALL_BUSINESS', 'LARGE_BUSINESS');

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "type",
ADD COLUMN     "type" "ClientType" NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "category",
ADD COLUMN     "category" "ProductCategory" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "ClientType" NOT NULL;

-- CreateIndex
CREATE INDEX "Products_category_idx" ON "Products"("category");
