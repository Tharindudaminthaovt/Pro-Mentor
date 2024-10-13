import {
	createStyles,
	Image,
	Container,
	Title,
	Text,
	rem,
	px,
} from '@mantine/core';
// import { IconCheck } from '@tabler/icons-react';
import image from '../assets/welcome.png';
import { useContext, useEffect, useRef } from 'react';
import { NavigationContext } from '../context/NavigationContext';
import { NavigationContextType } from '../@types/navigation';
import { scrolling } from '../utils/Scrolling';

const useStyles = createStyles((theme) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		borderRadius: theme.radius.md,
		// backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
		border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
			}`,
		// marginTop: rem(50),
		backgroundColor: 'white',
		// height: 'auto',
		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column-reverse',
			padding: theme.spacing.xl,
		},
	},
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: `${rem(40)}`,
		alignItems: 'center'
		// paddingTop: `calc(${theme.spacing.xl} * 4)`,
		// paddingBottom: `calc(${theme.spacing.xl} * 4)`,
	},

	content: {
		maxWidth: rem(480),
		marginRight: `calc(${theme.spacing.xl} * 3)`,

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			marginRight: 0,
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: px(39),
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan('xs')]: {
			fontSize: rem(28),
		},
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			flex: 1,
		},
	},

	image: {
		flex: 1,

		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	bg: {
		// backgroundColor: '#B2B7E2',
		padding: rem(40)
	}

	// highlight: {
	// 	position: 'relative',
	// 	backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
	// 	borderRadius: theme.radius.sm,
	// 	padding: `${rem(4)} ${rem(12)}`,
	// },
}));

export function Welcome() {
	const aboutRef = useRef()

	const { about } = useContext(NavigationContext) as NavigationContextType

	useEffect(() => {
		scrolling(aboutRef)
	}, [about])

	const { classes } = useStyles();
	return (
		<div ref={aboutRef} className={classes.bg} style={{ paddingTop: rem(60)}}>
			<Container className={classes.wrapper}>
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title}>
							Welcome to ProMentor
						</Title>
						<Text color="dimmed" mt="md" style={{ fontSize: rem(30), fontWeight: 700 }}>
							Your Path to Professional Success
						</Text>

						<Text mt={30}>
							At ProMentor, we are dedicated to empowering students of SLTC Research University to reach their full potential and thrive in their future careers.
							<br /><br />
							Our platform serves as a comprehensive professional development and career networking hub, connecting you with industry professionals, job and internship opportunities, industry events, and invaluable resources to help you excel in your chosen field.
						</Text>
					</div>
					<Image src={image} className={classes.image} />
				</div>
			</Container>
		</div>
	);
}