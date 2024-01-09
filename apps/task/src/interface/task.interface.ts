export interface Task {
  readonly id: number;
  readonly name: string;
  readonly completed: boolean;
  readonly createdAt: Date;
}
