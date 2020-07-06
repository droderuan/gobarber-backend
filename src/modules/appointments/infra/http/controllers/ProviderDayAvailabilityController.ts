import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import AppError from '@shared/errors/AppError';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    if (!day || !month || !year) {
      throw new AppError('Needed day, month, year', 400);
    }

    const ListProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const dayAvailability = await ListProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(dayAvailability);
  }
}
