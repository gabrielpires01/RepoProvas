-- CreateTable
CREATE TABLE "exams" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "categoryId" INTEGER,
    "disciplineId" INTEGER,
    "instructorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
