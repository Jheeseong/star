import styles from "../pages/index.module.css";

interface IProps {
    toDos: string;
    writer: string;
}

const CommentList = ({ toDos,writer }: IProps) => {
    return (
        <div className={styles.commentForm}>
            <div>{writer}</div>
            <div className={styles.commentBox}>{toDos}</div>
        </div>
    );
};

export default CommentList;
