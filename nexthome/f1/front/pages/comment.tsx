import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CommentList from "../components/CommentList";
import jwt from "jsonwebtoken";
import styles from "./index.module.css";



interface FormValue {
    todo: string;
}
interface IComments {
    writer: string;
    id: number;
    text: string;
}


function Comment({user}) {
    const [comments, setComments] = useState<IComments[]>([]);
    const idNumber = useRef(1); //id값으로 부여

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormValue>();

    console.log("cookie " + JSON.stringify(user))


    const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
        if (data.todo === "") {
            alert("내용을 입력해주세요.");
            return;
        }


        //newToDos: toDos 배열 안에 todo에 부여할 id, 입력받은 text를 담는다.
        const newComments = [...comments, { id: idNumber.current++, text: data.todo, writer: user.memberName}];
        setComments(newComments);
        reset(); //react-hook-form의 reset을 사용한다. 이로써 입력 후 input 초기화!
    };

    return(
        <div className={styles.Background}>
            <div className={styles.wrapper}>
                <div className={styles.loginForm}>
                    <div className={styles.commentFormTop}>
                        <div className={styles.commentFormImage}></div>
                        <div className={styles.commentFormWriter}>{user.memberName}</div>
                    </div>
                    <div className={styles.commentsForm}>
                        {comments.map((data) => (
                                <CommentList key={data.id} toDos={data.text} writer={data.writer}/>
                            )
                        )}
                    </div>
                    <div className={styles.commentFormInputAndButton}>
                        <form className="comment-input-body" onSubmit={handleSubmit(onSubmitHandler)}>
                            <input className={styles.commentFormInput} {...register("todo")} type="text" placeholder="댓글 입력" autoComplete="off"/>
                            <button className={styles.commentFormButton}>전송</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const data = context.req?.cookies['LoginToken'];


    let user = jwt.verify(data, "Secret_Key");

    console.log(user)
    return {
        props: { user }
    }
}

/*Comment.getInitialProps = async (ctx) => {
    await console.log(ctx.req)

    const data = await ctx.req?.cookies['LoginToken'];

    let user = jwt.verify(data, "Secret_Key");

    return { userInfo: user };
}*/

export default Comment;
