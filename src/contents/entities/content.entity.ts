
import { CommentEntity } from "src/comment/entities/comment.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { text } from "stream/consumers";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, BeforeUpdate, OneToMany } from "typeorm";
@Entity({ name: 'contents' })
export class ContentEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ nullable: true })
    contentText: string
    @Column({ nullable: true, type: 'text' })
    contentType: string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.contents)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @OneToMany('CommentEntity', (comment: CommentEntity) => comment.content,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    comments: CommentEntity[]
    // can write this   author: UserEntity;  (mean = author?User)
}
