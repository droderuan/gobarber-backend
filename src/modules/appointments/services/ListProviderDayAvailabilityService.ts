import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.FindAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const startHour = 8;

    const possibleAppointmentHours = Array.from(
      { length: 10 },
      (_, index) => index + startHour,
    );

    const currentDate = new Date(Date.now());

    const dayAvailability = possibleAppointmentHours.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return dayAvailability;
  }
}

export default ListProviderDayAvailabilityService;
