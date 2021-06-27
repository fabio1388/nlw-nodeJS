import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const userExists = await usersRepositories.findOne({
      email,
    });

    if(!userExists) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, userExists.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      email: userExists.email
    }, "6b9fc70360cb5b611d4071169fb1d001", {
      subject: userExists.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService }