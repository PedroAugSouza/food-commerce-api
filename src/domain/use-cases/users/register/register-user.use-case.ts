import {
  InputRegisterUserDTO,
  OutputRegisterUserDTO,
} from './register-user.dto';

export interface IRegisterUserUseCase {
  execute(input: InputRegisterUserDTO): Promise<OutputRegisterUserDTO>;
}
