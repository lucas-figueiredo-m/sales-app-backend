-- CreateTable
CREATE TABLE "Employee" (
    "server_id" SERIAL NOT NULL,
    "id" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("server_id")
);

-- CreateTable
CREATE TABLE "Client" (
    "server_id" SERIAL NOT NULL,
    "id" TEXT,
    "employee_id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "trade_name" TEXT NOT NULL,
    "taxpayer_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "buyer_first_name" TEXT NOT NULL,
    "buyer_last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("server_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "server_id" SERIAL NOT NULL,
    "id" TEXT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("server_id")
);

-- CreateTable
CREATE TABLE "HistoricalProductPrice" (
    "server_id" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricalProductPrice_pkey" PRIMARY KEY ("server_id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "server_id" SERIAL NOT NULL,
    "id" TEXT,
    "client_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "estimated_order_price" DOUBLE PRECISION NOT NULL,
    "order_total_price" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("server_id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "server_id" SERIAL NOT NULL,
    "id" TEXT,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "table_price" INTEGER NOT NULL,
    "negotiated_price" INTEGER NOT NULL,
    "ordered_weight_in_grams" INTEGER NOT NULL,
    "delivered_weight_in_grams" INTEGER,
    "estimated_product_total_price" DOUBLE PRECISION NOT NULL,
    "product_total_price" INTEGER,
    "notes" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("server_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "Employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Client_taxpayer_id_key" ON "Client"("taxpayer_id");

-- CreateIndex
CREATE INDEX "Products_category_idx" ON "Products"("category");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("server_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalProductPrice" ADD CONSTRAINT "HistoricalProductPrice_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("server_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("server_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("server_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("server_id") ON DELETE CASCADE ON UPDATE CASCADE;
