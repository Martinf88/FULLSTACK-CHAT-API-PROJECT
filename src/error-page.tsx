import { useRouteError } from "react-router-dom";

//TODO: fråga David om det här är en bra lösning på type hantering.
interface RouteError {
	status?: number;
	statusText?: string;
	message?: string;
  }

export default function ErrorPage() {
	const error = useRouteError() as RouteError
	console.log(error);
	
	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i> {error?.statusText || error?.message} </i>
			</p>
		</div>
	)
}