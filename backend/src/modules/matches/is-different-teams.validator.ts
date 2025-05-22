import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDifferentTeams', async: false })
export class IsDifferentTeams implements ValidatorConstraintInterface {
  validate(teamB: string, args: ValidationArguments) {
    const [teamAField] = args.constraints;
    const teamA = (args.object as any)[teamAField];
    return teamA !== teamB;
  }

  defaultMessage(args: ValidationArguments) {
    return `Los equipos no pueden ser iguales`;
  }
}
