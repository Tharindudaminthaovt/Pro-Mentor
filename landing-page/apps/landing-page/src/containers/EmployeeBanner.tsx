import {
	createStyles,
	Title,
	Text,
	Grid,
	Col,
	rem,
	Container,
} from '@mantine/core';
import { useContext, useEffect, useRef } from 'react';
import { NavigationContext } from '../context/NavigationContext';
import { NavigationContextType } from '../@types/navigation';
import { scrolling } from '../utils/Scrolling';
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

export function EmployeeBanner() {
	const employeeRef = useRef()

	const { mentors } = useContext(NavigationContext) as NavigationContextType

	useEffect(() => {
		scrolling(employeeRef)
	}, [mentors])

	const { classes } = useStyles();

	return (
		<Container ref={employeeRef} className={classes.wrapper1} py={60}>
			<div className={classes.wrapper}>
				<Title className={classes.title} order={2}>
					Calling All Industry Professionals!
				</Title>
				<Text color="dimmed" style={{ fontSize: rem(25), fontWeight: 700, marginBottom: 20 }}>
					Become a Volunteer Mentor and Make a Difference
				</Text>
				<Grid gutter={80} className={classes.col2}>
					<Col span={12} md={6}>
						<Text mt={30}>
							Are you passionate about sharing your industry expertise and helping shape the careers of aspiring professionals?
							<br /><br />
							Encourage your company to register on ProMentor and join our growing community of volunteer mentors. By becoming a mentor, you can make a meaningful impact on the lives of SLTC University students, offering guidance, advice, and support as they embark on their career journeys.
							<br /><br />
							Together, let's bridge the gap between academia and industry.
						</Text>
					</Col>
					<Col span={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Text color="dimmed" style={{ fontSize: rem(30), fontWeight: 700, textAlign: 'center' }}>
							Ask your company to register today and
							start inspiring the next generation of talent!
						</Text>
					</Col>
				</Grid>
			</div>
		</Container>
	);
}