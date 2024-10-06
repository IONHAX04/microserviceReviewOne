// INSERT QUERY
export const insertUserQuery = `
  INSERT INTO "UBLIS".ublisUsers (
    "refStId",
    "refStEmail",
    "refStPassword",
    "refStHashedPassword",
    "refStFName",
    "refStLName",
    "refStDOB",
    "refStAge",
    "refStCreatedAt",
    "refStCreatedBy",
    "refStUpdatedAt",
    "refStUpdatedBy",
    "refStUserStatus",
    "refStIsActive",
    "refSignUpDate",
    "refUtHistory",
    "refStCustId",
    "refUtId"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`;

// SELECT QUERY FOR LOGIN
export const selectUserQuery = `
  SELECT * FROM "UBLIS".ublisUsers WHERE "refStCustId" = $1`;
