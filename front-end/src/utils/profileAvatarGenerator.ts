import user1 from '../../../../../../user1.jpeg'
import user2 from '../../../../../../user2.jpeg'
import user3 from '../../../../user3.jpeg'
import user4 from '../../../../user4.jpeg'
import user5 from '../../../../user5.jpeg'
import user6 from '../../../../user6.jpeg'

export const generateAvatarImage = (userName: string) => {
	switch (userName) {
		case 'yasirug':
			return user3
		case 'ovtdamintha':
			return user4
		case 'kamal':
			return user5
		case 'kasun':
			return user6
		default:
			return ''
	}
}
