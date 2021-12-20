-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('MILLAGRAMS', 'GRAMS');

-- CreateTable
CREATE TABLE "Measurement" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "MeasurementType" NOT NULL DEFAULT E'GRAMS',

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionFact" (
    "id" SERIAL NOT NULL,
    "ingredient" TEXT NOT NULL,
    "compoundNutritionFactId" INTEGER,
    "productId" INTEGER NOT NULL,
    "measurementId" INTEGER NOT NULL,

    CONSTRAINT "NutritionFact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompoundNutritionFact" (
    "id" SERIAL NOT NULL,
    "ingredient" TEXT NOT NULL,
    "measurementId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CompoundNutritionFact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "shopifyId" INTEGER NOT NULL,
    "ingredients" TEXT[],
    "cookingInstructions" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompoundNutritionFactToNutritionFact" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompoundNutritionFactToNutritionFact_AB_unique" ON "_CompoundNutritionFactToNutritionFact"("A", "B");

-- CreateIndex
CREATE INDEX "_CompoundNutritionFactToNutritionFact_B_index" ON "_CompoundNutritionFactToNutritionFact"("B");

-- AddForeignKey
ALTER TABLE "NutritionFact" ADD CONSTRAINT "NutritionFact_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionFact" ADD CONSTRAINT "NutritionFact_compoundNutritionFactId_fkey" FOREIGN KEY ("compoundNutritionFactId") REFERENCES "CompoundNutritionFact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionFact" ADD CONSTRAINT "NutritionFact_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompoundNutritionFact" ADD CONSTRAINT "CompoundNutritionFact_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompoundNutritionFact" ADD CONSTRAINT "CompoundNutritionFact_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompoundNutritionFactToNutritionFact" ADD FOREIGN KEY ("A") REFERENCES "CompoundNutritionFact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompoundNutritionFactToNutritionFact" ADD FOREIGN KEY ("B") REFERENCES "NutritionFact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
