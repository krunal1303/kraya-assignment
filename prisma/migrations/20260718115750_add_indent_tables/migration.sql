/*
  Warnings:

  - You are about to drop the column `userId` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."items" DROP CONSTRAINT "items_userId_fkey";

-- AlterTable
ALTER TABLE "public"."items" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."indents" (
    "id" TEXT NOT NULL,
    "indent_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "indent_code" TEXT NOT NULL,
    "description" TEXT,
    "created_by_user_id" TEXT NOT NULL,
    "last_updated_by_user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "indents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."indent_items" (
    "id" TEXT NOT NULL,
    "indent_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "indent_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "indents_indent_id_key" ON "public"."indents"("indent_id");

-- CreateIndex
CREATE UNIQUE INDEX "indents_indent_code_key" ON "public"."indents"("indent_code");

-- CreateIndex
CREATE UNIQUE INDEX "indent_items_indent_id_item_id_key" ON "public"."indent_items"("indent_id", "item_id");

-- AddForeignKey
ALTER TABLE "public"."indents" ADD CONSTRAINT "indents_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."indents" ADD CONSTRAINT "indents_last_updated_by_user_id_fkey" FOREIGN KEY ("last_updated_by_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."indent_items" ADD CONSTRAINT "indent_items_indent_id_fkey" FOREIGN KEY ("indent_id") REFERENCES "public"."indents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."indent_items" ADD CONSTRAINT "indent_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
