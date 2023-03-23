import CustomerModel from './customer.model';
import OrderItemModel from './order-item.model';

import {
    Table,
    Model,
    Column,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';



@Table({
    tableName: 'orders',
    timestamps: false,
})


export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;


    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_Id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];


    @Column({ allowNull: false })
    declare total: number;
}


