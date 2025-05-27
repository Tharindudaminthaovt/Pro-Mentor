import user1 from '../../../../user1.jpeg'
import user2 from '../../../../user2.jpeg'
import user3 from '../../../../user3.jpeg'
import user4 from '../../../../user4.jpeg'
import user5 from '../../../../user5.jpeg'
import user6 from '../../../../user6.jpeg'

export const generateAvatarImage = (userName: string) => {
	switch (userName) {
		case 'lecturer1':
			return user3
		case 'ovtdamintha':
			return user4
		case 'lecturer2':
			return user5
		case 'kasun':
			return user6
		case 'yasirug':
			return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_nIiXvWFWyV64bFUtfATT242m-7i3CDfxg&s'
		default:
			return 'https://media.istockphoto.com/id/1406966951/photo/businessman-in-office-looking-at-camera-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=Fg6DNiYjrwafDNUKE0kOCYeDyX3S_h80zRqktvoxG4E='
	}
}
