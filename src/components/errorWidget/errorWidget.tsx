import { ToastContainer, Bounce } from "react-toastify";

const ErrorWidget = ({ userNotFound }: { userNotFound: boolean }) => {
  return (
    <>
      <div className="error-container">
        <p>
          {!userNotFound
            ? "Oops! User does not exist!"
            : `Oops! Something went wrong. 
            We're sorry, but it looks like there was an error processing your request. 
            Please try again later.`}
        </p>
        <div>
          <a href="/">&nbsp; Go Back</a>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme="dark"
      />
    </>
  );
};

export default ErrorWidget;
