import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn } from "typeorm"

@Entity()
export class Demoentity {
    // @PrimaryGeneratedColumn("uuid")
    // id: string
    @PrimaryGeneratedColumn()
    id: number

    @Column("bigint", { nullable: true })
    field_bigint: string

    @Column("int", { nullable: true })
    field_int: number

    // // this is equivalent to "numeric" in postgres
    // @Column({ type: "decimal", precision: 25, scale: 5})
    // field_decimal: string

    @Column({ type: "numeric", precision: 25, scale: 5, nullable: true})
    field_decimal: string

    // @Column({ type: "text" })
    // field_text: string

    @Column({ type: "varchar", length: 100 })
    field_varchar: string

    @Column({ type: "boolean"})
    field_boolean: boolean

    @Column({ type: "bytea"})
    field_bytea: string

    @Column({ type: "timestamptz"})
    field_timestamptz: Date

    // // timestamp without time zone may be buggy (due to "node-postgres"): https://github.com/typeorm/typeorm/issues/4519   
    // @Column({ type: "timestamp"})
    // field_timestamp: Date

    @Column({ type: "date"})
    field_date: string

    @Column({ type: "time with time zone"})
    field_time_tz: string

    @Column({ type: "xml"})
    field_xml: string

    @Column({ type: "json"})
    field_json: string

    @Column({ type: "uuid"})
    @Generated("uuid")
    field_uuid: string

    // @Column({ type: "time without time zone"})
    // field_time: Date

    @Column({type: "int"})
    aud_create_user: Number;

    @Column({type: "int"})
    aud_update_user: Number;

    @CreateDateColumn()
    aud_create_date: Date;

    @UpdateDateColumn()
    aud_update_date: Date;

    @DeleteDateColumn()
    aud_delete_date: Date;

    @VersionColumn()
    aud_version_no: number;
}
