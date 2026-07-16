import { Repository } from '@repo/shared';
import { Price } from './type';
import { PriceQuery } from './query';
import { PriceList } from './list';
import { CreatePrice } from './create';
import { UpdatePrice } from './update';

export interface PriceRepository 
    extends Repository<
        Price,
        string,
        CreatePrice,
        UpdatePrice,
        PriceQuery,
        PriceList
    > {
}