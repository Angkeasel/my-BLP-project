import { ContentEntity } from "src/contents/entities/content.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comment' })
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text' })
    commentText: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
    @Column({ name: 'user_id' })
    userId: number;
    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }
    @ManyToOne(() => ContentEntity, (content: ContentEntity) => content.comments)
    @JoinColumn({ name: "content_id" })
    content: ContentEntity
    // content id 
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
    @JoinColumn({ name: "user_id" })
    user: UserEntity
}
