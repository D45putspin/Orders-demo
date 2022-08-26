import { HttpException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ENV_VARIABLES } from 'src/config/env';
export const functions = {
  async checkErrors(step: number, limit: number) {
    if ((step < 0 && limit < 0) || limit > 1000)
      throw new HttpException('GENERIC.INPUT_ERROR', 400);
  },

  async countDocuments(model: any) {
    return await model.countDocuments();
  },
  async skipCalculator(step: number, limit: number) {
    return step * limit;
  },

  async getDataFromModelGeneral<T>(
    model: any,
    skip: number,
    limit: number,
    term?: string,
    customQuery?: any,
    sortField = 'createdAt',
    sortDirection: -1 | 1 = -1,
  ): Promise<T> {
    const findArg = !!term ? customQuery : undefined;

    return model
      .find(findArg)
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortDirection })
      .catch((err) => {
        throw new HttpException(err, 400);
      });
  },
};

/*
  
  }*/
