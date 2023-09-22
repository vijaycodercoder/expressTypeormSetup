import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User1 {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: string

    @Column()
    number: number

    @Column()
    isPublished: boolean
}