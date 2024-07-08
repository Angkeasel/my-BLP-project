
import { CommentEntity } from "src/comment/entities/comment.entity";
import { ContentEntity } from "src/contents/entities/content.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: false })
    username: string
    @Column({ unique: true, nullable: false })
    email: string
    @Column({ nullable: false })
    password: string
    @Column({ nullable: true, })
    profileImage: string
    @Column({ nullable: true })
    gender: string
    @Column({ nullable: true, name: 'date_of_birth' })
    dateOfBirth: Date

    @OneToMany('ContentEntity', (content: ContentEntity) => content.user,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    contents: Array<ContentEntity>
    // can write this way  blogEntries: BlogEntryEntity[];

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    comments: Array<CommentEntity>
}
