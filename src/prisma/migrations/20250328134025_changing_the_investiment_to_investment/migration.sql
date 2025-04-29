/*
  Warnings:

  - You are about to drop the `investiment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "investiment" DROP CONSTRAINT "investments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transactions_investment_id_fkey";

-- DropTable
DROP TABLE "investiment";

-- CreateTable
CREATE TABLE "investment" (
    "id_investment" SERIAL NOT NULL,
    "user_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "target_amount" DECIMAL(15,2) NOT NULL,
    "objective" TEXT,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id_investment")
);

-- AddForeignKey
ALTER TABLE "investment" ADD CONSTRAINT "investments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transactions_investment_id_fkey" FOREIGN KEY ("investment_id") REFERENCES "investment"("id_investment") ON DELETE NO ACTION ON UPDATE NO ACTION;
