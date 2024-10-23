


interface DMSectionProps {
	onAddDM: () => void;
}


function DMSection ( {onAddDM}: DMSectionProps ) {


	return (
		<div className="chat-rooms-section__dm">
				<h2 className="dm-title">DM</h2>
				<button onClick={onAddDM}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="large-icon">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
				</button>
		</div>
	)
}

export default DMSection