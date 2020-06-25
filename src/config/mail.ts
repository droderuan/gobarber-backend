interface IMailConfig {
  driver: 'ses' | 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_PROVIDER || 'ethereal',

  defaults: {
    from: {
      email: 'ruan.fer.gui@gmail.com',
      name: 'ruan',
    },
  },
} as IMailConfig;
