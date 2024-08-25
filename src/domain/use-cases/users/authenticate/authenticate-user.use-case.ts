import {
  InputAuthenticateUserDTO,
  OutputAutheticateUserDTO,
} from './authenticate-user.dto';

export interface IAuthenticateUserUseCase {
  execute(input: InputAuthenticateUserDTO): Promise<OutputAutheticateUserDTO>;
}
