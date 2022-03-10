import { Link } from "react-router-dom";
import "./SignupHome.css";

export default function SignupHome() {
  return (
    <div>
      <div className="container" style={{ margin: "50px" }}>
        <div className="body d-md-flex align-items-center justify-content-between">
          <div className="box-1 mt-md-0 mt-5">
            
            <img
              src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              className=""
              alt=""
            />
          </div>
          <div className=" box-2 d-flex flex-column h-100 text-center">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center py-5 my-4">
                <p className="mb-0 me-2">Are you Organization/ Employee - </p>
                <br />
                <div>
                  <Link
                    className="btn btn-outline-danger mx-3 mt-3"
                    to="/signup"
                    role="button"
                  >
                    Organization
                  </Link>
                  <Link
                    className="btn btn-outline-danger mt-3"
                    to="/signupemployee"
                    role="button"
                  >
                    Employee
                  </Link>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center pb-4">
                <p className="mb-0 me-2">Already have an account?</p>
                <Link
                  type="button"
                  className="btn btn-outline-danger"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
