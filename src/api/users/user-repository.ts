// user-repository.ts
import { executeQuery } from "../../helper/db";
import { insertUserQuery, selectUserQuery } from "./query";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export default class UserRepository {
  // LOGIN FUNCTION
  public async userLoginV1(user_id: string, password: string): Promise<any> {
    const params = [user_id];
    const users = await executeQuery(selectUserQuery, params); // Execute select query

    if (users.length > 0) {
      const user = users[0];
      const validPassword = await bcrypt.compare(
        password,
        user.refStHashedPassword
      );
      if (validPassword) {
        return { success: true, message: "Login successful", user };
      }
    }
    return { success: false, message: "Invalid user ID or password" };
  }

  // SIGN UP FUNCTION
  public async userSignUpV1(userData: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.temp_su_password, 10);
    const userId = uuidv4();
    const params = [
      userId,
      userData.temp_su_email,
      userData.temp_su_password,
      hashedPassword,
      userData.temp_su_fname,
      userData.temp_su_lname,
      userData.temp_su_dob,
      userData.temp_su_age,
      new Date().toISOString(), // refStCreatedAt
      "system", // refStCreatedBy
      new Date().toISOString(), // refStUpdatedAt
      "system", // refStUpdatedBy
      "active", // refStUserStatus
      "active", // refStIsActive
      new Date().toISOString(), // refSignUpDate
      JSON.stringify([]), // refUtHistory
      `UBY${Math.floor(Math.random() * 10000)}`, // refStCustId
      1, // refUtId (example)
    ];

    const result = await executeQuery(insertUserQuery, params); // Execute insert query

    if (result.length > 0) {
      return {
        success: true,
        message: "User signup successful",
        user: result[0],
      };
    } else {
      return { success: false, message: "Signup failed" };
    }
  }
}
