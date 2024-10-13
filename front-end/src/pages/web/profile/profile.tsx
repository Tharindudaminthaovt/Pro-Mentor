import Avatar from 'react-avatar'
import PageHeader from '../../../components/shared/page-header/page-header'
import { SessionHandler } from '../../../utils/session-handler'
import './profile.scss'
import { useEffect } from 'react'

const sessionHandler = new SessionHandler()

const Profile = () => {
	const fullName = sessionHandler.getSession('name')
	const email = sessionHandler.getSession('email')
	const username = sessionHandler.getSession('username')
	const email_verified = Boolean(sessionHandler.getSession('email_verified'))

	return (
		<div className="page profile-page">
			<PageHeader title="My Profile" />

			<div className="">
				<div className="img-cont">
					<Avatar
						name={fullName}
						className="rounded-circle avatar"
						size="80"
						textSizeRatio={6}
						textMarginRatio={0.5}
					/>
				</div>

				<div className="details-cont">
					<div className="cont">
						<div className="title">Full Name</div>
						<div className="input">: {fullName}</div>
					</div>

					<div className="cont">
						<div className="title">Username</div>
						<div className="input">: {username}</div>
					</div>

					<div className="cont">
						<div className="title">Email</div>
						<div className="input">: {email}</div>
					</div>

					<div className="cont">
						<div className="title">Email Verified</div>
						<div className="input">
							:
							{email_verified ? (
								<span className="badge text-bg-success">Verified</span>
							) : (
								<span className="badge text-bg-warning">Unapproved</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile