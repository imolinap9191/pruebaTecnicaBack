import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../enum/status.enum';

@Entity({ name: 'Task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'enum', enum: State, nullable: true })
  status: State;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
