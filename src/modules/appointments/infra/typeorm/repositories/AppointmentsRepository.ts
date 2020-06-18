import { getRepository, Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  // TODO: test if this method is working
  public async FindAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const filteredAppointments = this.ormRepository.find({
      where: {
        id: provider_id,
        date: Between(
          startOfMonth(new Date(year, month)),
          endOfMonth(new Date(year, month)),
        ),
      },
    });

    return filteredAppointments;
  }

  public async FindAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const filteredAppointments = this.ormRepository.find({
      where: {
        id: provider_id,
        date: Between(
          startOfMonth(new Date(year, month, day)),
          endOfMonth(new Date(year, month, day)),
        ),
      },
    });

    return filteredAppointments;
  }
}

export default AppointmentsRepository;
