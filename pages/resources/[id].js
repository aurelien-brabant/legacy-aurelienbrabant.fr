import { Fragment, useState, useEffect } from "react"; 

import Link from "next/link";
import Head from "next/head";

import Markdown from "../../components/markdown/Markdown.js"

import { getResourcesPath } from "../../lib/resources.js";
import { getPostsId } from "../../lib/posts";

import styles from "../../styles/id.module.css";

import Layout from "../../components/Layout";
import Container from "../../components/Container";

export default function Post({ resources }) {
	const [ postId, setPostId ] = useState(null);

	useEffect(() => {
		setPostId(window.location.pathname.split('/')[2]);
	}, [])

	return (
		<Fragment>
			<Head>
				<title key="title">Resources</title>
				<meta key="description" name="description" />
				{postId &&
				<Fragment>
				</Fragment>
				}
			</Head>
			<Layout>
				<Container
					pageHeight
					size="md"
					enableXxl={true}
				>
					Available resources:
					{ resources.map(resource => (
						<h3>{resource.split("/").reverse()[0]}</h3>
					))}
				</Container>
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
	const resources = getResourcesPath(params.id);
	return {
		props: {
			resources
		}
	};
}
