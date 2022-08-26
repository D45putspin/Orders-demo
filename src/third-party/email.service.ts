import { Injectable } from '@nestjs/common';
import { ENV_VARIABLES } from 'src/config/env';
import { TYPE_EMAIL } from 'src/shared';
import * as _ from 'lodash';
@Injectable()
export class ThirdPartyEmailService {
  host = {
    appName: ENV_VARIABLES.APP_NAME,
  };
  sendMail<T>(userInfo: any, template: string, data: T) {
    const templateToUse = this.selectTemplate(template);

    this.send<T>(
      userInfo.email,
      '', //templateToUse.body
      data,
      'Payment', //templateToUse.subject,
    );
  }
  selectTemplate(type: string) {
    switch (type) {
      case TYPE_EMAIL.CONFIRM_MB_PAYMENT:
        return; //email template here
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async send<T>(to: string, emailTemplate: string, data: T, subject: string) {
    const dataWHostInfo: any = { ...data, ...this.host };

    const compiled = _.template(emailTemplate);
    const compiledSubject = _.template(subject);
    const result = compiled(dataWHostInfo);
    const interpolatedSubject = compiledSubject(data);
    const from = ENV_VARIABLES.EMAIL;

    const msg = {
      to,
      from,
      subject: interpolatedSubject,
      html: result,
    };
    console.log(msg);
  }
}
