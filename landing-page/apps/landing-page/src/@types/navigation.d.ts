// export type aboutType = {
// 	about: string;
// 	navigateAbout: () => void;
// }

export type NavigationContextType = {
	currentPath: string;
	navigateCurrentPath: () => void;

	about: boolean;
	navigateAbout: () => void;

	features: boolean;
	navigateFeatures: () => void;

	companies: boolean;
	navigateCompanies: () => void;

	mentors: boolean;
	navigateMentors: () => void;

	top: boolean;
	navigateTop: () => void;
}