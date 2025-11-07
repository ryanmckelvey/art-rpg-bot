-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "prompts" TEXT[],
    "money" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");
