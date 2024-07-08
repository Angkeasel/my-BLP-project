
import { LessonEntity } from "src/lesson/entities/lesson.entity";
import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'course' })
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ nullable: true, type: 'text' })
    description: string;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }
    @OneToMany(() => LessonEntity, (lesson: LessonEntity) => lesson.course,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    lessons: LessonEntity[]



    //cover image_id 




}
