import {
    Table,
    Model,
    Column,
    PrimaryKey


} from 'sequelize-typescript';



@Table({
    tableName: 'customers',
    timestamps: false,
})


export default class CustomerModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare city: string;

    //@Column({ allowNull: false })
    // declare state: string;

    @Column({ allowNull: false })
    declare zip: string;

    // @Column({ allowNull: false })
    // declare country: string;

    @Column({ allowNull: false })
    declare active: boolean;

    @Column({ allowNull: false })
    declare rewardPoints: number;

    @Column({ allowNull: false })
    declare number: number;


}


