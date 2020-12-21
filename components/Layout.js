import Head from "next/head";

import Header from "./Header";
import Container from "./Container";

export default function Layout(props) {
	return (
		<>
			<Head>
				<link
					rel="preload"
					href="/fonts/roboto/Roboto-Regular.ttf"
					as="font"
					crossOrigin=""
				/>
				<link
					rel="preload"
					href="/fonts/jetbrains/static/JetBrainsMono-Regular.ttf"
					as="font"
					crossOrigin=""
				/>
				<link 
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
      				rel="stylesheet"
				/>
				<link
					href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
					rel="stylesheet"
				/>
			</Head>
			<Header />
			<Container>
				{props.children}
			</Container>
		</>	
	)
}
