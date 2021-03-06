import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointmentMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listAppointmentMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from a provider ', async () => {
    async function repeat(day: number): Promise<void> {
      for (let hour = 8; hour <= 17; hour++) {
        await fakeAppointmentsRepository.create({
          provider_id: 'user',
          user_id: 'user',
          date: new Date(2020, 6, day, hour, 0, 0),
        });
      }
    }

    await repeat(18);

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 6, 19, 12, 0, 0),
    });

    const availability = await listAppointmentMonthAvailability.execute({
      provider_id: 'user',
      month: 7,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 17, available: true },
        { day: 18, available: false },
        { day: 19, available: true },
        { day: 20, available: true },
      ]),
    );
  });
});
