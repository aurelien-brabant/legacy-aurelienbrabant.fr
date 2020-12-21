import Link from "next/link"

import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";

import { getPostsId, getPostData } from "../../lib/posts";

import styles from "../../styles/id.module.css";

import Layout from "../../components/Layout";
import Container from "../../components/Container";

export default function Post({ postData }) {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <div
                    className={styles.postHeader}
                >
                    <h2>{postData.title}</h2>
                    <h4>
                        Le {" "} 
                        {new Date(postData.date).toLocaleDateString("fr-Fr")} { " "}
                        - Par {postData.author} 
                    </h4>
                    <Link href="/">
                        <a>Retour a la liste</a>
                    </Link>
                </div>
                <div className={styles.postBody}>
                    <ReactMarkdown
                        source={postData.content}
                        renderers={{
                            code: CodeBlock,
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getPostsId();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = getPostData(params.id);
    return {
        props: {
            postData
        }
    };
}
