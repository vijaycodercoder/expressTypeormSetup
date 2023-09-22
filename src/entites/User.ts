import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    name: string

    @Column({ nullable: true })
    age: number

    @Column({ nullable: true })
    number: number

    @Column({ nullable: true })
    isPublished: boolean
}


