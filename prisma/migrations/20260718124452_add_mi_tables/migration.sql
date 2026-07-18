-- CreateTable
CREATE TABLE "public"."mis" (
    "id" TEXT NOT NULL,
    "mi_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "mi_code" TEXT NOT NULL,
    "description" TEXT,
    "created_by_user_id" TEXT NOT NULL,
    "last_updated_by_user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mi_items" (
    "id" TEXT NOT NULL,
    "mi_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "mi_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mis_mi_id_key" ON "public"."mis"("mi_id");

-- CreateIndex
CREATE UNIQUE INDEX "mis_mi_code_key" ON "public"."mis"("mi_code");

-- CreateIndex
CREATE UNIQUE INDEX "mi_items_mi_id_item_id_key" ON "public"."mi_items"("mi_id", "item_id");

-- AddForeignKey
ALTER TABLE "public"."mis" ADD CONSTRAINT "mis_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mis" ADD CONSTRAINT "mis_last_updated_by_user_id_fkey" FOREIGN KEY ("last_updated_by_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mi_items" ADD CONSTRAINT "mi_items_mi_id_fkey" FOREIGN KEY ("mi_id") REFERENCES "public"."mis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mi_items" ADD CONSTRAINT "mi_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
