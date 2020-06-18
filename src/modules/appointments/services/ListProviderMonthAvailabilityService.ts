import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter, getHours } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListAppointMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequestDTO): Promise<IResponse> {
    const filteredAppointments = await this.appointmentsRepository.FindAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayOfMonth = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const currentDate = new Date(Date.now());

    const availabilityDays = eachDayOfMonth.map(day => {
      const appointmentsInDay = filteredAppointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      const compareDate = new Date(year, month - 1, day + 1);

      return {
        day,
        available:
          appointmentsInDay.length < 10 &&
          isAfter(compareDate, currentDate) &&
          getHours(compareDate) <= 17,
      };
    });

    return availabilityDays;
  }
}

export default ListAppointMonthAvailabilityService;
