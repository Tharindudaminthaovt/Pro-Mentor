import {
	createStyles,
	Header,
	Group,
	Button,
	Divider,
	Box,
	Burger,
	Drawer,
	ScrollArea,
	rem,
	px,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from "../assets/logo.svg";
import { NavigationContext } from '../context/NavigationContext';
import { NavigationContextType } from '../@types/navigation';
import { useContext } from 'react';

const useStyles = createStyles((theme) => ({
	button: {
		backgroundColor: '#35314E',
		width: px(120),

		'&:hover': {
			backgroundColor: '#8F87A1'
		}
	},
	link: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		textDecoration: 'none',
		cursor: 'pointer',
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontWeight: 500,
		fontSize: theme.fontSizes.sm,

		[theme.fn.smallerThan('sm')]: {
			height: rem(42),
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		},

		...theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		}),
	},

	subLink: {
		width: '100%',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		borderRadius: theme.radius.md,

		...theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		}),

		'&:active': theme.activeStyles,
	},

	dropdownFooter: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		margin: `calc(${theme.spacing.md} * -1)`,
		marginTop: theme.spacing.sm,
		padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
		paddingBottom: theme.spacing.xl,
		borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
			}`,
	},

	hiddenMobile: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},
}));

export function LandingHeader() {
	const { navigateAbout, navigateCompanies, navigateFeatures, navigateMentors, navigateTop } = useContext(NavigationContext) as NavigationContextType

	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const { classes, theme } = useStyles();

	const navigations = [
		{
			id: 1,
			title: "About Us",
			url: "/about",
		},
		{
			id: 2,
			title: "Features",
			url: "/features",
		},
		{
			id: 3,
			title: "Companies",
			url: "/companies",
		},
		{
			id: 4,
			title: "Mentors",
			url: "/mentors",
		},
	];

	const sectionScrollHandler = (name: string) => {
		console.log(name)
		
		if (name === "About Us") {
			navigateAbout()
		}
		else if (name === "Features") {
			navigateFeatures()
		}
		else if (name === "Mentors") {
			navigateMentors()
		}
		else if (name === "Companies") {
			navigateCompanies()
		}
		else if (name === "Top") {
			navigateTop()
		}
	}

	return (
		<Box>
			<Header height={60} px="md">
				<Group position="apart" sx={{ height: '100%' }}>
					<div>
						<img src={logo} alt="logo" width={50} onClick={() => sectionScrollHandler("Top")} />
					</div>
					<Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
						{
							navigations.map(nav => (
								<div className={classes.link} key={nav.id} onClick={() => sectionScrollHandler(nav.title)}>
									{nav.title}
								</div>
							))
						}
					</Group>

					<Group className={classes.hiddenMobile}>
						<Button className={classes.button}>Register</Button>
						<Button className={classes.button}>Login</Button>
					</Group>

					<Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
				</Group>
			</Header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="ProMentor"
				className={classes.hiddenDesktop}
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
					<Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

					{
						navigations.map(nav => (
							<div className={classes.link} key={nav.id} onClick={() => sectionScrollHandler(nav.title)}>
								{nav.title}
							</div>
						))
					}

					<Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

					<Group position="center" grow pb="xl" px="md">
						<Button className={classes.button}>Register</Button>
						<Button className={classes.button}>Login</Button>
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}