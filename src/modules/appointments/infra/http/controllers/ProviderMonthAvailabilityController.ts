import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/AppError';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    if (!month || !year) {
      throw new AppError('Needed month, year', 400);
    }

    const ListProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const monthAvailability = await ListProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });
    return response.json(monthAvailability);
  }
}
