import { useRouteError } from "react-router-dom"
const ErrorPage = () => {

    const error = useRouteError()
    return (
        <>
        <div className="flex justify-center min-h-screen items-center flex-col">
            <h2 className="text-6xl font-bold">Oopss !!</h2>
            <h2 className="text-6xl font-semibold my-5">Something Wrong</h2>
            <h2 className="text-3xl my-5">Sorry, an Unexpected error has occured</h2>
            <p className="text-red-500 text-3xl">{error.statusText || error.message}</p>
        </div>
        </>
    )
}
export default ErrorPage