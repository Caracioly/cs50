-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "chances" INTEGER NOT NULL DEFAULT 3,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "exercises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_exercises" ("chances", "id", "name", "user_id") SELECT "chances", "id", "name", "user_id" FROM "exercises";
DROP TABLE "exercises";
ALTER TABLE "new_exercises" RENAME TO "exercises";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
