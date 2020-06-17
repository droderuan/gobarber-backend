import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListAppointmentMonthAvailabilityService from './ListAppointmentMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointmentMonthAvailability: ListAppointmentMonthAvailabilityService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listAppointmentMonthAvailability = new ListAppointmentMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from a provider ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 2, 18, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 18, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 19, 12, 0, 0),
    });

    const availability = await listAppointmentMonthAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 17, availability: true },
        { day: 18, availability: false },
        { day: 19, availability: false },
        { day: 20, availability: true },
      ]),
    );
  });
});
