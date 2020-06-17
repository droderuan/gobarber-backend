import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTo from '../dtos/ICreateAppointmentDTO';
import IFindAllByMonthFromProviderDTO from '../dtos/IFindAllByMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTo): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  FindAllByMonthFromProvider(
    data: IFindAllByMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
