import { useAuthStore } from "../store/authStore";

interface ModalProps {
	onClose: () => void;
	message: string;
}

const LogInModal: React.FC<ModalProps> = ({ onClose, message }) => {
	const isModalOpen = useAuthStore(state => state.isModalOpen)

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if(event.currentTarget === event.target) {
			onClose()
		}
	}

	if (!isModalOpen) return null;

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal-content">
				<h2> {message} </h2>
				<button onClick={onClose}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="large-icon">
					<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
				</button>
			</div>
		</div>
	)
}

export default LogInModal