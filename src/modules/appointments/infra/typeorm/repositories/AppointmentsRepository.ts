import { getRepository, Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllByMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllByMonthFromProviderDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  // TODO: test if this method is working
  public async FindAllByMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllByMonthFromProviderDTO): Promise<Appointment[]> {
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
}

export default AppointmentsRepository;
