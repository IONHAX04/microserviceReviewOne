export const insertUserQuery = `
  INSERT INTO public.users (
    "refStFName", "refStLName", "refStDOB", "refStAge", 
    "refSCreatedAt", "refSCreatedBy", "refSUserStatus", "refSIsActive", 
    "refSignupDate", "refSCustId"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
  RETURNING "refStId", "refSCustId";
`;

export const insertUserDomainQuery = `
  INSERT INTO public."refUsersDomain" (
    "refStId", "refCustId", "refCustPrimEmail", "refCustPassword", 
    "refCustHashedPassword", "refUserCreatedAt", "refUserCreatedBy"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
`;

export const selectUserQuery = `
  SELECT * FROM public."refUsersDomain" 
  WHERE "refCustId" = $1;
`;


export const selectUserByEmailQuery = `
  SELECT u."refStId", u."refSCustId", u."refStFName", u."refStLName", u."refSUserStatus", 
         ud."refCustPrimEmail", ud."refCustHashedPassword"
  FROM public.users u
  JOIN public."refUsersDomain" ud
    ON u."refStId" = ud."refStId"
  WHERE ud."refCustPrimEmail" = $1;
`;
