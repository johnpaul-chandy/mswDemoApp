import {  error,setError } from '../../providers/appContextProvider';

function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <>
          {error && (
            <div role="alert">
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>)
          }
      </>
    )
  }

  export {ErrorFallback}