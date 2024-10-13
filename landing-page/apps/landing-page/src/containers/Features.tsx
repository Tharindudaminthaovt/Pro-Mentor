import {
	createStyles,
	Title,
	Text,
	Card,
	SimpleGrid,
	Container,
	rem,
} from '@mantine/core';
// import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import networkIcon from '../assets/account-network.svg'
import newsIcon from '../assets/news.svg'
import connectionIcon from '../assets/connection-point.svg'
import searchIcon from '../assets/person-search.svg'
import commentIcon from '../assets/comment.svg'
import { NavigationContext } from '../context/NavigationContext';
import { NavigationContextType } from '../@types/navigation';
import { scrolling } from '../utils/Scrolling';
import { useContext, useEffect, useRef } from 'react';

const mockdata = [
	{
		title: 'Gain a Competitive Edge',
		description:
			'ProMentor provides a unique opportunity to connect with experienced industry professionals who are passionate about mentoring the next generation of talent. Access their knowledge, guidance, and real-world insights to gain a competitive edge in your career journey.',
		icon: networkIcon,
	},
	{
		title: 'Expand Your Network',
		description:
			'Networking is key to success in today\'s professional landscape.Engage with a diverse community of like- minded students and industry experts, building connections that can open doors to internships, job offers, and lifelong partnerships.',
		icon: connectionIcon,
	},
	{
		title: 'Stay Informed and Inspired',
		description:
			'Stay up-to-date with the latest industry trends, news, and events through our platform. Discover thought-provoking articles, interviews with industry leaders, and access resources that can enhance your skills and knowledge.',
		icon: newsIcon,
	},
	{
		title: 'Explore Opportunities',
		description:
			'Find a wide range of job and internship opportunities specifically tailored for SLTC Research University students. Filter and search based on your field of study, location, and other criteria to find the perfect match for your career aspirations.',
		icon: searchIcon,
	},
	{
		title: 'Real-Time Mentoring',
		description:
			'Take advantage of our chat-based mentoring program, connecting you with experienced professionals who are eager to share their expertise and help you navigate your career path. Schedule mentoring sessions, seek advice, and gain valuable insights from those who have walked the same path.',
		icon: commentIcon,
	}
];

const useStyles = createStyles((theme) => ({
	title: {
		fontSize: rem(34),
		fontWeight: 900,

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(24),
		},
	},

	description: {
		maxWidth: 600,
		margin: 'auto',

		'&::after': {
			content: '""',
			display: 'block',
			backgroundColor: theme.fn.primaryColor(),
			width: rem(45),
			height: rem(2),
			marginTop: theme.spacing.sm,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},

	card: {
		border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
			}`,
	},

	cardTitle: {
		'&::after': {
			content: '""',
			display: 'block',
			backgroundColor: theme.fn.primaryColor(),
			width: rem(45),
			height: rem(2),
			marginTop: theme.spacing.sm,
		},
	},
}));

export function Features() {
	const featuresRef = useRef()

	const { features } = useContext(NavigationContext) as NavigationContextType

	useEffect(() => {
		scrolling(featuresRef)
	}, [features])

	const { classes } = useStyles();
	const featuresList = mockdata.map((feature) => (
		<Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
			<img src={feature.icon} alt="icon" width={60} />
			<Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
				{feature.title}
			</Text>
			<Text fz="sm" c="dimmed" mt="sm">
				{feature.description}
			</Text>
		</Card>
	));

	return (
		<Container ref={featuresRef} size="lg" pt={60}>
			<Title order={2} className={classes.title} ta="center" mt="sm">
				Unlock Your Potential with ProMentor
			</Title>

			<SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
				{featuresList}
			</SimpleGrid>
		</Container>
	);
}