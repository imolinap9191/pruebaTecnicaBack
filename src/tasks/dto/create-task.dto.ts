import { IsNotEmpty } from 'class-validator';
import { State } from '../enum/status.enum';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: State;
}
