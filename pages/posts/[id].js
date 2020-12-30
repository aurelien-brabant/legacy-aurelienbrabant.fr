import { Fragment } from "react"; 

import Link from "next/link";
import Head from "next/head";

import Markdown from "../../components/markdown/Markdown.js"

import { getPostsId, getPostData } from "../../lib/posts";

import styles from "../../styles/id.module.css";

import Layout from "../../components/Layout";

export default function Post({ postData }) {
    return (
        <Fragment>
            <Head>
                <title>{postData.title}</title>
            </Head>
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
                        <Markdown
                            markdownData={postData.content}
                        />
                    </div>
                </div>
            </Layout>
        </Fragment>
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
