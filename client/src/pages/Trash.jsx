{
  /* <div className="text-center">
        <h1 className="font-bolanosima font-semibold text-2xl tracking-wide font-extralight">
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </h1>
        <p className="font-alata">Change account password below...</p>
        {errorMessage && (
          <div
            role="alert"
            className=" absolute border border-forth top-4 right-4 bg-second p-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-forth">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <p className="text-forth text-sm">Failed to reset password</p>
              </div>

              <button
                onClick={handleClose}
                className="text-forth transition hover:text-fifth"
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {successMessage && (
          <div
            role="alert"
            className=" absolute border border-fifth top-4 right-4 bg-second p-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-fifth">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <p className="text-fifth font-alata text-sm">
                  {successMessage}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="text-fifth transition hover:text-forth"
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handlePasswordChange}
        className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]"
      >
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="CURRENT PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="NEW PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <div className="flex w-full items-center justify-between gap-4">
          <button
            type="submit"
            className="py-1 text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
          >
            CHANGE
          </button>

          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/");
              });
            }}
            className="py-1 text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
          >
            LOG OUT
          </button>
        </div>
      </form>*/
}
