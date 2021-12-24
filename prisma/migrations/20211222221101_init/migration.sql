/*
  Warnings:

  - You are about to drop the `CompoundNutritionFact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Measurement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NutritionFact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompoundNutritionFactToNutritionFact` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "measurement_type" AS ENUM ('MILLAGRAMS', 'GRAMS', 'UNITS');

-- DropForeignKey
ALTER TABLE "CompoundNutritionFact" DROP CONSTRAINT "CompoundNutritionFact_measurementId_fkey";

-- DropForeignKey
ALTER TABLE "CompoundNutritionFact" DROP CONSTRAINT "CompoundNutritionFact_productId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionFact" DROP CONSTRAINT "NutritionFact_compoundNutritionFactId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionFact" DROP CONSTRAINT "NutritionFact_measurementId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionFact" DROP CONSTRAINT "NutritionFact_productId_fkey";

-- DropForeignKey
ALTER TABLE "_CompoundNutritionFactToNutritionFact" DROP CONSTRAINT "_CompoundNutritionFactToNutritionFact_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompoundNutritionFactToNutritionFact" DROP CONSTRAINT "_CompoundNutritionFactToNutritionFact_B_fkey";

-- DropTable
DROP TABLE "CompoundNutritionFact";

-- DropTable
DROP TABLE "Measurement";

-- DropTable
DROP TABLE "NutritionFact";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "_CompoundNutritionFactToNutritionFact";

-- DropEnum
DROP TYPE "MeasurementType";

-- CreateTable
CREATE TABLE "faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "measurement" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "measurement_type" NOT NULL DEFAULT E'GRAMS',

    CONSTRAINT "measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_fact" (
    "id" SERIAL NOT NULL,
    "ingredient" TEXT NOT NULL,
    "comound_nutrition_fact_id" INTEGER,
    "product_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "measurement_id" INTEGER NOT NULL,

    CONSTRAINT "nutrition_fact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compound_nutrition_fact" (
    "id" SERIAL NOT NULL,
    "ingredient" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "measurement_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "compound_nutrition_fact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "shopify_id" DOUBLE PRECISION NOT NULL,
    "ingredients" TEXT NOT NULL,
    "serving_size_id" INTEGER NOT NULL,
    "contains" TEXT NOT NULL,
    "cooking_instructions" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "product_shopify_id_key" ON "product"("shopify_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_fact" ADD CONSTRAINT "nutrition_fact_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_fact" ADD CONSTRAINT "nutrition_fact_comound_nutrition_fact_id_fkey" FOREIGN KEY ("comound_nutrition_fact_id") REFERENCES "compound_nutrition_fact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_fact" ADD CONSTRAINT "nutrition_fact_measurement_id_fkey" FOREIGN KEY ("measurement_id") REFERENCES "measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compound_nutrition_fact" ADD CONSTRAINT "compound_nutrition_fact_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compound_nutrition_fact" ADD CONSTRAINT "compound_nutrition_fact_measurement_id_fkey" FOREIGN KEY ("measurement_id") REFERENCES "measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_serving_size_id_fkey" FOREIGN KEY ("serving_size_id") REFERENCES "measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
