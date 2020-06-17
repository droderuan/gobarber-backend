import { injectable, inject } from 'tsyringe';

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

  public async execute({ provider_id }: IRequestDTO): Promise<IResponse> {
    const filteredAppointments = await this.appointmentsRepository.FindAllByMonthFromProvider(
      {
        provider_id,
        month: 6,
        year: 2020,
      },
    );

    console.log(filteredAppointments);

    return [
      {
        day: 1,
        available: true,
      },
    ];
  }
}

export default ListAppointMonthAvailabilityService;
