import {
	createStyles,
	Title,
	Text,
	Button,
	Grid,
	Col,
	rem,
	Container,
} from '@mantine/core';
import { useContext, useEffect, useRef } from 'react';
import { scrolling } from '../utils/Scrolling';
import { NavigationContext } from '../context/NavigationContext';
import { NavigationContextType } from '../@types/navigation';
// import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
	wrapper: {
		padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: rem(36),
		fontWeight: 900,
		lineHeight: 1.1,
		marginBottom: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
	},

	wrapper1: {
		marginTop: rem(40),
		marginBottom: rem(40),
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

	col2: {
		display: 'flex',
		alignItems: 'center',
	}
}));

export function RegisterBanner() {
	const companiesRef = useRef()

	const { companies } = useContext(NavigationContext) as NavigationContextType

	useEffect(() => {
		console.log(companies)
		scrolling(companiesRef)
	}, [companies])

	const { classes } = useStyles();

	return (
		<Container ref={companiesRef} className={classes.wrapper1} py={60}>
			<div className={classes.wrapper}>
				<Grid gutter={80} className={classes.col2}>
					<Col span={12} md={6}>
						<Title className={classes.title} order={2}>
							Calling All Companies!
						</Title>
						<Text color="dimmed" mt="md" style={{ fontSize: rem(30), fontWeight: 700 }}>
							Register for Free on ProMentor Today
						</Text>

						<Text mt={30}>
							Expand your reach and connect with top talent from SLTC Research University. Register your company on ProMentor and tap into a pool of motivated and skilled students eager to make their mark in the industry. Join our growing community and unlock new opportunities for collaboration and talent acquisition.
						</Text>
					</Col>
					<Col span={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Title className={classes.title} order={2}>
							Register now!
						</Title>
						<Text color="dimmed" style={{ fontSize: rem(30), fontWeight: 700, textAlign: 'center' }}>
							and start engaging with the next generation of professionals.
						</Text>

						<Button
							style={{ backgroundColor: '#8F87A1'}}
							size="lg"
							radius="md"
							mt="xl"
						>
							Get started
						</Button>
					</Col>
				</Grid>
			</div>
		</Container>
	);
}