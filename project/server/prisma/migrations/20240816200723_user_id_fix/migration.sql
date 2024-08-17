/*
  Warnings:

  - You are about to drop the column `userId` on the `scores` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `scores` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_scores" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "scores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_scores" ("id", "score") SELECT "id", "score" FROM "scores";
DROP TABLE "scores";
ALTER TABLE "new_scores" RENAME TO "scores";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
