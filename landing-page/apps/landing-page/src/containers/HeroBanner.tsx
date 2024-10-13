import { createStyles, Container, rem } from '@mantine/core';
import heroImage from '../assets/hero-banner.png'
import { useContext, useEffect, useRef } from 'react';
import { NavigationContext } from '../context/NavigationContext';
import { NavigationContextType } from '../@types/navigation';
import { scrolling } from '../utils/Scrolling';

const useStyles = createStyles((theme) => ({
	hero: {
		position: 'relative',
		backgroundImage:
			// 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)'
			`url(${heroImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		marginTop: rem(-60),
		[theme.fn.smallerThan('md')]: {
			// width: '100%',
			// height: rem(900),
			backgroundPosition: 'right',
		},

		[theme.fn.smallerThan('sm')]: {
			// width: '100%',
			height: rem(900),
			backgroundPosition: 'right',
		},
	},

	container: {
		height: rem(700),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		// paddingBottom: `calc(${theme.spacing.xl} * 6)`,
		zIndex: 1,
		position: 'relative',

		[theme.fn.smallerThan('sm')]: {
			// height: rem(700),
			// width: (100)
			// paddingBottom: `calc(${theme.spacing.xl} * 3)`,
		},
	},

	title: {
		color: theme.white,
		fontSize: rem(60),
		fontWeight: 900,
		lineHeight: 1.1,

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(40),
			lineHeight: 1.2,
		},

		[theme.fn.smallerThan('xs')]: {
			fontSize: rem(28),
			lineHeight: 1.3,
		},
	},

	description: {
		color: theme.white,
		maxWidth: 600,

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
			fontSize: theme.fontSizes.sm,
		},
	},

	control: {
		marginTop: `calc(${theme.spacing.xl} * 1.5)`,

		[theme.fn.smallerThan('sm')]: {
			width: '100%',
		},
	},
}));

export function HeroBanner() {
	const topRef = useRef()

	const { top } = useContext(NavigationContext) as NavigationContextType

	useEffect(() => {
		scrolling(topRef)
	}, [top])

	const { classes } = useStyles();

	return (
		<div ref={topRef} className={classes.hero}>
			<Container className={classes.container} fluid>
			</Container>
		</div>
	);
}