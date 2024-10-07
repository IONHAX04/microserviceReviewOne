import { executeQuery } from "../../helper/db";
import {
  insertUserQuery,
  insertUserDomainQuery,
  selectUserByEmailQuery,
} from "./query";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN || "ERROR";

export default class UserRepository {
  // SIGN IN FUNCTION
  public async userLoginV1(email: string, password: string): Promise<any> {
    const params = [email];
    const users = await executeQuery(selectUserByEmailQuery, params); // Execute select query

    if (users.length > 0) {
      const user = users[0];

      // Verify the password
      const validPassword = await bcrypt.compare(
        password,
        user.refCustHashedPassword
      );
      if (validPassword) {
        // Generate a token upon successful login
        const token = this.generateToken(user);

        // Return user information and token
        return {
          success: true,
          message: "Login successful",
          user,
          token,
        };
      }
    }

    // Return error if user not found or invalid password
    return { success: false, message: "Invalid email or password" };
  }

  // SIGN UP FUNCTION
  public async userSignUpV1(userData: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.temp_su_password, 10);
    const userId = uuidv4();
    const params = [
      userData.temp_su_fname, // refStFName
      userData.temp_su_lname, // refStLName
      userData.temp_su_dob, // refStDOB
      userData.temp_su_age, // refStAge
      new Date().toISOString(), // refSCreatedAt
      "system", // refSCreatedBy
      "active", // refSUserStatus
      "active", // refSIsActive
      new Date().toISOString(), // refSignupDate
    ];

    const userResult = await executeQuery(insertUserQuery, params);
    const newUser = userResult[0];

    const domainParams = [
      newUser.refStId, // refStId from users table
      newUser.refSCustId, // refCustId from users table
      userData.temp_su_email, // refCustPrimEmail
      userData.temp_su_password, // refCustPassword
      hashedPassword, // refCustHashedPassword
      new Date().toISOString(), // refUserCreatedAt
      "system", // refUserCreatedBy
    ];

    const domainResult = await executeQuery(
      insertUserDomainQuery,
      domainParams
    );

    if (userResult.length > 0 && domainResult.length > 0) {
      const token = this.generateToken(newUser);

      return {
        success: true,
        message: "User signup successful",
        user: newUser,
        token,
      };
    } else {
      return { success: false, message: "Signup failed" };
    }
  }

  // Helper function to generate JWT token
  private generateToken(user: any): string {
    const payload = {
      id: user.refStId, // refStId from users table
      email: user.refCustPrimEmail,
      custId: user.refSCustId,
      status: user.refSUserStatus,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "20m" });
  }
}
