import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

import IMailTemplateProvider from './models/IMailTemplateProvider';

const mailTemplateProviders = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  mailTemplateProviders.handlebars,
);
