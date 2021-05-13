import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

export default function Layout(props) {
	return (
		<>
			<Head>

				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="theme-color" content="#ffffff" />
				
				{ /* opengraph tags */ }
				<meta key="og:title" property="og:title" content="Web developer and student at 42 Paris, sharing code and thoughts." />
				<meta key="og:type" property="og:type" content="website" />
				<meta key="og:image:type" property="og:image:type" content="image/png" />
				<meta key="og:image:width" property="og:image:width" content="1200" />
				<meta key="og:image:height" property="og:image:height" content="630" />

				{ /* load remote assets */ }
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
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
					rel="stylesheet"
				/>
			</Head>
			<Header />
			{props.children}
			<Footer />
		</>	
	)
}
