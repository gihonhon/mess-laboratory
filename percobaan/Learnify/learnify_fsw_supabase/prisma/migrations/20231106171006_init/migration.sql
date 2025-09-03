/*
  Warnings:

  - Added the required column `CourseID` to the `Materi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Materi" ADD COLUMN     "CourseID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "Course" (
    "CourseID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Title_Course" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("CourseID")
);

-- AddForeignKey
ALTER TABLE "Materi" ADD CONSTRAINT "Materi_CourseID_fkey" FOREIGN KEY ("CourseID") REFERENCES "Course"("CourseID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
