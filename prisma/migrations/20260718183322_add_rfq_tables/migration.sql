-- CreateTable
CREATE TABLE "public"."rfqs" (
    "id" TEXT NOT NULL,
    "rfq_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "rfq_code" TEXT NOT NULL,
    "description" TEXT,
    "created_by_user_id" TEXT NOT NULL,
    "last_updated_by_user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rfqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rfq_items" (
    "id" TEXT NOT NULL,
    "rfq_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "rfq_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rfqs_rfq_id_key" ON "public"."rfqs"("rfq_id");

-- CreateIndex
CREATE UNIQUE INDEX "rfqs_rfq_code_key" ON "public"."rfqs"("rfq_code");

-- CreateIndex
CREATE UNIQUE INDEX "rfq_items_rfq_id_item_id_vendor_id_key" ON "public"."rfq_items"("rfq_id", "item_id", "vendor_id");

-- AddForeignKey
ALTER TABLE "public"."rfqs" ADD CONSTRAINT "rfqs_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rfqs" ADD CONSTRAINT "rfqs_last_updated_by_user_id_fkey" FOREIGN KEY ("last_updated_by_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rfq_items" ADD CONSTRAINT "rfq_items_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "public"."rfqs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rfq_items" ADD CONSTRAINT "rfq_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rfq_items" ADD CONSTRAINT "rfq_items_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
