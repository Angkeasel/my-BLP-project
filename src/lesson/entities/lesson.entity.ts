import { CourseEntity } from "src/course/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'lesson' })
export class LessonEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column({ type: 'text', nullable: true })
    description: string
    // course_id
    // cover_image_id

    @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.lessons)
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity

}
